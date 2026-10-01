import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import filenames from "eslint-plugin-filenames";
import perfectionist from "eslint-plugin-perfectionist";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysShorthand from "eslint-plugin-sort-keys-shorthand";
import unusedImports from "eslint-plugin-unused-imports";

// .eslintrc.json からの移行。eslint 10 で動かない eslint-plugin-ext と
// eslint-plugin-css-modules、eslint 9 で消えた規則を使う eslint-config-google、
// eslint 8 までしか受けない eslint-plugin-typescript-sort-keys は外した。
// 型のキーの並びは @typescript-eslint/member-ordering で引き続き見る。
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "**/*.d.ts"],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    plugins: {
      filenames: fixupPluginRules(filenames),
      perfectionist,
      "sort-destructure-keys": sortDestructureKeys,
      "sort-keys-shorthand": sortKeysShorthand,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/member-ordering": [
        "error",
        { default: { memberTypes: "never", order: "alphabetically" } },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "filenames/match-exported": "off",
      "filenames/match-regex": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      // import/order は並びを直そうとした時点で eslint 10 に無い API を呼んで
      // 落ちる。並べ替えは perfectionist に任せる。
      "import/order": "off",
      "import/prefer-default-export": "error",
      "newline-before-return": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "break",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        { blankLine: "never", next: "import", prev: "*" },
        { blankLine: "never", next: "case", prev: "case" },
        { blankLine: "never", next: "const", prev: "const" },
        { blankLine: "never", next: "let", prev: "let" },
      ],
      // React Compiler 向けに 7 で増えた規則のうち、この 2 つは Game の
      // 締め切りの持ち方(描画のたびに ref へ控える)とぶつかる。
      // Compiler は使っていないので切る。
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": [
        "error",
        { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          // 以前の import/order と同じく、パッケージも src 以下も混ぜて
          // abc 順に並べ、同じフォルダのものだけ最後に置く。
          groups: [
            ["builtin", "external", "internal", "tsconfig-path", "unknown"],
            ["parent", "sibling", "index", "style"],
          ],
          ignoreCase: true,
          newlinesBetween: 0,
          type: "alphabetical",
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-sort-props": "error",
      semi: "error",
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-keys-shorthand/sort-keys-shorthand": [
        "error",
        "asc",
        { shorthand: "first" },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      // eslint-plugin-react は版を自分で探しに行き、eslint 10 では落ちる。
      react: { version: "18.3" },
    },
  },
  {
    files: ["src/pages/_app.tsx", "src/pages/_document.tsx"],
    rules: {
      "filenames/match-regex": "off",
    },
  },
];

export default eslintConfig;
