import Head from "next/head";

const title = "限界しりとりタイマー | 限界しりとりパーティー非公式アプリ";
const description = "限界しりとりパーティーの非公式タイマーアプリです。";
const canonical = "https://siritori-timer.kkweb.io/";

// next-seo は 7 から Next 13.4 以上を要求する。ここで出しているのは
// 題名・説明・canonical と、それに対応する OGP だけなので、next/head で足りる。
function Seo(): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <link href={canonical} rel="canonical" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={canonical} property="og:url" />
      <meta content="website" property="og:type" />
    </Head>
  );
}

export default Seo;
