import Pages from "./index";

/**
 * index と同じ画面。以前は rewrite で / に流していたが、それだと
 * / の生成済み HTML がそのまま返るため、見出しも canonical も
 * トップと同じものしか出せなかった。実体のあるページにして分ける。
 */
const Expert = Pages;

export default Expert;
