(this["webpackJsonpsiritori-timer"]=this["webpackJsonpsiritori-timer"]||[]).push([[0],{13:function(e,t,n){e.exports={wrapper:"style_wrapper__3Hg8j",heading2:"style_heading2__19OQ7",inner:"style_inner__2rQEY",fieldset:"style_fieldset__2rau4",legend:"style_legend__1t5Uh",tip:"style_tip__LIZzy",footer:"style_footer__34uzW"}},173:function(e,t,n){},175:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(1),r=n(9),s=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function i(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var o=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,177)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))},l=(n(105),n(3)),u=n(5),b=n(88),j=n.n(b),d=function(){return Object(c.jsx)("footer",{className:j.a.footer,children:"\xa9 2020 \u9650\u754c\u3057\u308a\u3068\u308a\u30bf\u30a4\u30de\u30fc"})},O=n(64),f=n.n(O),p=function(){return Object(c.jsx)("header",{className:f.a.header,children:Object(c.jsxs)("h1",{children:["\u9650\u754c\u3057\u308a\u3068\u308a",Object(c.jsx)("span",{className:f.a.red,children:"\u30bf\u30a4\u30de\u30fc"})]})})},m=n(18),h=n.n(m),x=n(71),v=n(89),_=n.n(v),y=function(e){var t=e.children,n=e.disabled,a=e.onClick,r=e.type;return Object(c.jsx)("button",{className:_.a.button,disabled:n,onClick:a,type:r,children:t})},g=n(70),k=function(e){var t=e.disabled,n=e.max,r=e.min,s=e.onChange,i=e.setValue,o=e.step,l=e.tipFormatter,u=e.value,b=Object(a.useMemo)((function(){return Object(g.a)(g.b)}),[]);return Object(a.useEffect)((function(){i(u)}),[i,u]),Object(c.jsx)(b,{disabled:t,max:n,min:r,onChange:s,step:o,tipFormatter:l,value:u})},C=n(36),w=n(13),N=n.n(w),S=function(e){var t=e.control,n=e.handleSubmit,r=Object(a.useState)(0),s=Object(l.a)(r,2),i=s[0],o=s[1],b=Object(a.useState)(0),j=Object(l.a)(b,2),d=j[0],O=j[1],f=Object(u.g)().pathname,p=Object(a.useMemo)((function(){return"/expert"===f}),[f]),m=Object(a.useMemo)((function(){return d?d.toString().split("."):[]}),[d]),h=Object(l.a)(m,2),x=h[0],v=h[1];return Object(c.jsxs)("section",{className:N.a.wrapper,children:[Object(c.jsx)("h2",{className:N.a.heading2,children:"/expert"===f?"\u30a8\u30ad\u30b9\u30d1\u30fc\u30c8\u30eb\u30fc\u30eb":"\u30d1\u30fc\u30c6\u30a3\u30eb\u30fc\u30eb"}),Object(c.jsx)("form",{onSubmit:n,children:Object(c.jsxs)("div",{className:N.a.inner,children:[Object(c.jsxs)("fieldset",{className:N.a.fieldset,children:[Object(c.jsx)("legend",{className:N.a.legend,children:"\u30d7\u30ec\u30a4\u4eba\u6570\uff1a".concat(i,"\u4eba")}),Object(c.jsx)(C.a,{control:t,name:"player",render:function(e){var t=e.onChange,n=e.value;return Object(c.jsx)(k,{disabled:p,max:6,min:2,onChange:t,setValue:o,tipFormatter:function(e){return Object(c.jsx)("div",{className:N.a.tip,children:"".concat(e,"\u4eba")})},value:n})}})]}),Object(c.jsxs)("fieldset",{className:N.a.fieldset,children:[Object(c.jsx)("legend",{className:N.a.legend,children:"\u6301\u3061\u6642\u9593\uff1a".concat("0"!==x?"".concat(x,"\u5206"):"").concat(v?"30\u79d2":"")}),Object(c.jsx)(C.a,{control:t,name:"time",render:function(e){var t=e.onChange,n=e.value;return Object(c.jsx)(k,{max:10,min:.5,onChange:t,setValue:O,step:.5,tipFormatter:function(e){var t=e.toString().split("."),n=Object(l.a)(t,2),a=n[0],r=n[1];return Object(c.jsx)("div",{className:N.a.tip,children:"".concat("0"!==a?"".concat(a,"\u5206"):"").concat(r?"30\u79d2":"")})},value:n})}})]}),Object(c.jsx)("footer",{className:N.a.footer,children:Object(c.jsx)(y,{type:"submit",children:"\u30ec\u30c3\u30c4\u30d1\u30fc\u30c6\u30a3\uff01"})})]})})]})},E=n(7),M=n(42),P=n(92),W=n.n(P),R=n(37),T=n.n(R),F=n(43),I=n(44),V=n(93),B=n.n(V),A=n.p+"static/media/c.ac41483b.mp3",L=n.p+"static/media/c2.b75d89be.mp3",U=n(45),z=n(94),H=n(30),D=n.n(H),q=function(e){var t=e.disabledPlay,n=e.disabledReload,r=e.disabledRevert,s=e.disabledStop,i=e.displayButton,o=e.handleClickOnReload,l=e.handleClickOnRevert,u=e.handleClickOnStart,b=e.handleClickOnStop,j=Object(a.useMemo)((function(){return"play"===i?Object(c.jsx)("button",{className:D.a.button,disabled:t,onClick:u,children:Object(c.jsx)(U.a,{color:"#fff",size:20})}):Object(c.jsx)("button",{className:D.a.button,disabled:s,onClick:b,children:Object(c.jsx)(U.c,{color:"#fff",size:20})})}),[t,s,i,u,b]);return Object(c.jsxs)("aside",{className:D.a.aside,children:[j,Object(c.jsx)("button",{className:D.a.button,disabled:r,onClick:l,children:Object(c.jsx)(U.b,{color:"#fff",size:24})}),Object(c.jsx)("button",{className:D.a.button,disabled:n,onClick:o,children:Object(c.jsx)(z.a,{color:"#fff",size:24})})]})},G=n(95),Y=n.n(G),J=n(68),K=n.n(J),Q=n.p+"static/media/decision32.59ec0c1d.mp3",X=Object(a.createContext)({setVolume:function(e){},volume:0}),Z=n(16),$=n.n(Z),ee=function(e){var t=e.addLoser,n=e.index,r=e.isStopCurrent,s=e.minute,i=e.resume,o=e.revertTime,u=e.setRevertTime,b=e.startNextPlayer,j=Object(a.useState)(60*s*1e3),d=Object(l.a)(j,2),O=d[0],f=d[1],p=Object(a.useMemo)((function(){return 100}),[]),m=Object(a.useCallback)((function(){f((function(e){return e-p>=0?e-p:0}))}),[p]),h=Object(F.a)(m,p),x=Object(l.a)(h,2),v=x[0],_=x[1],y=Object(a.useContext)(X).volume,g=Object(a.useState)(!1),k=Object(l.a)(g,2),C=k[0],w=k[1],N=Object(a.useMemo)((function(){return Y()(O,{colonNotation:!0,keepDecimalsOnWholeSeconds:!0})}),[O]),S=Object(a.useCallback)((function(){w(!1)}),[]);return Object(a.useEffect)((function(){if(i)return u(O),void v();_()}),[i,u]),Object(a.useEffect)((function(){O||(t(n),_(),b())}),[t,n,b,O]),Object(a.useEffect)((function(){!i||0===O||O%1e3||w(!0)}),[i,O]),Object(a.useEffect)((function(){"undefined"!==typeof o&&f(o)}),[o]),Object(c.jsxs)("button",{className:"".concat(K.a.button," ").concat(r?K.a.stop:""),disabled:!i,onClick:b,children:[N,Object(c.jsx)($.a,{onEnd:S,playing:C,src:Q,volume:y})]})},te=n(96),ne=n.n(te),ce=function(e){var t=e.addLoser,n=e.currentPlayer,r=e.minute,s=e.players,i=e.previousPlayer,o=e.revertPlayer,l=e.revertTime,u=e.setRevertTime,b=e.startNextPlayer,j=Object(a.useMemo)((function(){return s.map((function(e,a){var s=e.key;return Object(c.jsx)(ee,{addLoser:t,index:a,isStopCurrent:"undefined"===typeof n&&i===a,minute:r,resume:n===a,revertTime:o===a?l:void 0,setRevertTime:u,startNextPlayer:b},s)}))}),[t,n,r,s,i,o,l,u,b]);return Object(c.jsx)("div",{className:ne.a.wrapper,children:j})},ae=function(){var e=Object(u.g)().search,t=Object(a.useMemo)((function(){return Object(M.parse)(e)}),[e]),n=Object(a.useMemo)((function(){var e=t.player,n=t.time;return{minute:"string"===typeof n?parseFloat(n):0,player:"string"===typeof e?parseInt(e,10):0}}),[t]),s=n.minute,i=n.player,o=Object(a.useState)(),b=Object(l.a)(o,2),j=b[0],d=b[1],O=Object(a.useMemo)((function(){return Object(E.a)(Array(i)).map((function(){return{key:W()()}}))}),[i]),f=Object(a.useCallback)((function(){d((function(e){return"undefined"!==typeof e&&e+1<O.length?e+1:0}))}),[O.length]),p=Object(a.useState)(),m=Object(l.a)(p,2),h=m[0],x=m[1],v=Object(a.useState)(),_=Object(l.a)(v,2),y=_[0],g=_[1],k=Object(I.a)(j),C=Object(a.useState)([]),w=Object(l.a)(C,2),N=w[0],S=w[1],P=Object(a.useCallback)((function(e){S((function(t){return[].concat(Object(E.a)(t),[e])}))}),[]),R=Object(a.useState)(!1),V=Object(l.a)(R,2),U=V[0],z=V[1],H=Object(a.useState)(3),D=Object(l.a)(H,2),G=D[0],Y=D[1],J=Object(a.useCallback)((function(){Y((function(e){return e-1}))}),[]),K=Object(F.a)(J,1e3),Q=Object(l.a)(K,2),Z=Q[0],ee=Q[1],te=Object(a.useCallback)((function(){d("number"===typeof k?k:void 0)}),[k]),ne=Object(a.useCallback)((function(){d(void 0)}),[]),ae=Object(a.useCallback)((function(){g("number"===typeof k?k:void 0)}),[k]),re=Object(u.f)(),se=re.go,ie=re.push,oe=Object(a.useCallback)((function(){se(0)}),[se]),le=Object(a.useContext)(X).volume,ue=Object(a.useMemo)((function(){return G>0||N.length>=O.length-1}),[G,N.length,O.length]),be=Object(a.useMemo)((function(){return"undefined"!==typeof j||G>0}),[G,j]),je=Object(a.useMemo)((function(){return"undefined"!==typeof j||"undefined"===typeof h||G>0||N.length>=O.length-1}),[G,j,N.length,O.length,h]),de=Object(a.useMemo)((function(){return G>0||N.length>=O.length-1}),[G,N.length,O.length]),Oe=Object(a.useMemo)((function(){return"undefined"===typeof j?"play":"stop"}),[j]),fe=Object(a.useCallback)((function(){z(!0)}),[]),pe=Object(a.useMemo)((function(){var e=document.getElementById("root");return G&&e?Object(r.createPortal)(Object(c.jsx)("div",{className:T.a.countdownWrapper,onClick:fe,children:U?G:Object(c.jsx)("div",{className:T.a.touchStart,children:"Touch start!"})}),e):null}),[G,fe,U]),me=Object(a.useState)(!1),he=Object(l.a)(me,2),xe=he[0],ve=he[1],_e=Object(a.useState)(!1),ye=Object(l.a)(_e,2),ge=ye[0],ke=ye[1],Ce=Object(a.useCallback)((function(){ve(!1)}),[]),we=Object(a.useCallback)((function(){ke(!1)}),[]);return Object(a.useEffect)((function(){G||(ee(),d(0))}),[G]),Object(a.useEffect)((function(){"undefined"!==typeof y&&(g(void 0),x(void 0))}),[y]),Object(a.useEffect)((function(){N.length<O.length-1||(d(void 0),B()({buttons:{reload:{text:"\u3082\u30461\u5ea6\u904a\u3076",value:"reload"},toHome:{text:"\u30c8\u30c3\u30d7\u3078\u623b\u308b",value:"toHome"}},closeOnClickOutside:!0,icon:"success",title:"".concat(O.findIndex((function(e,t){return!N.includes(t)}))+1,"P Win!")}).then((function(e){switch(e){case"reload":return void se(0);case"toHome":return void ie("/");default:return}})))}),[se,N,O,ie]),Object(a.useEffect)((function(){U&&(G?ve(!0):ke(!0))}),[G,U]),Object(a.useEffect)((function(){U&&Z()}),[U]),Object(c.jsxs)("div",{className:T.a.wrapper,children:[Object(c.jsxs)("div",{className:T.a.inner,children:[Object(c.jsx)(ce,{addLoser:P,currentPlayer:j,minute:s,players:O,previousPlayer:"number"===typeof k?k:void 0,revertPlayer:y,revertTime:h,setRevertTime:x,startNextPlayer:f}),Object(c.jsx)(q,{disabledPlay:ue,disabledReload:be,disabledRevert:je,disabledStop:de,displayButton:Oe,handleClickOnReload:oe,handleClickOnRevert:ae,handleClickOnStart:te,handleClickOnStop:ne})]}),pe,Object(c.jsx)($.a,{onEnd:Ce,playing:xe,src:A,volume:le}),Object(c.jsx)($.a,{onEnd:we,playing:ge,src:L,volume:le})]})},re=n(69),se=n.n(re),ie=n.p+"static/media/decision29.1ee4bd72.mp3",oe=n(97),le=n.n(oe),ue=function(){var e=le()(),t=e.enabledPwa,n=e.handleClickOnInstallPrompt,r=e.isPwa,s=Object(a.useContext)(X),i=s.setVolume,o=s.volume,b=Object(a.useState)(!1),j=Object(l.a)(b,2),d=j[0],O=j[1],f=Object(a.useCallback)((function(){var e=o?0:1;i(e),e&&O(!0)}),[i,o]),p=Object(a.useMemo)((function(){return"\u30b5\u30a6\u30f3\u30c9\uff1a".concat(o?"\u30aa\u30f3":"\u30aa\u30d5")}),[o]),m=Object(u.f)().push,h=Object(a.useCallback)((function(){m("/party")}),[m]),x=Object(a.useCallback)((function(){m("/expert")}),[m]),v=Object(a.useCallback)((function(){O(!1)}),[]);return Object(c.jsxs)("div",{className:se.a.wrapper,children:[Object(c.jsx)(y,{onClick:h,children:"\u30d1\u30fc\u30c6\u30a3\u30eb\u30fc\u30eb"}),Object(c.jsx)(y,{onClick:x,children:"\u30a8\u30ad\u30b9\u30d1\u30fc\u30c8\u30eb\u30fc\u30eb"}),Object(c.jsxs)("div",{className:se.a.buttonsWrapper,children:[Object(c.jsx)(y,{onClick:f,children:p}),r?null:Object(c.jsx)(y,{disabled:!t,onClick:n,children:"\u30db\u30fc\u30e0\u3078\u8ffd\u52a0"})]}),Object(c.jsx)($.a,{onEnd:v,playing:d,src:ie,volume:o})]})},be=function(e){var t=e.control,n=e.handleSubmit,r=Object(u.g)().pathname,s=Object(a.useMemo)((function(){return{x:"/"===r?"0":"-50%"}}),[r]),i=Object(a.useMemo)((function(){return{x:"/game"===r?"-50%":"0"}}),[r]);return Object(c.jsx)("div",{className:h.a.wrapper,children:Object(c.jsxs)(x.a.div,{animate:i,className:h.a.wrapper2,initial:!1,children:[Object(c.jsxs)("div",{className:h.a.inner,children:[Object(c.jsx)(p,{}),Object(c.jsx)("main",{className:h.a.main,children:Object(c.jsxs)(x.a.div,{animate:s,className:h.a.mainInner,initial:!1,children:[Object(c.jsx)("div",{className:h.a.item,children:"/"===r?Object(c.jsx)(ue,{}):null}),Object(c.jsx)("div",{className:h.a.item,children:"/expert"===r||"/party"===r?Object(c.jsx)(S,{control:t,handleSubmit:n}):null})]})}),Object(c.jsx)(d,{})]}),Object(c.jsx)("div",{className:h.a.gameWrapper,children:"/game"===r?Object(c.jsx)(ae,{}):null})]})})},je=n(46),de=n.n(je),Oe=n(99),fe=n(98),pe=n.n(fe),me=n.p+"static/media/decision29.1ee4bd72.mp3",he=n(35),xe=function(e){var t=e.children,n=Object(Oe.a)(),r=Object(a.useMemo)((function(){return{minHeight:n}}),[n]),s=Object(u.g)().pathname,i=Object(I.a)(s),o=Object(he.a)("volume",1),b=Object(l.a)(o,2),j=b[0],d=b[1],O=Object(a.useState)(j),f=Object(l.a)(O,2),p=f[0],m=f[1],h=Object(a.useState)(!1),x=Object(l.a)(h,2),v=x[0],_=x[1],y=Object(a.useMemo)((function(){return{setVolume:m,volume:p}}),[m,p]),g=Object(a.useCallback)((function(){_(!1)}),[]);return Object(a.useEffect)((function(){d(p)}),[d,p]),Object(a.useEffect)((function(){i&&_(!0)}),[i]),Object(c.jsxs)(X.Provider,{value:y,children:[Object(c.jsx)(pe.a,{children:Object(c.jsxs)("div",{className:de.a.wrapper,style:r,children:[Object(c.jsx)("div",{className:de.a.background}),Object(c.jsx)("div",{className:de.a.inner,children:t})]})}),Object(c.jsx)($.a,{onEnd:g,playing:v,src:me,volume:p})]})},ve=function(){var e=Object(u.f)().push,t=Object(u.g)().pathname,n=Object(he.a)("expert",{player:2,time:5}),r=Object(l.a)(n,2),s=r[0],i=r[1],o=Object(he.a)("party",{player:2,time:1}),b=Object(l.a)(o,2),j=b[0],d=b[1],O=Object(C.b)({defaultValues:{players:0,time:0}}),f=O.control,p=O.handleSubmit,m=O.reset,h=p(Object(a.useCallback)((function(n){"/expert"===t?i(n):"/party"===t&&d(n),e("/game?".concat(Object(M.stringify)(n)))}),[t,e,i,d]));return Object(a.useEffect)((function(){"/expert"!==t&&"/party"!==t||m("/expert"===t?s:j)}),[s,j,t,m]),Object(c.jsx)(xe,{children:Object(c.jsx)(be,{control:f,handleSubmit:h})})},_e=ve,ye=ve,ge=ve,ke=function(){return Object(c.jsxs)(u.c,{children:[Object(c.jsx)(u.a,{exact:!0,path:"/",children:Object(c.jsx)(ve,{})}),Object(c.jsx)(u.a,{exact:!0,path:"/expert",children:Object(c.jsx)(_e,{})}),Object(c.jsx)(u.a,{exact:!0,path:"/game",children:Object(c.jsx)(ge,{})}),Object(c.jsx)(u.a,{exact:!0,path:"/party",children:Object(c.jsx)(ye,{})})]})},Ce=(n(173),n(15)),we=(n(174),document.getElementById("root")),Ne=Object(c.jsx)(a.StrictMode,{children:Object(c.jsx)(Ce.a,{children:Object(c.jsx)(ke,{})})});we&&we.hasChildNodes()?Object(r.hydrate)(Ne,we):Object(r.render)(Ne,we),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");s?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var c=n.headers.get("content-type");404===n.status||null!=c&&-1===c.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):i(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):i(t,e)}))}}(),o()},18:function(e,t,n){e.exports={wrapper:"style_wrapper__2xj4i",wrapper2:"style_wrapper2__1z06Y",inner:"style_inner__2NuVF",main:"style_main__c2W41",mainInner:"style_mainInner__3rq0N",item:"style_item__jb7n-",gameWrapper:"style_gameWrapper__Bbvfe"}},30:function(e,t,n){e.exports={aside:"style_aside__MVUSv",button:"style_button__3Sd0G"}},37:function(e,t,n){e.exports={wrapper:"style_wrapper__2R7Ri",inner:"style_inner__2qpN-",countdownWrapper:"style_countdownWrapper__2i-ab",touchStart:"style_touchStart__rIgGa"}},46:function(e,t,n){e.exports={wrapper:"style_wrapper__523ZX",inner:"style_inner__13AxE",background:"style_background__qDR4A","MOVE-BACKGROUND":"style_MOVE-BACKGROUND__23lFA"}},64:function(e,t,n){e.exports={header:"style_header__3O4WM",red:"style_red__1xkTi"}},68:function(e,t,n){e.exports={button:"style_button__P9eNY",stop:"style_stop__1aeB8"}},69:function(e,t,n){e.exports={wrapper:"style_wrapper__edUTU",buttonsWrapper:"style_buttonsWrapper__33pwn"}},88:function(e,t,n){e.exports={footer:"style_footer__2ccSq"}},89:function(e,t,n){e.exports={button:"style_button__3Cc2Y"}},96:function(e,t,n){e.exports={wrapper:"style_wrapper__3XgnH"}}},[[175,1,2]]]);
//# sourceMappingURL=main.c3872655.chunk.js.map