import Top from "components/organisms/Top";
import Layout from "components/templates/Layout";
import { FC, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import useLocalstorage from "@rooks/use-localstorage";
import { stringify } from "query-string";

type FieldValues = {
  players: number;
  time: number;
};

const Pages: FC = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [expertValue, setExpert] = useLocalstorage("expert", {
    player: 2,
    time: 5,
  });
  const [partyValue, setParty] = useLocalstorage("party", {
    player: 2,
    time: 1,
  });
  const {
    control,
    handleSubmit: handleSubmitReactHookForm,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      players: 0,
      time: 0,
    },
  });
  const handleValid = useCallback<SubmitHandler<FieldValues>>(
    (values) => {
      if (pathname === "/expert") {
        setExpert(values);
      } else if (pathname === "/party") {
        setParty(values);
      }

      push(
        `/game?${stringify({ ...values, type: pathname.replace("/", "") })}`
      );
    },
    [pathname, push, setExpert, setParty]
  );
  const handleSubmit = handleSubmitReactHookForm(handleValid);

  useEffect(() => {
    if (pathname !== "/expert" && pathname !== "/party") {
      return;
    }

    reset(pathname === "/expert" ? expertValue : partyValue);
  }, [expertValue, partyValue, pathname, reset]);

  return (
    <Layout>
      <Top control={control} handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Pages;
