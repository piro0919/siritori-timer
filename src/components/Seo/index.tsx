import Head from "next/head";

const title = "限界しりとりタイマー | 限界しりとりパーティー非公式アプリ";
const description = "限界しりとりパーティーの非公式タイマーアプリです。";
const canonical = "https://siritori-timer.kkweb.io/";
const ogpImage = `${canonical}ogp.png`;

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
      <meta content={ogpImage} property="og:image" />
      <meta content="image/png" property="og:image:type" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content={title} property="og:image:alt" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={ogpImage} name="twitter:image" />
      <meta content={title} name="twitter:image:alt" />
    </Head>
  );
}

export default Seo;
