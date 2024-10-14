import{sendAndHandleStatusAndReasonWithDefaultError as e,sendMessageToParent as t,sendAndUnwrap as n,sendAndHandleStatusAndReason as r,sendAndHandleSdkError as i,Communication as s,sendMessageEventToChild as o}from"../internal/communication.js";import{registerHandlerHelper as a,registerHandler as u}from"../internal/handlers.js";import{ensureInitialized as c}from"../internal/internalAPIs.js";import{getApiVersionTag as p}from"../internal/telemetry.js";import{isNullOrUndefined as g}from"../internal/typeCheckUtilities.js";import{createTeamsAppLink as f}from"../internal/utils.js";import{prefetchOriginsFromCDN as l}from"../internal/validOrigins.js";import{AppId as d}from"./appId.js";import{appInitializeHelper as m}from"./app.js";import{FrameContexts as v,errorNotSupportedOnPlatform as h}from"./constants.js";import{runtime as w}from"./runtime.js";const S="v2";function k(t,n){return new Promise((r=>{if(c(w,v.content,v.sidePanel,v.settings,v.remove,v.task,v.stage,v.meetingStage),!N.isSupported())throw h;r(e(t,"navigateCrossDomain","Cross-origin navigation is only supported for URLs matching the pattern registered in the manifest.",n))}))}function b(t){return new Promise((n=>{if(c(w),!N.backStack.isSupported())throw h;n(e(t,"navigateBack","Back navigation is not supported in the current client or context."))}))}function T(t,n){return new Promise((r=>{if(c(w),!N.tabs.isSupported())throw h;r(e(t,"navigateToTab","Invalid internalTabInstanceId and/or channelId were/was provided",n))}))}function F(e,n){if(c(w),!N.isSupported())throw h;t(e,"returnFocus",[n])}function y(e,t){return new Promise((r=>{if(c(w),!N.tabs.isSupported())throw h;r(n(e,"getTabInstances",t))}))}function P(e,t){return new Promise((r=>{if(c(w),!N.tabs.isSupported())throw h;r(n(e,"getMruTabInstances",t))}))}function H(e,n){if(c(w,v.content,v.sidePanel,v.meetingStage),!N.isSupported())throw h;t(e,"shareDeepLink",[n.subPageId,n.subPageLabel,n.subPageWebUrl])}function B(e,n){if(c(w,v.content),!N.isSupported())throw h;t(e,"setFrameContext",[n])}function C(e,n){if(c(w,v.settings,v.remove),!N.config.isSupported())throw h;t(e,"settings.setValidityState",[n])}function L(e){return new Promise((t=>{if(c(w,v.content,v.settings,v.remove,v.sidePanel),!N.isSupported())throw h;t(n(e,"settings.getSettings"))}))}function I(e,t){return new Promise((n=>{if(c(w,v.content,v.settings,v.sidePanel),!N.config.isSupported())throw h;n(r(e,"settings.setSettings",t))}))}var N;function E(e){return e.appId instanceof d}function j(e){return Object.assign(Object.assign({},e),{appId:new d(e.appId),webUrl:e.webUrl?new URL(e.webUrl):void 0})}function x(e){return Object.assign(Object.assign({},e),{appId:e.appId.toString(),webUrl:e.webUrl?e.webUrl.toString():void 0})}!function(e){var n,d,F;function N(e){B(p(S,"pages.setCurrentFrame"),e)}function A(){return!(!c(w)||!w.supports.pages)}(n=e.EnterFocusType||(e.EnterFocusType={}))[n.PreviousLandmark=0]="PreviousLandmark",n[n.NextLandmark=1]="NextLandmark",n[n.Read=2]="Read",n[n.Compose=3]="Compose",(d=e.ReturnFocusType||(e.ReturnFocusType={}))[d.PreviousLandmark=0]="PreviousLandmark",d[d.NextLandmark=1]="NextLandmark",d[d.GoToActivityFeed=2]="GoToActivityFeed",e.returnFocus=function(n){const r=p(S,"pages.returnFocus");if(c(w),!e.isSupported())throw h;if(void 0===n&&t(r,"returnFocus",[!1]),"boolean"==typeof n)t(r,"returnFocus",[n]);else switch(n){case e.ReturnFocusType.PreviousLandmark:case e.ReturnFocusType.GoToActivityFeed:t(r,"returnFocus",[!1,n]);break;case e.ReturnFocusType.NextLandmark:t(r,"returnFocus",[!0,n])}},e.registerFocusEnterHandler=function(e){a(p(S,"pages.registerFocusEnterHandler"),"focusEnter",e,[],(()=>{if(!A())throw h}))},e.setCurrentFrame=N,e.initializeWithFrameContext=function(e,t,n){l(),m(p(S,"pages.initializeWithFrameContext"),n).then((()=>t&&t())),N(e)},e.getConfig=function(){return L(p(S,"pages.getConfig."))},e.navigateCrossDomain=function(e){return k(p(S,"pages.navigateCrossDomain"),e)},e.navigateToApp=function(e){return new Promise((t=>{if(c(w,v.content,v.sidePanel,v.settings,v.task,v.stage,v.meetingStage),!A())throw h;const n=p(S,"pages.navigateToApp");if(w.isLegacyTeams){const i=E(e)?e:j(e);t(r(n,"executeDeepLink",f(i)))}else{const i=E(e)?x(e):e;t(r(n,"pages.navigateToApp",i))}}))},e.shareDeepLink=function(e){return H(p(S,"pages.shareDeepLink"),e)},e.registerFullScreenHandler=function(e){a(p(S,"pages.registerFullScreenHandler"),"fullScreenChange",e,[],(()=>{if(!g(e)&&!A())throw h}))},e.isSupported=A,(F=e.tabs||(e.tabs={})).navigateToTab=function(e){return T(p(S,"pages.tabs.navigateToTab"),e)},F.getTabInstances=function(e){return y(p(S,"pages.tabs.getTabInstances"),e)},F.getMruTabInstances=function(e){return P(p(S,"pages.tabs.getMruTabInstances"),e)},F.isSupported=function(){return!(!c(w)||!w.supports.pages||!w.supports.pages.tabs)},function(e){let n,r;function i(e,r,i){!g(r)&&c(w,v.settings),i&&i(),n=r,!g(r)&&t(e,"registerHandler",["save"])}function f(e,n,i){!g(n)&&c(w,v.remove,v.settings),i&&i(),r=n,!g(n)&&t(e,"registerHandler",["remove"])}function l(e){const t=new d(e);n?n(t):s.childWindow?o("settings.save",[e]):t.notifySuccess()}e.initialize=function(){u(p(S,"pages.config.registerSettingsSaveHandler"),"settings.save",l,!1),u(p(S,"pages.config.registerSettingsRemoveHandler"),"settings.remove",m,!1)},e.setValidityState=function(e){return C(p(S,"pages.config.setValidityState"),e)},e.setConfig=function(e){return I(p(S,"pages.config.setConfig"),e)},e.registerOnSaveHandler=function(e){i(p(S,"pages.config.registerOnSaveHandler"),e,(()=>{if(!g(e)&&!b())throw h}))},e.registerOnSaveHandlerHelper=i,e.registerOnRemoveHandler=function(e){f(p(S,"pages.config.registerOnRemoveHandler"),e,(()=>{if(!g(e)&&!b())throw h}))},e.registerOnRemoveHandlerHelper=f,e.registerChangeConfigHandler=function(e){a(p(S,"pages.config.registerChangeConfigHandler"),"changeSettings",e,[v.content],(()=>{if(!b())throw h}))};class d{constructor(e){this.notified=!1,this.result=e||{}}notifySuccess(){this.ensureNotNotified(),t(p(S,"pages.saveEvent.notifySuccess"),"settings.save.success"),this.notified=!0}notifyFailure(e){this.ensureNotNotified(),t(p(S,"pages.saveEvent.notifyFailure"),"settings.save.failure",[e]),this.notified=!0}ensureNotNotified(){if(this.notified)throw new Error("The SaveEvent may only notify success or failure once.")}}function m(){const e=new k;r?r(e):s.childWindow?o("settings.remove",[]):e.notifySuccess()}class k{constructor(){this.notified=!1}notifySuccess(){this.ensureNotNotified(),t(p(S,"pages.removeEvent.notifySuccess"),"settings.remove.success"),this.notified=!0}notifyFailure(e){this.ensureNotNotified(),t(p(S,"pages.removeEvent.notifyFailure"),"settings.remove.failure",[e]),this.notified=!0}ensureNotNotified(){if(this.notified)throw new Error("The removeEventType may only notify success or failure once.")}}function b(){return!(!c(w)||!w.supports.pages)&&!!w.supports.pages.config}e.isSupported=b}(e.config||(e.config={})),function(e){let n;function r(){return b(p(S,"pages.backStack.navigateBack"))}function i(e,r,i){!g(r)&&c(w),i&&i(),n=r,!g(r)&&t(e,"registerHandler",["backButton"])}function a(){n&&n()||(s.childWindow?o("backButtonPress",[]):r())}function f(){return!(!c(w)||!w.supports.pages)&&!!w.supports.pages.backStack}e._initialize=function(){u(p(S,"pages.backStack.registerBackButtonPressHandler"),"backButtonPress",a,!1)},e.navigateBack=r,e.registerBackButtonHandler=function(e){i(p(S,"pages.backStack.registerBackButtonHandler"),e,(()=>{if(!g(e)&&!f())throw h}))},e.registerBackButtonHandlerHelper=i,e.isSupported=f}(e.backStack||(e.backStack={})),function(e){function n(){return!(!c(w)||!w.supports.pages)&&!!w.supports.pages.fullTrust}e.enterFullscreen=function(){if(c(w,v.content),!n())throw h;t(p(S,"pages.fullTrust.enterFullscreen"),"enterFullscreen",[])},e.exitFullscreen=function(){if(c(w,v.content),!n())throw h;t(p(S,"pages.fullTrust.exitFullscreen"),"exitFullscreen",[])},e.isSupported=n}(e.fullTrust||(e.fullTrust={})),function(e){function t(){return!(!c(w)||!w.supports.pages)&&!!w.supports.pages.appButton}e.onClick=function(e){a(p(S,"pages.appButton.onClick"),"appButtonClick",e,[v.content],(()=>{if(!t())throw h}))},e.onHoverEnter=function(e){a(p(S,"pages.appButton.onHoverEnter"),"appButtonHoverEnter",e,[v.content],(()=>{if(!t())throw h}))},e.onHoverLeave=function(e){a(p(S,"pages.appButton.onHoverLeave"),"appButtonHoverLeave",e,[v.content],(()=>{if(!t())throw h}))},e.isSupported=t}(e.appButton||(e.appButton={})),function(e){function t(){return!(!c(w)||!w.supports.pages)&&!!w.supports.pages.currentApp}e.navigateTo=function(e){return new Promise((n=>{if(c(w,v.content,v.sidePanel,v.settings,v.task,v.stage,v.meetingStage),!t())throw h;n(i(p(S,"pages.currentApp.navigateTo"),"pages.currentApp.navigateTo",e))}))},e.navigateToDefaultPage=function(){return new Promise((e=>{if(c(w,v.content,v.sidePanel,v.settings,v.task,v.stage,v.meetingStage),!t())throw h;e(i(p(S,"pages.currentApp.navigateToDefaultPage"),"pages.currentApp.navigateToDefaultPage"))}))},e.isSupported=t}(e.currentApp||(e.currentApp={}))}(N||(N={}));export{b as backStackNavigateBackHelper,I as configSetConfigHelper,C as configSetValidityStateHelper,x as convertAppNavigationParametersToNavigateToAppParams,j as convertNavigateToAppParamsToAppNavigationParameters,L as getConfigHelper,P as getMruTabInstancesHelper,y as getTabInstancesHelper,E as isAppNavigationParametersObject,k as navigateCrossDomainHelper,N as pages,F as returnFocusHelper,B as setCurrentFrameHelper,H as shareDeepLinkHelper,T as tabsNavigateToTabHelper};