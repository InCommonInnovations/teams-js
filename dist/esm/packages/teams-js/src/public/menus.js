import{sendMessageToParent as e}from"../internal/communication.js";import{registerHandler as n}from"../internal/handlers.js";import{ensureInitialized as t}from"../internal/internalAPIs.js";import{getApiVersionTag as s}from"../internal/telemetry.js";import{runtime as r}from"./runtime.js";import{errorNotSupportedOnPlatform as o}from"./constants.js";const i="v2";var u;!function(u){var m,a;(m=u.DisplayMode||(u.DisplayMode={}))[m.ifRoom=0]="ifRoom",m[m.overflowOnly=1]="overflowOnly";let l,c,f;function p(n){f&&f(n)||(t(r),e(s(i,"menus.handleViewConfigItemPress"),"viewConfigItemPress",[n]))}function M(n){l&&l(n)||(t(r),e(s(i,"menus.handleNavBarMenuItemPress"),"handleNavBarMenuItemPress",[n]))}function d(n){c&&c(n)||(t(r),e(s(i,"menus.handleActionMenuItemPress"),"handleActionMenuItemPress",[n]))}function w(){return!(!t(r)||!r.supports.menus)}u.MenuItem=class{constructor(){this.enabled=!0,this.selected=!1}},(a=u.MenuListType||(u.MenuListType={})).dropDown="dropDown",a.popOver="popOver",u.initialize=function(){n(s(i,"menus.registerNavBarMenuItemPressHandler"),"navBarMenuItemPress",M,!1),n(s(i,"menus.registerActionMenuItemPressHandler"),"actionMenuItemPress",d,!1),n(s(i,"menus.registerSetModuleViewHandler"),"setModuleView",p,!1)},u.setUpViews=function(n,u){if(t(r),!w())throw o;f=u,e(s(i,"menus.setUpViews"),"setUpViews",[n])},u.setNavBarMenu=function(n,u){if(t(r),!w())throw o;l=u,e(s(i,"menus.setNavBarMenu"),"setNavBarMenu",[n])},u.showActionMenu=function(n,u){if(t(r),!w())throw o;c=u,e(s(i,"menus.showActionMenu"),"showActionMenu",[n])},u.isSupported=w}(u||(u={}));export{u as menus};
