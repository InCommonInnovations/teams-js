import{__awaiter as e}from"../../../../node_modules/tslib/tslib.es6.js";import{sendMessageToParent as n,sendAndHandleSdkError as t}from"../internal/communication.js";import{registerHandler as i,doesHandlerExist as a,removeHandler as o}from"../internal/handlers.js";import{ensureInitialized as r}from"../internal/internalAPIs.js";import{getApiVersionTag as l}from"../internal/telemetry.js";import{FrameContexts as g}from"./constants.js";import{ErrorCode as s}from"./interfaces.js";import{runtime as d}from"./runtime.js";const c="v1";var u;!function(u){let p;var m,S;let h,C,A;function b(e,t){r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.setMicStateWithReason"),"meeting.updateMicState",[e,t])}!function(e){e[e.HostInitiated=0]="HostInitiated",e[e.AppInitiated=1]="AppInitiated",e[e.AppDeclinedToChange=2]="AppDeclinedToChange",e[e.AppFailedToChange=3]="AppFailedToChange"}(p||(p={})),(m=u.MeetingReactionType||(u.MeetingReactionType={})).like="like",m.heart="heart",m.laugh="laugh",m.surprised="surprised",m.applause="applause",(S=u.MeetingType||(u.MeetingType={})).Unknown="Unknown",S.Adhoc="Adhoc",S.Scheduled="Scheduled",S.Recurring="Recurring",S.Broadcast="Broadcast",S.MeetNow="MeetNow",function(e){e.OneOnOneCall="oneOnOneCall",e.GroupCall="groupCall"}(h=u.CallType||(u.CallType={})),function(e){e.Collaborative="Collaborative",e.ScreenShare="ScreenShare"}(C=u.SharingProtocol||(u.SharingProtocol={})),u.getIncomingClientAudioState=function(e){if(!e)throw new Error("[get incoming client audio state] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.getIncomingClientAudioState"),"getIncomingClientAudioState",e)},u.toggleIncomingClientAudio=function(e){if(!e)throw new Error("[toggle incoming client audio] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.toggleIncomingClientAudio"),"toggleIncomingClientAudio",e)},u.getMeetingDetails=function(e){if(!e)throw new Error("[get meeting details] Callback cannot be null");r(d,g.sidePanel,g.meetingStage,g.settings,g.content),n(l(c,"meeting.getMeetingDetails"),"meeting.getMeetingDetails",e)},u.getMeetingDetailsVerbose=function(){var n,i,a;return e(this,void 0,void 0,(function*(){let e;r(d,g.sidePanel,g.meetingStage,g.settings,g.content);try{const n=!0;e=yield t(l("v2","meeting.getMeetingDetailsVerbose"),"meeting.getMeetingDetails",n)}catch(e){throw new Error(null===(n=null==e?void 0:e.errorCode)||void 0===n?void 0:n.toString())}if(((null===(i=e.details)||void 0===i?void 0:i.type)==h.GroupCall||(null===(a=e.details)||void 0===a?void 0:a.type)==h.OneOnOneCall)&&!e.details.originalCallerInfo)throw new Error(s.NOT_SUPPORTED_ON_PLATFORM.toString());return e}))},u.getAuthenticationTokenForAnonymousUser=function(e){if(!e)throw new Error("[get Authentication Token For AnonymousUser] Callback cannot be null");r(d,g.sidePanel,g.meetingStage,g.task),n(l(c,"meeting.getAuthenticationTokenForAnonymousUser"),"meeting.getAuthenticationTokenForAnonymousUser",e)},u.getLiveStreamState=function(e){if(!e)throw new Error("[get live stream state] Callback cannot be null");r(d,g.sidePanel),n(l(c,"meeting.getLiveStreamState"),"meeting.getLiveStreamState",e)},u.requestStartLiveStreaming=function(e,t,i){if(!e)throw new Error("[request start live streaming] Callback cannot be null");r(d,g.sidePanel),n(l(c,"meeting.requestStartLiveStreaming"),"meeting.requestStartLiveStreaming",[t,i],e)},u.requestStopLiveStreaming=function(e){if(!e)throw new Error("[request stop live streaming] Callback cannot be null");r(d,g.sidePanel),n(l(c,"meeting.requestStopLiveStreaming"),"meeting.requestStopLiveStreaming",e)},u.registerLiveStreamChangedHandler=function(e){if(!e)throw new Error("[register live stream changed handler] Handler cannot be null");r(d,g.sidePanel),i(l(c,"meeting.registerLiveStreamChangedHandler"),"meeting.liveStreamChanged",e)},u.shareAppContentToStage=function(e,t,i={sharingProtocol:C.Collaborative}){if(!e)throw new Error("[share app content to stage] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.shareAppContentToStage"),"meeting.shareAppContentToStage",[t,i],e)},u.getAppContentStageSharingCapabilities=function(e){if(!e)throw new Error("[get app content stage sharing capabilities] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.getAppContentStageSharingCapabilities"),"meeting.getAppContentStageSharingCapabilities",e)},u.stopSharingAppContentToStage=function(e){if(!e)throw new Error("[stop sharing app content to stage] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.stopSharingAppContentToStage"),"meeting.stopSharingAppContentToStage",e)},u.getAppContentStageSharingState=function(e){if(!e)throw new Error("[get app content stage sharing state] Callback cannot be null");r(d,g.sidePanel,g.meetingStage),n(l(c,"meeting.getAppContentStageSharingState"),"meeting.getAppContentStageSharingState",e)},u.registerSpeakingStateChangeHandler=function(e){if(!e)throw new Error("[registerSpeakingStateChangeHandler] Handler cannot be null");r(d,g.sidePanel,g.meetingStage),i(l(c,"meeting.registerSpeakingStateChangeHandler"),"meeting.speakingStateChanged",e)},u.registerRaiseHandStateChangedHandler=function(e){if(!e)throw new Error("[registerRaiseHandStateChangedHandler] Handler cannot be null");r(d,g.sidePanel,g.meetingStage),i(l(c,"meeting.registerRaiseHandStateChangedHandler"),"meeting.raiseHandStateChanged",e)},u.registerMeetingReactionReceivedHandler=function(e){if(!e)throw new Error("[registerMeetingReactionReceivedHandler] Handler cannot be null");r(d,g.sidePanel,g.meetingStage),i(l(c,"meeting.registerMeetingReactionReceivedHandler"),"meeting.meetingReactionReceived",e)},u.joinMeeting=function(e){if(void 0===(null==e?void 0:e.joinWebUrl)||null===(null==e?void 0:e.joinWebUrl))return Promise.reject(new Error("Invalid joinMeetingParams"));r(d);const n={joinWebUrl:e.joinWebUrl.href,source:e.source||A.Other};return t(l("v2","meeting.joinMeeting"),"meeting.joinMeeting",n)},function(e){e.M365CalendarGridContextMenu="m365_calendar_grid_context_menu",e.M365CalendarGridPeek="m365_calendar_grid_peek",e.M365CalendarGridEventCardJoinButton="m365_calendar_grid_event_card_join_button",e.M365CalendarFormRibbonJoinButton="m365_calendar_form_ribbon_join_button",e.M365CalendarFormJoinTeamsMeetingButton="m365_calendar_form_join_teams_meeting_button",e.Other="other"}(A=u.EventActionSource||(u.EventActionSource={})),(u.appShareButton||(u.appShareButton={})).setOptions=function(e){r(d,g.sidePanel),e.contentUrl&&new URL(e.contentUrl),n(l(c,"meeting.appShareButton.setOptions"),"meeting.appShareButton.setOptions",[e])},u.requestAppAudioHandling=function(t,s){if(!s)throw new Error("[requestAppAudioHandling] Callback response cannot be null");if(!t.micMuteStateChangedCallback)throw new Error("[requestAppAudioHandling] Callback Mic mute state handler cannot be null");r(d,g.sidePanel,g.meetingStage),t.isAppHandlingAudio?function(t,a){const o=(n,o)=>{if(n&&null!=o)throw new Error("[requestAppAudioHandling] Callback response - both parameters cannot be set");if(n)throw new Error(`[requestAppAudioHandling] Callback response - SDK error ${n.errorCode} ${n.message}`);if("boolean"!=typeof o)throw new Error("[requestAppAudioHandling] Callback response - isHostAudioless must be a boolean");const r=n=>e(this,void 0,void 0,(function*(){try{const e=yield t.micMuteStateChangedCallback(n);b(e,e.isMicMuted===n.isMicMuted?p.HostInitiated:p.AppDeclinedToChange)}catch(e){b(n,p.AppFailedToChange)}}));i(l(c,"meeting.registerMicStateChangeHandler"),"meeting.micStateChanged",r);const g=e=>{var n;null===(n=t.audioDeviceSelectionChangedCallback)||void 0===n||n.call(t,e)};i(l(c,"meeting.registerAudioDeviceSelectionChangedHandler"),"meeting.audioDeviceSelectionChanged",g),a(o)};n(l(c,"meeting.requestAppAudioHandling"),"meeting.requestAppAudioHandling",[t.isAppHandlingAudio],o)}(t,s):function(e,t){const i=(e,n)=>{if(e&&null!=n)throw new Error("[requestAppAudioHandling] Callback response - both parameters cannot be set");if(e)throw new Error(`[requestAppAudioHandling] Callback response - SDK error ${e.errorCode} ${e.message}`);if("boolean"!=typeof n)throw new Error("[requestAppAudioHandling] Callback response - isHostAudioless must be a boolean");a("meeting.micStateChanged")&&o("meeting.micStateChanged"),a("meeting.audioDeviceSelectionChanged")&&o("meeting.audioDeviceSelectionChanged"),t(n)};n(l(c,"meeting.requestAppAudioHandling"),"meeting.requestAppAudioHandling",[e.isAppHandlingAudio],i)}(t,s)},u.updateMicState=function(e){b(e,p.AppInitiated)}}(u||(u={}));export{u as meeting};
