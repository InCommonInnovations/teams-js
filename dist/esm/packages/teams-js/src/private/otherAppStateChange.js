import{sendMessageToParent as r}from"../internal/communication.js";import{registerHandler as t,removeHandler as n}from"../internal/handlers.js";import{ensureInitialized as i}from"../internal/internalAPIs.js";import{getApiVersionTag as e}from"../internal/telemetry.js";import{isNullOrUndefined as o}from"../internal/typeCheckUtilities.js";import{ErrorCode as p}from"../public/interfaces.js";import{runtime as l}from"../public/runtime.js";var s;!function(s){function a(){return!(!i(l)||!l.supports.otherAppStateChange)}s.registerAppInstallationHandler=function(r){if(!a())throw new Error(p.NOT_SUPPORTED_ON_PLATFORM.toString());if(o(r))throw new Error(p.INVALID_ARGUMENTS.toString());t(e("v2","otherApp.install"),"otherApp.install",r)},s.unregisterAppInstallationHandler=function(){if(!a())throw new Error(p.NOT_SUPPORTED_ON_PLATFORM.toString());r(e("v2","otherApp.unregisterInstall"),"otherApp.unregisterInstall"),n("otherApp.install")},s.isSupported=a}(s||(s={}));export{s as otherAppStateChange};