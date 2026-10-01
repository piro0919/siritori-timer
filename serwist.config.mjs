// @ts-check
// next-pwa は 2022 年で止まり、Next 16 の Turbopack では動かない。
// 後継の Serwist を next build の後に走らせ、public/sw.js を書き出す。
import { serwist } from "@serwist/next/config";

export default serwist({
  globIgnores: [
    // 以前 next-pwa が public に書き出していた workbox-*.js は使わない。
    "public/workbox-*.js",
    // Search Console の確認用。Serwist は .html を消した URL で控えるため
    // /public/googlexxxx という存在しない URL になり、導入ごと失敗する。
    "public/*.html",
  ],
  swDest: "public/sw.js",
  swSrc: "src/sw.ts",
});
