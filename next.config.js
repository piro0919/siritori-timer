// next-pwa は 5.6 で呼び方が変わった。設定を先に渡してから包む形でないと、
// 設定ごと PWA 側へ流れ込んでビルドが落ちる。
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA(
  withBundleAnalyzer({
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      scrollRestoration: false,
    },
    images: {
      unoptimized: true,
    },
    optimizeFonts: false,
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          destination: "/",
          source: "/expert",
        },
        {
          destination: "/",
          has: [
            { type: "query", key: "player" },
            { type: "query", key: "time" },
          ],
          source: "/game",
        },
        {
          destination: "/",
          source: "/party",
        },
      ];
    },
    // 以前はここで全 scss の先頭に @use を差し込んでいたが、効かなくなって
    // ビルドが落ちていた。各ファイルが自分で @use するようにしたので、
    // 読み込み先の道筋だけ渡す。
    sassOptions: {
      includePaths: [__dirname, path.join(__dirname, "src")],
    },
    swcMinify: true,
  })
);

module.exports = nextConfig;
