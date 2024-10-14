import{__awaiter as e}from"../../../../node_modules/tslib/tslib.es6.js";import{requestPortFromParentWithVersion as t}from"../internal/communication.js";import{ensureInitialized as r}from"../internal/internalAPIs.js";import{getLogger as n,getApiVersionTag as a}from"../internal/telemetry.js";import{errorNotSupportedOnPlatform as o}from"../public/constants.js";import{runtime as s}from"../public/runtime.js";var i;!function(i){!function(i){let l;const m=n("messageChannels.telemetry");function u(){var e;return!(!r(s)||!(null===(e=s.supports.messageChannels)||void 0===e?void 0:e.telemetry))}i.getTelemetryPort=function(){return e(this,void 0,void 0,(function*(){if(l)return m("Returning telemetry port from cache"),l;if(!u())throw o;return l=yield t(a("v1","messageChannels.telemetry.getTelemetryPort"),"messageChannels.telemetry.getTelemetryPort"),l}))},i.isSupported=u,i._clearTelemetryPort=function(){l=void 0}}(i.telemetry||(i.telemetry={})),function(i){let l;const m=n("messageChannels.dataLayer");function u(){var e;return!(!r(s)||!(null===(e=s.supports.messageChannels)||void 0===e?void 0:e.dataLayer))}i.getDataLayerPort=function(){return e(this,void 0,void 0,(function*(){if(l)return m("Returning dataLayer port from cache"),l;if(!u())throw o;return l=yield t(a("v1","messageChannels.dataLayer.getDataLayerPort"),"messageChannels.dataLayer.getDataLayerPort"),l}))},i.isSupported=u,i._clearDataLayerPort=function(){l=void 0}}(i.dataLayer||(i.dataLayer={})),i.isSupported=function(){return!(!r(s)||!s.supports.messageChannels)}}(i||(i={}));export{i as messageChannels};
