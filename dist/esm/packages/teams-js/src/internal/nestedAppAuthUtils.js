import{GlobalVars as e}from"./globalVars.js";import{getLogger as t}from"./telemetry.js";const n=t("nestedAppAuthUtils"),s=n.extend("tryPolyfillWithNestedAppAuthBridge");function r(t,n,r){var i;const d=s;if(e.isFramelessWindow)return void d("Cannot polyfill nestedAppAuthBridge as current window is frameless");if(!n)return void d("Cannot polyfill nestedAppAuthBridge as current window does not exist");const p=(()=>{try{return JSON.parse(t)}catch(e){return null}})();if(!p||!(null===(i=p.supports)||void 0===i?void 0:i.nestedAppAuth))return void d("Cannot polyfill nestedAppAuthBridge as current hub does not support nested app auth");const u=n;if(u.nestedAppAuthBridge)return void d("nestedAppAuthBridge already exists on current window, skipping polyfill");const a=function(e,t){const n=o;if(!e)return n("nestedAppAuthBridge cannot be created as current window does not exist"),null;const{onMessage:s,sendPostMessage:r}=t,i=e=>t=>s(t,e);return{addEventListener:(t,s)=>{"message"===t?e.addEventListener(t,i(s)):n(`Event ${t} is not supported by nestedAppAuthBridge`)},postMessage:e=>{const t=(()=>{try{return JSON.parse(e)}catch(e){return null}})();t&&"object"==typeof t&&"NestedAppAuthRequest"===t.messageType?r(e):n("Unrecognized data format received by app, message being ignored. Message: %o",e)},removeEventListener:(t,n)=>{e.removeEventListener(t,i(n))}}}(u,r);a&&(u.nestedAppAuthBridge=a)}const o=n.extend("createNestedAppAuthBridge");export{r as tryPolyfillWithNestedAppAuthBridge};