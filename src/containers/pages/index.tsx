import Top from "components/organisms/Top";
import Layout from "components/templates/Layout";
import { FC, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import useLocalstorage from "@rooks/use-localstorage";
import { stringify } from "query-string";

type FieldValues = {
  first: string;
  handicaps: string[];
  players: string;
  time: string;
};

const Pages: FC = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [expertValue, setExpert] = useLocalstorage("expert", {
    first: "0",
    handicaps: [],
    player: "2",
    time: "5",
  });
  const [partyValue, setParty] = useLocalstorage("party", {
    first: "0",
    handicaps: [],
    player: "2",
    time: "1",
  });
  const {
    control,
    handleSubmit: handleSubmitReactHookForm,
    register,
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      first: "0",
      handicaps: [],
      players: "2",
      time: "1",
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
      <Top
        control={control}
        firstRef={register}
        handicapsRef={register}
        handleSubmit={handleSubmit}
        player={watch("player")}
        time={watch("time")}
      />
    </Layout>
  );
};

export default Pages;
