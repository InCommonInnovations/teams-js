import{__rest as o}from"../../../../node_modules/tslib/tslib.es6.js";import{errorRuntimeNotInitialized as e,errorRuntimeNotSupported as s}from"../internal/constants.js";import{GlobalVars as i}from"../internal/globalVars.js";import{getLogger as t}from"../internal/telemetry.js";import{compareSDKVersions as n,deepFreeze as a}from"../internal/utils.js";import{HostClientType as r,teamsMinAdaptiveCardVersion as p}from"./constants.js";const l=t("runtime"),d=4;function u(o){return 4===o.apiVersion}function c(o){if(u(o))return!0;throw-1===o.apiVersion?new Error(e):new Error(s)}let g={apiVersion:-1,supports:{}};const m={apiVersion:4,isNAAChannelRecommended:!1,hostVersionsInfo:p,isLegacyTeams:!0,supports:{appInstallDialog:{},appEntity:{},call:{},chat:{},conversations:{},dialog:{card:{bot:{}},url:{bot:{},parentCommunication:{}},update:{}},interactive:{},logs:{},meetingRoom:{},menus:{},monetization:{},notifications:{},pages:{config:{},backStack:{},fullTrust:{}},remoteCamera:{},teams:{fullTrust:{}},teamsCore:{},video:{sharedFrame:{}}}},b=[r.desktop,r.web,r.rigel,r.surfaceHub,r.teamsRoomsWindows,r.teamsRoomsAndroid,r.teamsPhones,r.teamsDisplays],f=[r.android,r.ios,r.ipados],y=[...b,...f];function h(o){let e=o;if(e.apiVersion<4&&v.forEach((o=>{e.apiVersion===o.versionToUpgradeFrom&&(e=o.upgradeToNextVersion(e))})),u(e))return e;throw new Error("Received a runtime that could not be upgraded to the latest version")}const v=[{versionToUpgradeFrom:1,upgradeToNextVersion:o=>{var e;return{apiVersion:2,hostVersionsInfo:void 0,isLegacyTeams:o.isLegacyTeams,supports:Object.assign(Object.assign({},o.supports),{dialog:o.supports.dialog?{card:void 0,url:o.supports.dialog,update:null===(e=o.supports.dialog)||void 0===e?void 0:e.update}:void 0})}}},{versionToUpgradeFrom:2,upgradeToNextVersion:e=>{const s=e.supports,i=o(s,["appNotification"]);return Object.assign(Object.assign({},e),{apiVersion:3,supports:i})}},{versionToUpgradeFrom:3,upgradeToNextVersion:o=>{var e,s,i,t,n;return{apiVersion:4,hostVersionsInfo:o.hostVersionsInfo,isNAAChannelRecommended:o.isNAAChannelRecommended,isLegacyTeams:o.isLegacyTeams,supports:Object.assign(Object.assign({},o.supports),{dialog:o.supports.dialog?{card:null===(e=o.supports.dialog)||void 0===e?void 0:e.card,url:{bot:null===(i=null===(s=o.supports.dialog)||void 0===s?void 0:s.url)||void 0===i?void 0:i.bot,parentCommunication:(null===(t=o.supports.dialog)||void 0===t?void 0:t.url)?{}:void 0},update:null===(n=o.supports.dialog)||void 0===n?void 0:n.update}:void 0})}}}],T={"1.0.0":[{capability:{pages:{appButton:{},tabs:{}},stageView:{}},hostClientTypes:b}],"1.9.0":[{capability:{location:{}},hostClientTypes:y}],"2.0.0":[{capability:{people:{}},hostClientTypes:y},{capability:{sharing:{}},hostClientTypes:[r.desktop,r.web]}],"2.0.1":[{capability:{teams:{fullTrust:{joinedTeams:{}}}},hostClientTypes:[r.android,r.desktop,r.ios,r.teamsRoomsAndroid,r.teamsPhones,r.teamsDisplays,r.web]},{capability:{webStorage:{}},hostClientTypes:[r.desktop]}],"2.0.5":[{capability:{webStorage:{}},hostClientTypes:[r.android,r.ios]}],"2.0.8":[{capability:{sharing:{}},hostClientTypes:[r.android,r.ios]}]},V=l.extend("generateBackCompatRuntimeConfig");function C(o,e){const s=Object.assign({},o);for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&("object"!=typeof e[i]||Array.isArray(e[i])?i in o||(s[i]=e[i]):s[i]=C(o[i]||{},e[i]));return s}function j(o,e,s){V("generating back compat runtime config for %s",o);let t=Object.assign({},e.supports);V("Supported capabilities in config before updating based on highestSupportedVersion: %o",t),Object.keys(s).forEach((e=>{n(o,e)>=0&&s[e].forEach((o=>{void 0!==i.hostClientType&&o.hostClientTypes.includes(i.hostClientType)&&(t=C(t,o.capability))}))}));const a={apiVersion:4,hostVersionsInfo:p,isLegacyTeams:!0,supports:t};return V("Runtime config after updating based on highestSupportedVersion: %o",a),a}const w=l.extend("applyRuntimeConfig");function O(o){"string"==typeof o.apiVersion&&(w("Trying to apply runtime with string apiVersion, processing as v1: %o",o),o=Object.assign(Object.assign({},o),{apiVersion:1})),w("Fast-forwarding runtime %o",o);const e=h(o);w("Applying runtime %o",e),g=a(e)}export{O as applyRuntimeConfig,h as fastForwardRuntime,j as generateVersionBasedTeamsRuntimeConfig,c as isRuntimeInitialized,d as latestRuntimeApiVersion,T as mapTeamsVersionToSupportedCapabilities,g as runtime,v as upgradeChain,y as v1HostClientTypes,f as v1MobileHostClientTypes,m as versionAndPlatformAgnosticTeamsRuntimeConfig};