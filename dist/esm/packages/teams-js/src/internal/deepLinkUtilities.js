import{teamsDeepLinkProtocol as n,teamsDeepLinkHost as o}from"./constants.js";import{teamsDeepLinkUsersUrlParameterName as e,teamsDeepLinkUrlPathForChat as t,teamsDeepLinkUrlPathForCall as $,teamsDeepLinkAttendeesUrlParameterName as i,teamsDeepLinkUrlPathForCalendar as r,teamsDeepLinkUrlPathForAppInstall as d,teamsDeepLinkTopicUrlParameterName as p,teamsDeepLinkMessageUrlParameterName as c,teamsDeepLinkWithVideoUrlParameterName as a,teamsDeepLinkSourceUrlParameterName as m,teamsDeepLinkStartTimeUrlParameterName as s,teamsDeepLinkEndTimeUrlParameterName as C,teamsDeepLinkSubjectUrlParameterName as I,teamsDeepLinkContentUrlParameterName as l}from"./deepLinkConstants.js";function u($,i,r){if(0===$.length)throw new Error("Must have at least one user when creating a chat deep link");const d=`${e}=`+$.map((n=>encodeURIComponent(n))).join(","),a=void 0===i?"":`&${p}=${encodeURIComponent(i)}`,m=void 0===r?"":`&${c}=${encodeURIComponent(r)}`;return`${n}://${o}${t}?${d}${a}${m}`}function R(t,i,r){if(0===t.length)throw new Error("Must have at least one target when creating a call deep link");const d=`${e}=`+t.map((n=>encodeURIComponent(n))).join(","),p=void 0===i?"":`&${a}=${encodeURIComponent(i)}`,c=void 0===r?"":`&${m}=${encodeURIComponent(r)}`;return`${n}://${o}${$}?${d}${p}${c}`}function U(e,t,$,d,p){const c=void 0===e?"":`${i}=`+e.map((n=>encodeURIComponent(n))).join(","),a=void 0===t?"":`&${s}=${encodeURIComponent(t)}`,m=void 0===$?"":`&${C}=${encodeURIComponent($)}`,u=void 0===d?"":`&${I}=${encodeURIComponent(d)}`,R=void 0===p?"":`&${l}=${encodeURIComponent(p)}`;return`${n}://${o}${r}?${c}${a}${m}${u}${R}`}function h(e){if(!e)throw new Error("App ID must be set when creating an app install dialog deep link");return`${n}://${o}${d}${encodeURIComponent(e)}`}export{h as createTeamsDeepLinkForAppInstallDialog,U as createTeamsDeepLinkForCalendar,R as createTeamsDeepLinkForCall,u as createTeamsDeepLinkForChat};