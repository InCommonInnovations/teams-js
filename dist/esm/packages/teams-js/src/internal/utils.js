import{Buffer as t}from"../../../../_virtual/_polyfill-node.buffer.js";import{minAdaptiveCardVersion as n}from"../public/constants.js";function e(t){return(t,n)=>{if(!t)throw new Error(n)}}function r(t,n){if("string"!=typeof t||"string"!=typeof n)return NaN;const e=t.split("."),r=n.split(".");function o(t){return/^\d+$/.test(t)}if(!e.every(o)||!r.every(o))return NaN;for(;e.length<r.length;)e.push("0");for(;r.length<e.length;)r.push("0");for(let t=0;t<e.length;++t)if(Number(e[t])!=Number(r[t]))return Number(e[t])>Number(r[t])?1:-1;return 0}function o(){return function(){const t="0123456789abcdef";let n="";for(let e=0;e<36;e++)n+=8===e||13===e||18===e||23===e?"-":14===e?"4":19===e?t.substr(4*Math.random()|8,1):t[Math.floor(16*Math.random())];return n}()}function i(t){return Object.keys(t).forEach((n=>{null!==t[n]&&void 0!==t[n]&&"object"==typeof t[n]&&i(t[n])})),Object.freeze(t)}function c(t,n,...e){const r=t(...e);return r.then((t=>{n&&n(void 0,t)})).catch((t=>{n&&n(t)})),r}function u(t,n,...e){const r=t(...e);return r.then((()=>{n&&n(null)})).catch((t=>{n&&n(t)})),r}function a(t,n,...e){const r=t(...e);return r.then((t=>{n&&n(null,t)})).catch((t=>{n&&n(t,null)})),r}function s(t,n,e){return new Promise(((r,o)=>{const i=setTimeout(o,n,e);t().then((t=>{clearTimeout(i),r(t)})).catch((t=>{clearTimeout(i),o(t)}))}))}function f(t){const n=new URL("https://teams.microsoft.com/l/entity/"+encodeURIComponent(t.appId.toString())+"/"+encodeURIComponent(t.pageId));return t.webUrl&&n.searchParams.append("webUrl",t.webUrl.toString()),(t.chatId||t.channelId||t.subPageId)&&n.searchParams.append("context",JSON.stringify({chatId:t.chatId,channelId:t.channelId,subEntityId:t.subPageId})),n.toString()}function l(t){return!(r(`${t.majorVersion}.${t.minorVersion}`,`${n.majorVersion}.${n.minorVersion}`)>=0)}function h(t){return"https:"===t.protocol}function d(n,e){return new Promise(((r,o)=>{if(n||o("MimeType cannot be null or empty."),e||o("Base64 string cannot be null or empty."),n.startsWith("image/")){const t=atob(e),o=new Uint8Array(t.length);for(let n=0;n<t.length;n++)o[n]=t.charCodeAt(n);r(new Blob([o],{type:n}))}const i=t.from(e,"base64").toString();r(new Blob([i],{type:n}))}))}function m(t){return new Promise(((n,e)=>{0===t.size&&e(new Error("Blob cannot be empty."));const r=new FileReader;r.onloadend=()=>{r.result?n(r.result.toString().split(",")[1]):e(new Error("Failed to read the blob"))},r.onerror=()=>{e(r.error)},r.readAsDataURL(t)}))}function p(){if(w())throw new Error("window object undefined at SSR check");return window}function w(){return"undefined"==typeof window}function b(t,n){if(E(t)||!function(t){return t.length<256&&t.length>4}(t)||!function(t){for(let n=0;n<t.length;n++){const e=t.charCodeAt(n);if(e<32||e>126)return!1}return!0}(t))throw n||new Error("id is not valid.")}function g(t,n){const e=t.toString().toLocaleLowerCase();if(E(e))throw new Error("Invalid Url");if(e.length>2048)throw new Error("Url exceeds the maximum size of 2048 characters");if(!h(t))throw new Error("Url should be a valid https url")}function y(t){const n=document.createElement("a");return n.href=t,new URL(n.href)}function E(t){return new RegExp(`${/<script[^>]*>|&lt;script[^&]*&gt;|%3Cscript[^%]*%3E/gi.source}|${/<\/script[^>]*>|&lt;\/script[^&]*&gt;|%3C\/script[^%]*%3E/gi.source}`,"gi").test(t)}function I(t){if(!t)throw new Error("id must not be empty");if(!1===/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t))throw new Error("id must be a valid UUID")}export{d as base64ToBlob,c as callCallbackWithErrorOrResultFromPromiseAndReturnPromise,a as callCallbackWithErrorOrResultOrNullFromPromiseAndReturnPromise,u as callCallbackWithSdkErrorFromPromiseAndReturnPromise,r as compareSDKVersions,f as createTeamsAppLink,i as deepFreeze,y as fullyQualifyUrlString,o as generateGUID,m as getBase64StringFromBlob,e as getGenericOnCompleteHandler,E as hasScriptTags,w as inServerSideRenderingEnvironment,l as isHostAdaptiveCardSchemaVersionUnsupported,h as isValidHttpsURL,s as runWithTimeout,p as ssrSafeWindow,b as validateId,g as validateUrl,I as validateUuid};