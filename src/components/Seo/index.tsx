import { NextSeo } from "next-seo";

function Seo(): JSX.Element {
  return (
    <NextSeo
      canonical="https://siritori-timer.kkweb.io/"
      description="限界しりとりパーティーの非公式タイマーアプリです。"
      title="限界しりとりタイマー | 限界しりとりパーティー非公式アプリ"
    />
  );
}

export default Seo;
