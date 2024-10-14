import{__awaiter as t}from"../../../../node_modules/tslib/tslib.es6.js";import{sendAndHandleSdkError as e}from"../internal/communication.js";import{ensureInitialized as n}from"../internal/internalAPIs.js";import{getApiVersionTag as r}from"../internal/telemetry.js";import{callCallbackWithSdkErrorFromPromiseAndReturnPromise as o}from"../internal/utils.js";import{FrameContexts as s,errorNotSupportedOnPlatform as i}from"./constants.js";import{ErrorCode as a}from"./interfaces.js";import{runtime as m}from"./runtime.js";var u;!function(u){function c(t,n){return new Promise((r=>{if(!h())throw i;r(e(t,u.SharingAPIMessages.shareWebContent,n))}))}function h(){return!(!n(m)||!m.supports.sharing)}u.SharingAPIMessages={shareWebContent:"sharing.shareWebContent"},u.shareWebContent=function(t,e){try{!function(t){if(!(t&&t.content&&t.content.length)){throw{errorCode:a.INVALID_ARGUMENTS,message:"Shared content is missing"}}}(t),function(t){let e;if(t.content.some((t=>!t.type)))throw e={errorCode:a.INVALID_ARGUMENTS,message:"Shared content type cannot be undefined"},e;if(t.content.some((e=>e.type!==t.content[0].type)))throw e={errorCode:a.INVALID_ARGUMENTS,message:"Shared content must be of the same type"},e}(t),function(t){let e;if("URL"!==t.content[0].type)throw e={errorCode:a.INVALID_ARGUMENTS,message:"Content type is unsupported"},e;if(t.content.some((t=>!t.url)))throw e={errorCode:a.INVALID_ARGUMENTS,message:"URLs are required for URL content types"},e}(t)}catch(t){return o((()=>Promise.reject(t)),e)}n(m,s.content,s.sidePanel,s.task,s.stage,s.meetingStage);const i=r(e?"v1":"v2","sharing.shareWebContent");return o(c,e,i,t)},u.isSupported=h,function(o){function a(){var t;return n(m)&&void 0!==(null===(t=m.supports.sharing)||void 0===t?void 0:t.history)}o.getContent=function(){return t(this,void 0,void 0,(function*(){if(n(m,s.sidePanel,s.meetingStage),!a())throw i;return yield e(r("v2","sharing.history.getContent"),"sharing.history.getContent")}))},o.isSupported=a}(u.history||(u.history={}))}(u||(u={}));export{u as sharing};
