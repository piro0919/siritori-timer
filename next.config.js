const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    scrollRestoration: false,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "/",
        has: [
          { type: "query", key: "player" },
          { type: "query", key: "time" },
        ],
        source: "/game",
      },
    ];
  },
  // 以前はここで全 scss の先頭に @use を差し込んでいたが、効かなくなって
  // ビルドが落ちていた。各ファイルが自分で @use するようにしたので、
  // 読み込み先の道筋だけ渡す。Next 16 の Sass は新しい API で動くので
  // includePaths ではなく loadPaths で渡す。
  sassOptions: {
    loadPaths: [__dirname, path.join(__dirname, "src")],
  },
});

module.exports = nextConfig;
