import{ensureInitialized as i}from"../internal/internalAPIs.js";import{errorNotSupportedOnPlatform as n}from"../public/constants.js";import{runtime as o}from"../public/runtime.js";var t;!function(t){!function(t){function r(){var n;return i(o)&&!!(null===(n=o.hostVersionsInfo)||void 0===n?void 0:n.appEligibilityInformation)}t.isSupported=r,t.getEligibilityInfo=function(){if(i(o),!r())throw n;return o.hostVersionsInfo.appEligibilityInformation}}(t.eligibility||(t.eligibility={}))}(t||(t={}));export{t as copilot};
