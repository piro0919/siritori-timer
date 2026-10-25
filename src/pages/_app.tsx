import Layout from "components/Layout";
import { LazyMotion } from "framer-motion";
import useHowl from "hooks/useHowl";
import useParseUrl from "hooks/useParseUrl";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import "rc-slider/assets/index.css";
import { type JSX, ReactElement, ReactNode, useEffect, useRef } from "react";
import "ress/dist/ress.min.css";
import "styles/globals.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const loadMotionFeatures = (): Promise<
  typeof import("lib/motionFeatures").default
> => import("lib/motionFeatures").then((module) => module.default);

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);
  const { url } = useParseUrl();
  const prevUrlRef = useRef(url);
  const clickHowl = useHowl({ src: "/sounds/click.mp3" });

  // 画面が切り替わるたびに鳴らす。開いた直後は鳴らさない。
  useEffect(() => {
    if (url === prevUrlRef.current) {
      return;
    }

    prevUrlRef.current = url;

    clickHowl.play();
  }, [clickHowl, url]);

  // next-pwa は登録の処理を自分で差し込んでいた。Serwist は差し込まないので
  // ここで登録する。sw.js は本番のビルドでしか作られない。
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  }, []);

  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <link href="/manifest.json" rel="manifest" />
        <link href="/logo192.png" rel="apple-touch-icon" />
      </Head>
      {/* framer-motion は使う機能だけ後から読む。motion ではなく m で書く。 */}
      <LazyMotion features={loadMotionFeatures} strict={true}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </LazyMotion>
    </>
  );
}

export default MyApp;
