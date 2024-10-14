import{ensureInitialized as e}from"../internal/internalAPIs.js";import{getApiVersionTag as t}from"../internal/telemetry.js";import{getGenericOnCompleteHandler as n}from"../internal/utils.js";import{FrameContexts as s}from"./constants.js";import{configSetValidityStateHelper as i,getConfigHelper as r,configSetConfigHelper as o,pages as a}from"./pages.js";import{runtime as g}from"./runtime.js";const l="v1";var m;!function(m){m.setValidityState=function(e){i(t(l,"settings.setValidityState"),e)},m.getSettings=function(n){e(g,s.content,s.settings,s.remove,s.sidePanel),r(t(l,"settings.getSettings")).then((e=>{n(e)}))},m.setSettings=function(i,r){e(g,s.content,s.settings,s.sidePanel);const a=null!=r?r:n();o(t(l,"settings.setSettings"),i).then((()=>{a(!0)})).catch((e=>{a(!1,e.message)}))},m.registerOnSaveHandler=function(e){a.config.registerOnSaveHandlerHelper(t(l,"settings.registerOnSaveHandler"),e)},m.registerOnRemoveHandler=function(e){a.config.registerOnRemoveHandlerHelper(t(l,"settings.registerOnRemoveHandler"),e)}}(m||(m={}));export{m as settings};
