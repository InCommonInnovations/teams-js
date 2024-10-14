import{sendMessageToParent as e,sendAndUnwrap as t}from"../internal/communication.js";import{getUserJoinedTeamsSupportedAndroidClientVersion as r}from"../internal/constants.js";import{GlobalVars as n}from"../internal/globalVars.js";import{ensureInitialized as s,isCurrentSDKVersionAtLeast as o}from"../internal/internalAPIs.js";import{getApiVersionTag as i}from"../internal/telemetry.js";import{FrameContexts as a,errorNotSupportedOnPlatform as l,HostClientType as m}from"../public/constants.js";import{ErrorCode as u}from"../public/interfaces.js";import{runtime as f}from"../public/runtime.js";const p="v1";var h;!function(h){var c;function T(){return!(!s(f)||!f.supports.teams)}(c=h.ChannelType||(h.ChannelType={}))[c.Regular=0]="Regular",c[c.Private=1]="Private",c[c.Shared=2]="Shared",h.getTeamChannels=function(t,r){if(s(f,a.content),!T())throw l;if(!t)throw new Error("[teams.getTeamChannels] groupId cannot be null or empty");if(!r)throw new Error("[teams.getTeamChannels] Callback cannot be null");e(i(p,"teams.getTeamChannels"),"teams.getTeamChannels",[t],r)},h.refreshSiteUrl=function(t,r){if(s(f),!T())throw l;if(!t)throw new Error("[teams.refreshSiteUrl] threadId cannot be null or empty");if(!r)throw new Error("[teams.refreshSiteUrl] Callback cannot be null");e(i(p,"teams.refreshSiteUrl"),"teams.refreshSiteUrl",[t],r)},h.isSupported=T,function(e){function a(){return!(!s(f)||!f.supports.teams)&&!!f.supports.teams.fullTrust}!function(e){function a(){return!(!s(f)||!f.supports.teams)&&(!!f.supports.teams.fullTrust&&!!f.supports.teams.fullTrust.joinedTeams)}e.getUserJoinedTeams=function(e){return new Promise((h=>{if(s(f),!a())throw l;if((n.hostClientType===m.android||n.hostClientType===m.teamsRoomsAndroid||n.hostClientType===m.teamsPhones||n.hostClientType===m.teamsDisplays)&&!o(r)){const e={errorCode:u.OLD_PLATFORM};throw new Error(JSON.stringify(e))}h(t(i(p,"teams.fullTrust.joinedTeams.getUserJoinedTeams"),"getUserJoinedTeams",e))}))},e.isSupported=a}(e.joinedTeams||(e.joinedTeams={})),e.getConfigSetting=function(e){return new Promise((r=>{if(s(f),!a())throw l;r(t(i(p,"teams.fullTrust.getConfigSetting"),"getConfigSetting",e))}))},e.isSupported=a}(h.fullTrust||(h.fullTrust={}))}(h||(h={}));export{h as teams};
