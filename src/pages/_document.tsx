import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import type { JSX } from "react";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link
            crossOrigin="anonymous"
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
            rel="stylesheet"
          />
          {/* text に空白を足しておく。いまの Google Fonts は切り出した書体を
              unicode-range 付きでしか返さず、空白を含まないと行の高さが
              cursive 側の寸法で決まって見出しが伸びる。Next 12 は CSS を
              取り込む際に範囲指定の無い書体も得ていたので、これで揃う。 */}
          <link
            href="https://fonts.googleapis.com/css2?family=Reggae+One&display=swap&text=%20限界しりとりタイマー"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap&text=0123456789:."
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap&text=Touch Start!123"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Vercel Analytics。@vercel/analytics は Next 13 以上が前提なので、
              パッケージが読み込むのと同じものを直接置く。 */}
          <script defer={true} src="/_vercel/insights/script.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
