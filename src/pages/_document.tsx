import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

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
          <link
            href="https://fonts.googleapis.com/css2?family=Reggae+One&display=swap&text=限界しりとりタイマー"
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
