(this.webpackJsonparmobv2=this.webpackJsonparmobv2||[]).push([[0],{131:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(0),o=n.n(a),c=n(24),i=n.n(c),s=(n(78),n(30)),l=n(16),d=n(137),u=n(8),f=n(133),p=n(136),j=n(7),h=n.n(j),b=n(18),v=n(28),g=n(71),w=n(135),O=n(134),x=n(66),y=n.n(x),k=function(){var e=Object(v.a)(h.a.mark((function e(t){var n,r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=y.a.init({host:"arweave.net",port:443}),e.next=3,n.wallets.jwkToAddress(t);case 3:return r=e.sent,e.t0=n.ar,e.next=7,n.wallets.getBalance(r);case 7:return e.t1=e.sent,a=e.t0.winstonToAr.call(e.t0,e.t1),console.log(r),console.log(a),e.abrupt("return",{address:r,balance:a});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m={key:{},balance:"0",address:""},A=Object(a.createContext)({state:m,dispatch:function(){return null}}),S=function(){var e=Object(w.a)(),t=o.a.useContext(A),n=t.state,a=t.dispatch;o.a.useEffect((function(){var e=function(){var e=Object(v.a)(h.a.mark((function e(t){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(t),console.log(JSON.parse(t)),e.next=4,k(n);case 4:r=e.sent,a({type:"ADD_WALLET",payload:Object(b.a)(Object(b.a)({},r),{},{key:n})});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=localStorage.getItem("wallet");if(t)try{e(t)}catch(n){console.log("Error loading wallet",n)}}),[]);var c=function(){var t=Object(v.a)(h.a.mark((function t(n){var r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(r=new FileReader).onabort=function(){return console.log("file reading was aborted")},r.onerror=function(){return console.log("file reading has failed")},r.onload=function(){var t=Object(v.a)(h.a.mark((function t(r){var o,c;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("application/json"!==n[0].type){t.next=16;break}return t.prev=1,o=JSON.parse(r.target.result),t.next=5,k(o);case 5:c=t.sent,localStorage.setItem("wallet",JSON.stringify(o)),a({type:"ADD_WALLET",payload:Object(b.a)(Object(b.a)({},c),{},{key:o})}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),console.log("Invalid json in wallet file"),e({title:"Error loading wallet",status:"error",duration:3e3,position:"bottom-left",description:"Invalid JSON in wallet file"});case 14:t.next=18;break;case 16:console.log("Invalid file type"),e({title:"Error loading wallet",status:"error",duration:3e3,position:"bottom-left",description:"Invalid file type"});case 18:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e){return t.apply(this,arguments)}}();try{r.readAsText(n[0])}catch(o){console.log("Invalid file type"),e({title:"Error loading wallet",status:"error",duration:3e3,position:"bottom-left",description:"Invalid file type"})}case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(r.jsx)(u.a,{children:""===n.address?Object(r.jsx)(u.a,{w:"100%",borderStyle:"dashed",borderWidth:"2px",children:Object(r.jsx)(g.a,{onDrop:c,accept:"application/json",children:function(e){var t=e.getRootProps,n=e.getInputProps;return Object(r.jsx)("section",{children:Object(r.jsxs)("div",Object(b.a)(Object(b.a)({},t()),{},{children:[Object(r.jsx)("input",Object(b.a)({},n())),Object(r.jsx)(u.a,{flexDirection:"row",padding:3,children:Object(r.jsx)(f.a,{fontSize:14,textAlign:"center",children:"Drop a wallet file or click to load wallet"})})]}))})}})}):Object(r.jsxs)(O.a,{isInline:!0,children:[Object(r.jsx)(f.a,{children:n.address}),Object(r.jsxs)(f.a,{children:[parseFloat(n.balance).toFixed(4).toLocaleString()," AR"]})]})})},W=function(e,t){switch(console.log("Current state is:",e),console.log("Action requested is:",t),t.type){case"ADD_WALLET":return Object(b.a)(Object(b.a)({},e),{},{key:t.payload.key,balance:t.payload.balance,address:t.payload.address});default:return e}};var I=function(){var e=o.a.useReducer(W,m),t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(r.jsx)(A.Provider,{value:{dispatch:a,state:n},children:Object(r.jsx)(l.a,{theme:d.a,children:Object(r.jsxs)(u.a,{children:[Object(r.jsx)(f.a,{children:"Armob V2"}),Object(r.jsxs)(p.f,{isFitted:!0,align:"center",children:[Object(r.jsxs)(p.e,{children:[Object(r.jsx)(p.d,{children:Object(r.jsx)(S,{})}),Object(r.jsx)(p.d,{children:Object(r.jsx)(f.a,{children:"Transactions"})}),Object(r.jsx)(p.d,{children:Object(r.jsx)(f.a,{children:"Browser"})})]}),Object(r.jsxs)(p.c,{children:[Object(r.jsx)(p.a,{children:"Wallet"}),Object(r.jsx)(p.a,{children:"Transactions"}),Object(r.jsx)(p.a,{children:"Browser"})]})]})]})})})},T=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),o(e),c(e)}))};i.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(I,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");T?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):E(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):E(t,e)}))}}(),L()},78:function(e,t,n){}},[[131,1,2]]]);
//# sourceMappingURL=main.1e5332e5.chunk.js.map