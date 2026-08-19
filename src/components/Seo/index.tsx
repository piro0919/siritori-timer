import Head from "next/head";
import { useRouter } from "next/router";

const SITE_NAME = "限界しりとりパーティー非公式アプリ";
const SITE_URL = "https://siritori-timer.kkweb.io";
const ogpImage = `${SITE_URL}/ogp.png`;

type PageSeo = {
  description: string;
  /** 対戦中の画面のように、検索結果へ出す必要が無いページは false */
  indexable: boolean;
  title: string;
};

/**
 * /expert と /party は next.config の rewrites で / に流している。
 * 同じページだが遊び方が違うので、見出しと canonical は分ける。
 */
const pages: { [pathname: string]: PageSeo } = {
  "/": {
    description: "限界しりとりパーティーの非公式タイマーアプリです。",
    indexable: true,
    title: "限界しりとりタイマー",
  },
  "/expert": {
    description:
      "限界しりとりのエキスパートルール用タイマーです。持ち時間とハンデを決めて始められます。",
    indexable: true,
    title: "エキスパートルールのタイマー",
  },
  "/game": {
    description: "限界しりとりパーティーの非公式タイマーアプリです。",
    indexable: false,
    title: "対戦中",
  },
  "/party": {
    description:
      "限界しりとりパーティーのパーティルール用タイマーです。人数と持ち時間を決めて始められます。",
    indexable: true,
    title: "パーティルールのタイマー",
  },
};

function Seo(): JSX.Element {
  const { asPath } = useRouter();
  const pathname = asPath.split("?")[0].replace(/\/$/, "") || "/";
  const page = pages[pathname] || pages["/"];
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const title = `${page.title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{title}</title>
      <meta content={page.description} name="description" />
      <link href={canonical} rel="canonical" />
      <meta content={title} property="og:title" />
      <meta content={page.description} property="og:description" />
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
      {page.indexable ? null : (
        <meta content="noindex, nofollow" name="robots" />
      )}
    </Head>
  );
}

export default Seo;
