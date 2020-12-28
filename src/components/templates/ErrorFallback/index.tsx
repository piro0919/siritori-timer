import { FC, useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import useLocalstorage from "@rooks/use-localstorage";
import { Redirect } from "react-router-dom";

const ErrorFallback: FC<FallbackProps> = () => {
  const exportLocalstorage = useLocalstorage("expert");
  const partyLocalstorage = useLocalstorage("party");
  const volumeLocalstorage = useLocalstorage("volume");

  useEffect(() => {
    exportLocalstorage[2]();
    partyLocalstorage[2]();
    volumeLocalstorage[2]();
  }, [exportLocalstorage, partyLocalstorage, volumeLocalstorage]);

  return <Redirect to="/" />;
};

export default ErrorFallback;
