import e from"./_polyfill-node.global.js";import{Buffer as t}from"./_polyfill-node.buffer.js";import n from"./_polyfill-node.process.js";import r from"./_polyfill-node._inherits.js";var o=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},i=/%[sdj%]/g;function u(e){if(!w(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(a(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,u=String(e).replace(i,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}})),c=r[n];n<o;c=r[++n])v(c)||!x(c)?u+=" "+c:u+=" "+a(c);return u}function c(t,r){if(z(e.process))return function(){return c(t,r).apply(this,arguments)};if(!0===n.noDeprecation)return t;var o=!1;return function(){if(!o){if(n.throwDeprecation)throw new Error(r);n.traceDeprecation?console.trace(r):console.error(r),o=!0}return t.apply(this,arguments)}}var l,s={};function f(e){if(z(l)&&(l=n.env.NODE_DEBUG||""),e=e.toUpperCase(),!s[e])if(new RegExp("\\b"+e+"\\b","i").test(l)){s[e]=function(){var t=u.apply(null,arguments);console.error("%s %d: %s",e,0,t)}}else s[e]=function(){};return s[e]}function a(e,t){var n={seen:[],stylize:y};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),m(t)?n.showHidden=t:t&&R(n,t),z(n.showHidden)&&(n.showHidden=!1),z(n.depth)&&(n.depth=2),z(n.colors)&&(n.colors=!1),z(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=p),g(n,e,n.depth)}function p(e,t){var n=a.styles[t];return n?"["+a.colors[n][0]+"m"+e+"["+a.colors[n][1]+"m":e}function y(e,t){return e}function g(e,t,n){if(e.customInspect&&t&&T(t.inspect)&&t.inspect!==a&&(!t.constructor||t.constructor.prototype!==t)){var r=t.inspect(n,e);return w(r)||(r=g(e,r,n)),r}var o=function(e,t){if(z(t))return e.stylize("undefined","undefined");if(w(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(j(t))return e.stylize(""+t,"number");if(m(t))return e.stylize(""+t,"boolean");if(v(t))return e.stylize("null","null")}(e,t);if(o)return o;var i=Object.keys(t),u=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(t)),D(t)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return d(t);if(0===i.length){if(T(t)){var c=t.name?": "+t.name:"";return e.stylize("[Function"+c+"]","special")}if(E(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(P(t))return e.stylize(Date.prototype.toString.call(t),"date");if(D(t))return d(t)}var l,s="",f=!1,p=["{","}"];(h(t)&&(f=!0,p=["[","]"]),T(t))&&(s=" [Function"+(t.name?": "+t.name:"")+"]");return E(t)&&(s=" "+RegExp.prototype.toString.call(t)),P(t)&&(s=" "+Date.prototype.toUTCString.call(t)),D(t)&&(s=" "+d(t)),0!==i.length||f&&0!=t.length?n<0?E(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special"):(e.seen.push(t),l=f?function(e,t,n,r,o){for(var i=[],u=0,c=t.length;u<c;++u)H(t,String(u))?i.push(b(e,t,n,r,String(u),!0)):i.push("");return o.forEach((function(o){o.match(/^\d+$/)||i.push(b(e,t,n,r,o,!0))})),i}(e,t,n,u,i):i.map((function(r){return b(e,t,n,u,r,f)})),e.seen.pop(),function(e,t,n){var r=e.reduce((function(e,t){return t.indexOf("\n"),e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0);if(r>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(l,s,p)):p[0]+s+p[1]}function d(e){return"["+Error.prototype.toString.call(e)+"]"}function b(e,t,n,r,o,i){var u,c,l;if((l=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?c=l.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):l.set&&(c=e.stylize("[Setter]","special")),H(r,o)||(u="["+o+"]"),c||(e.seen.indexOf(l.value)<0?(c=v(n)?g(e,l.value,null):g(e,l.value,n-1)).indexOf("\n")>-1&&(c=i?c.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+c.split("\n").map((function(e){return"   "+e})).join("\n")):c=e.stylize("[Circular]","special")),z(u)){if(i&&o.match(/^\d+$/))return c;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=e.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=e.stylize(u,"string"))}return u+": "+c}function h(e){return Array.isArray(e)}function m(e){return"boolean"==typeof e}function v(e){return null===e}function O(e){return null==e}function j(e){return"number"==typeof e}function w(e){return"string"==typeof e}function S(e){return"symbol"==typeof e}function z(e){return void 0===e}function E(e){return x(e)&&"[object RegExp]"===F(e)}function x(e){return"object"==typeof e&&null!==e}function P(e){return x(e)&&"[object Date]"===F(e)}function D(e){return x(e)&&("[object Error]"===F(e)||e instanceof Error)}function T(e){return"function"==typeof e}function N(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e}function _(e){return t.isBuffer(e)}function F(e){return Object.prototype.toString.call(e)}function k(e){return e<10?"0"+e.toString(10):e.toString(10)}a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"};var A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function J(){var e,t;console.log("%s - %s",(e=new Date,t=[k(e.getHours()),k(e.getMinutes()),k(e.getSeconds())].join(":"),[e.getDate(),A[e.getMonth()],t].join(" ")),u.apply(null,arguments))}function R(e,t){if(!t||!x(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}function H(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var U="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function $(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(U&&e[U]){var t;if("function"!=typeof(t=e[U]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,o)}catch(e){n(e)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),U&&Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,o(e))}function B(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}function C(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');function t(){for(var t=[],r=0;r<arguments.length;r++)t.push(arguments[r]);var o=t.pop();if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");var i=this,u=function(){return o.apply(i,arguments)};e.apply(this,t).then((function(e){n.nextTick(u.bind(null,null,e))}),(function(e){n.nextTick(B.bind(null,e,u))}))}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),Object.defineProperties(t,o(e)),t}$.custom=U;var M={inherits:r,_extend:R,log:J,isBuffer:_,isPrimitive:N,isFunction:T,isError:D,isDate:P,isObject:x,isRegExp:E,isUndefined:z,isSymbol:S,isString:w,isNumber:j,isNullOrUndefined:O,isNull:v,isBoolean:m,isArray:h,inspect:a,deprecate:c,format:u,debuglog:f,promisify:$,callbackify:C};export{R as _extend,C as callbackify,f as debuglog,M as default,c as deprecate,u as format,r as inherits,a as inspect,h as isArray,m as isBoolean,_ as isBuffer,P as isDate,D as isError,T as isFunction,v as isNull,O as isNullOrUndefined,j as isNumber,x as isObject,N as isPrimitive,E as isRegExp,w as isString,S as isSymbol,z as isUndefined,J as log,$ as promisify};
