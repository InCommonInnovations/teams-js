import{sendMessageToParent as e}from"../internal/communication.js";import{ensureInitialized as r}from"../internal/internalAPIs.js";import{decodeAttachment as t,createFile as n}from"../internal/mediaUtil.js";import{getLogger as l,getApiVersionTag as i}from"../internal/telemetry.js";import{FrameContexts as o,errorNotSupportedOnPlatform as s}from"./constants.js";import{ErrorCode as a}from"./interfaces.js";import{runtime as u}from"./runtime.js";const c=l("thirdPartyCloudStorage");var f;!function(l){class f{constructor(e,r){this.fileType=e,this.assembleAttachment=r}}let d=[],h=null,m=!0,p=null;function g(e){if(p)if(e&&e.error)p([],e.error),p=null;else if(e&&e.fileChunk)try{m||0!==e.fileChunk.chunkSequence||(c("Last chunk is not received or 'endOfFile' value for previous chunk was not set to true"),m=!0,p([],{errorCode:a.INTERNAL_ERROR,message:"error occurred while receiving data"}),d=[],p=null);const r=t(e.fileChunk,e.fileType);if(r?(h||(h=new f(e.fileType,[])),h.assembleAttachment.push(r)):(c(`Received a null assemble attachment for when decoding chunk sequence ${e.fileChunk.chunkSequence}; not including the chunk in the assembled file.`),p?p([],{errorCode:a.INTERNAL_ERROR,message:"error occurred while receiving data"}):p=null,d=[],p=null,m=!0),m=e.fileChunk.endOfFile,e.fileChunk.endOfFile&&h){const r=n(h.assembleAttachment,h.fileType);if(r){const t=new File([r],e.fileName,{type:r.type});d.push(t)}e.isLastFile&&p&&(p(d,e.error),d=[],p=null,m=!0),h=null}}catch(e){p&&(p([],{errorCode:a.INTERNAL_ERROR,message:e}),d=[],p=null,m=!0)}else p([],{errorCode:a.INTERNAL_ERROR,message:"data received is null"}),d=[],p=null,m=!0}function R(){return!(!r(u)||!u.supports.thirdPartyCloudStorage)}l.getDragAndDropFiles=function(t,n){if(!n)throw new Error("[getDragAndDropFiles] Callback cannot be null");if(t&&""!==t){if(r(u,o.content,o.task),!R())throw s;if(p)throw p=null,new Error("getDragAndDropFiles cannot be called twice");p=n,m=!0,e(i("v2","thirdPartyCloudStorage.getDragAndDropFiles"),"thirdPartyCloudStorage.getDragAndDropFiles",[t],g)}else{n([],{errorCode:a.INVALID_ARGUMENTS})}},l.isSupported=R}(f||(f={}));export{f as thirdPartyCloudStorage};
