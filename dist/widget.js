(()=>{var t={913:(t,e,i)=>{var n;void 0===(n=function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.isEnvironmentValid=t=>this.environments.includes(t),this.setEnvironment=t=>{t&&this.isEnvironmentValid(t)&&(this.environment=t,t===this.environmentStaging?(this.apiUrl=this.apiUrlStaging,this.eventsUrl=this.eventsUrlStaging):t===this.environmentLocal?(this.apiUrl=this.apiUrlLocal,this.eventsUrl=this.eventsUrlLocal):t===this.environmentProduction&&(this.apiUrl=this.apiUrlProduction,this.eventsUrl=this.eventsUrlProduction))},this.environmentLocal="local",this.environmentStaging="staging",this.environmentProduction="production",this.apiUrl="https://api.tonicpow.com",this.apiUrlLocal="http://localhost:3000",this.apiUrlStaging="https://api.staging.tonicpow.com",this.apiUrlProduction="https://api.tonicpow.com",this.eventsUrl="https://events.tonicpow.com",this.eventsUrlLocal="http://localhost:3002",this.eventsUrlStaging="https://events.staging.tonicpow.com",this.eventsUrlProduction="https://events.tonicpow.com",this.customEnvironment="data-environment",this.environment="",this.environments=[this.environmentLocal,this.environmentStaging,this.environmentProduction],this.maxSessionDays=60,this.sessionName="tncpw_session",this.version="v0.0.8",this.widgetDivClass="tonicpow-widget",this.widgetId="data-widget-id"}}}.apply(e,[i,e]))||(t.exports=n)},242:function(t,e,i){var n,s,o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};n=[i,e,i(913)],void 0===(s=function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i=o(i),e.default=class{constructor(t){this.detectWidgetClick=()=>{document.addEventListener("click",(async t=>{if(((t=t||window.event).target||t.srcElement)?.parentElement?.parentElement?.classList?.contains("tonicpow-widget"))try{this.interactionSent=!0,await this.sendEvent("interaction","click")}catch(t){console.error("failed to report interaction: click",t)}}))},this.detectBounce=()=>{window.onbeforeunload=()=>{this.sendEvent("bounce",((new Date).getTime()-this.start).toString())}},this.detectInteraction=()=>{document.addEventListener("mousedown",(async()=>{if(!this.interactionSent)try{await this.sendEvent("interaction","mousedown"),this.interactionSent=!0}catch(t){console.error("failed to report interaction: mousedown",t)}})),document.addEventListener("scroll",(async()=>{if(!this.interactionSent)try{await this.sendEvent("interaction","scroll"),this.interactionSent=!0}catch(t){console.error("failed to report interaction: scroll",t)}})),document.addEventListener("keypress",(async()=>{if(!this.interactionSent)try{await this.sendEvent("interaction","keypress"),this.interactionSent=!0}catch(t){console.error("failed to report interaction: keypress",t)}}))},this.sendEvent=async(t,e)=>{if(!this.sessionId)return void console.info("you must call init with a session before sending events");let n=new i.default;await fetch(`${n.eventsUrl}/v1/events?v=${n.version}&name=${t}&tncpw_session=${this.sessionId}&data=${e}`,{method:"get"})},this.sessionId=t,this.interactionSent=!1,this.start=(new Date).getTime(),this.detectInteraction(),this.detectBounce(),this.detectWidgetClick()}}}.apply(e,n))||(t.exports=s)},607:function(t,e,i){var n,s,o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};n=[i,e,i(913),i(242),i(912)],void 0===(s=function(t,e,i,n,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i=o(i),n=o(n),s=o(s);const r={AutoInit:!0,WidgetRequestCallback:t=>{}};class a{constructor(t=r){this.registerEvents=()=>{if(!this.events){let t=this.getVisitorSession();t&&(console.log("registering session",t),this.events=new n.default(t))}},this.setOreo=(t,e,i)=>{const n=new Date;n.setTime(n.getTime()+864e5*i),document.cookie=`${t}=${e};path=/;expires=${n.toUTCString()}`},this.captureVisitorSession=(t="")=>{let e=t;return t&&t.length||"undefined"==typeof window||(e=new URLSearchParams(window.location.search).get(this.config.sessionName)||""),e&&e.length>0?(this.setOreo(this.config.sessionName,e,this.config.maxSessionDays),this.storage.setStorage(this.config.sessionName,e,86400*this.config.maxSessionDays),e):null},this.getVisitorSession=()=>this.storage.getStorage(this.config.sessionName),this.loadDivs=async()=>{const t=document.getElementsByClassName(this.config.widgetDivClass);for(let e=t.length-1;e>=0;e--){const i=t[e],n=i.getAttribute(this.config.widgetId);if(!n){console.log(`${n} not found`);continue}const s=i.getAttribute(this.config.customEnvironment);this.config.setEnvironment(s||"production");const o=await fetch(`${this.config.apiUrl}/v1/widgets/display/${n}?provider=embed-${this.config.version}`),a=await o.json();r.WidgetRequestCallback(a);const c=encodeURIComponent(a.title);i.innerHTML=`\n    <a href="${a.link_url}?utm_source=tonicpow-widgets&utm_medium=widget&utm_campaign=${n}&utm_content=${c}" style="display: block">\n      <img src="${a.image_url}" \n      id="${n}"\n      width="${a.width}" \n      height="${a.height}" \n      alt="${a.title}" />\n    </a>`,i.setAttribute("data-width",a.width),i.setAttribute("data-height",a.height)}},this.load=()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");const t=document.getElementsByClassName(this.config.widgetDivClass);t&&t.length>0&&this.loadDivs().then((()=>{console.log("TonicPow widget(s) loaded!")}));const e=this.captureVisitorSession();e&&(this.events=new n.default(e))};for(let[e,i]of Object.entries(t))Object.defineProperty(this,e,{value:i,writable:!1});this.config=new i.default,this.storage=new s.default,t.AutoInit&&("complete"===document.readyState||"interactive"===document.readyState?(this.load(),this.registerEvents()):document.addEventListener("DOMContentLoaded",(()=>{this.load(),this.registerEvents()})))}}e.default=a,window.TonicPow=a||{}}.apply(e,n))||(t.exports=s)},912:(t,e,i)=>{var n;void 0===(n=function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.removeStorage=t=>{try{localStorage.removeItem(t),localStorage.removeItem(`${t}_expiresIn`)}catch(e){return console.log(`removeStorage: Error removing key [${t}] from localStorage: ${JSON.stringify(e)}`),!1}return!0},this.getStorage=t=>{const e=Date.now();let i;try{i=localStorage.getItem(`${t}_expires`)}catch(t){return console.log(`getItem: error getting localStorage: ${JSON.stringify(t)}`),null}if(null==i&&(i=0),i<e)return this.removeStorage(t),null;try{return localStorage.getItem(t)}catch(e){return console.log(`getStorage: Error reading key [${t}] from localStorage: ${JSON.stringify(e)}`),null}},this.setStorage=(t,e,i=null)=>{i=i?Math.abs(i):86400;const n=Date.now()+1e3*i;try{localStorage.setItem(t,e),localStorage.setItem(`${t}_expires`,n.toString())}catch(e){return console.log(`setStorage: Error setting key [${t}] in localStorage: ${JSON.stringify(e)}`),!1}return!0}}}}.apply(e,[i,e]))||(t.exports=n)}},e={};!function i(n){if(e[n])return e[n].exports;var s=e[n]={exports:{}};return t[n].call(s.exports,s,s.exports,i),s.exports}(607)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AdG9uaWNwb3cvd2lkZ2V0Ly4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9AdG9uaWNwb3cvd2lkZ2V0Ly4vc3JjL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9AdG9uaWNwb3cvd2lkZ2V0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0B0b25pY3Bvdy93aWRnZXQvLi9zcmMvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9AdG9uaWNwb3cvd2lkZ2V0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0B0b25pY3Bvdy93aWRnZXQvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImlzRW52aXJvbm1lbnRWYWxpZCIsImVudmlyb25tZW50IiwidGhpcyIsImVudmlyb25tZW50cyIsImluY2x1ZGVzIiwic2V0RW52aXJvbm1lbnQiLCJlbnZpcm9ubWVudFN0YWdpbmciLCJhcGlVcmwiLCJhcGlVcmxTdGFnaW5nIiwiZXZlbnRzVXJsIiwiZXZlbnRzVXJsU3RhZ2luZyIsImVudmlyb25tZW50TG9jYWwiLCJhcGlVcmxMb2NhbCIsImV2ZW50c1VybExvY2FsIiwiZW52aXJvbm1lbnRQcm9kdWN0aW9uIiwiYXBpVXJsUHJvZHVjdGlvbiIsImV2ZW50c1VybFByb2R1Y3Rpb24iLCJjdXN0b21FbnZpcm9ubWVudCIsIm1heFNlc3Npb25EYXlzIiwic2Vzc2lvbk5hbWUiLCJ2ZXJzaW9uIiwid2lkZ2V0RGl2Q2xhc3MiLCJ3aWRnZXRJZCIsInNlc3Npb25JZCIsImRldGVjdFdpZGdldENsaWNrIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYXN5bmMiLCJlIiwid2luZG93IiwiZXZlbnQiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwicGFyZW50RWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiaW50ZXJhY3Rpb25TZW50Iiwic2VuZEV2ZW50IiwiY29uc29sZSIsImVycm9yIiwiZGV0ZWN0Qm91bmNlIiwib25iZWZvcmV1bmxvYWQiLCJEYXRlIiwiZ2V0VGltZSIsInN0YXJ0IiwidG9TdHJpbmciLCJkZXRlY3RJbnRlcmFjdGlvbiIsImV2ZW50TmFtZSIsImRhdGEiLCJpbmZvIiwiY29uZmlnIiwiZmV0Y2giLCJtZXRob2QiLCJkZWZhdWx0T3B0aW9ucyIsIkF1dG9Jbml0IiwiV2lkZ2V0UmVxdWVzdENhbGxiYWNrIiwid2lkZ2V0IiwiVG9uaWNQb3ciLCJvcHRpb25zIiwicmVnaXN0ZXJFdmVudHMiLCJldmVudHMiLCJzZXNzaW9uIiwiZ2V0VmlzaXRvclNlc3Npb24iLCJsb2ciLCJzZXRPcmVvIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImRhdGUiLCJzZXRUaW1lIiwiY29va2llIiwidG9VVENTdHJpbmciLCJjYXB0dXJlVmlzaXRvclNlc3Npb24iLCJjdXN0b21TZXNzaW9uSWQiLCJsZW5ndGgiLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImdldCIsInN0b3JhZ2UiLCJzZXRTdG9yYWdlIiwiZ2V0U3RvcmFnZSIsImxvYWREaXZzIiwidG9uaWNEaXZzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJ0b25pY0RpdiIsImdldEF0dHJpYnV0ZSIsInByb21pc2UiLCJyZXNwb25zZSIsImpzb24iLCJjYW1wYWlnblRpdGxlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidGl0bGUiLCJpbm5lckhUTUwiLCJsaW5rX3VybCIsImltYWdlX3VybCIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0QXR0cmlidXRlIiwibG9hZCIsInRoZW4iLCJvcHRpb25LZXkiLCJvcHRpb25WYWwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZGVmaW5lUHJvcGVydHkiLCJ3cml0YWJsZSIsInJlYWR5U3RhdGUiLCJyZW1vdmVTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJrZXkiLCJub3ciLCJleHBpcmVzIiwiZ2V0SXRlbSIsIk1hdGgiLCJhYnMiLCJzY2hlZHVsZSIsInNldEl0ZW0iLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImNhbGwiXSwibWFwcGluZ3MiOiJ5SEFBQSxnQkFxQkUsY0F3QkEsS0FBQUEsbUJBQXNCQyxHQUF3QkMsS0FBS0MsYUFBYUMsU0FBU0gsR0FHekUsS0FBQUksZUFBa0JKLElBRVhBLEdBS0FDLEtBQUtGLG1CQUFtQkMsS0FLN0JDLEtBQUtELFlBQWNBLEVBR2ZBLElBQWdCQyxLQUFLSSxvQkFDdkJKLEtBQUtLLE9BQVNMLEtBQUtNLGNBQ25CTixLQUFLTyxVQUFZUCxLQUFLUSxrQkFDYlQsSUFBZ0JDLEtBQUtTLGtCQUM5QlQsS0FBS0ssT0FBU0wsS0FBS1UsWUFDbkJWLEtBQUtPLFVBQVlQLEtBQUtXLGdCQUNiWixJQUFnQkMsS0FBS1ksd0JBQzlCWixLQUFLSyxPQUFTTCxLQUFLYSxpQkFDbkJiLEtBQUtPLFVBQVlQLEtBQUtjLHVCQWpEeEJkLEtBQUtTLGlCQUFtQixRQUN4QlQsS0FBS0ksbUJBQXFCLFVBQzFCSixLQUFLWSxzQkFBd0IsYUFFN0JaLEtBQUtLLE9BQVMsMkJBQ2RMLEtBQUtVLFlBQWMsd0JBQ25CVixLQUFLTSxjQUFnQixtQ0FDckJOLEtBQUthLGlCQUFtQiwyQkFDeEJiLEtBQUtPLFVBQVksOEJBQ2pCUCxLQUFLVyxlQUFpQix3QkFDdEJYLEtBQUtRLGlCQUFtQixzQ0FDeEJSLEtBQUtjLG9CQUFzQiw4QkFDM0JkLEtBQUtlLGtCQUFvQixtQkFDekJmLEtBQUtELFlBQWMsR0FDbkJDLEtBQUtDLGFBQWUsQ0FBQ0QsS0FBS1MsaUJBQWtCVCxLQUFLSSxtQkFBb0JKLEtBQUtZLHVCQUMxRVosS0FBS2dCLGVBQWlCLEdBQ3RCaEIsS0FBS2lCLFlBQWMsZ0JBQ25CakIsS0FBS2tCLFFBQVUsU0FDZmxCLEtBQUttQixlQUFpQixrQkFDdEJuQixLQUFLb0IsU0FBVyxvQiw0UEN2Q3BCLGdCQUtFLFlB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RVQsTUFJWixNQUNNSSxFQURNOUUsS0FBS3lFLE1BQ2dCLElBQVZDLEVBQ3ZCLElBQ0VOLGFBQWFXLFFBQVFQLEVBQUtoRCxHQUMxQjRDLGFBQWFXLFFBQVEsR0FBR1AsWUFBZU0sRUFBUzNFLFlBQ2hELE1BQU9qQixHQUVQLE9BREFVLFFBQVF5QixJQUFJLGtDQUFrQ21ELHVCQUF5QkYsS0FBS0MsVUFBVXJGLE9BQy9FLEVBRVQsT0FBTyxNLGlDQzFGUDhGLEVBQTJCLElBRy9CLFNBQVNDLEVBQW9CQyxHQUU1QixHQUFHRixFQUF5QkUsR0FDM0IsT0FBT0YsRUFBeUJFLEdBQVVDLFFBRzNDLElBQUlDLEVBQVNKLEVBQXlCRSxHQUFZLENBR2pEQyxRQUFTLElBT1YsT0FIQUUsRUFBb0JILEdBQVVJLEtBQUtGLEVBQU9ELFFBQVNDLEVBQVFBLEVBQU9ELFFBQVNGLEdBR3BFRyxFQUFPRCxRQ2pCV0YsQ0FBb0IsTSIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWcge1xyXG4gIGVudmlyb25tZW50TG9jYWw6IHN0cmluZ1xyXG4gIGVudmlyb25tZW50U3RhZ2luZzogc3RyaW5nXHJcbiAgZW52aXJvbm1lbnRQcm9kdWN0aW9uOiBzdHJpbmdcclxuICBhcGlVcmw6IHN0cmluZ1xyXG4gIGFwaVVybExvY2FsOiBzdHJpbmdcclxuICBhcGlVcmxTdGFnaW5nOiBzdHJpbmdcclxuICBhcGlVcmxQcm9kdWN0aW9uOiBzdHJpbmdcclxuICBldmVudHNVcmw6IHN0cmluZ1xyXG4gIGV2ZW50c1VybExvY2FsOiBzdHJpbmdcclxuICBldmVudHNVcmxTdGFnaW5nOiBzdHJpbmdcclxuICBldmVudHNVcmxQcm9kdWN0aW9uOiBzdHJpbmdcclxuICBjdXN0b21FbnZpcm9ubWVudDogc3RyaW5nXHJcbiAgZW52aXJvbm1lbnQ6IHN0cmluZ1xyXG4gIGVudmlyb25tZW50czogc3RyaW5nW11cclxuICBtYXhTZXNzaW9uRGF5czogbnVtYmVyXHJcbiAgc2Vzc2lvbk5hbWU6IHN0cmluZ1xyXG4gIHZlcnNpb246IHN0cmluZ1xyXG4gIHdpZGdldERpdkNsYXNzOiBzdHJpbmdcclxuICB3aWRnZXRJZDogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbnZpcm9ubWVudExvY2FsID0gJ2xvY2FsJ1xyXG4gICAgdGhpcy5lbnZpcm9ubWVudFN0YWdpbmcgPSAnc3RhZ2luZydcclxuICAgIHRoaXMuZW52aXJvbm1lbnRQcm9kdWN0aW9uID0gJ3Byb2R1Y3Rpb24nXHJcblxyXG4gICAgdGhpcy5hcGlVcmwgPSAnaHR0cHM6Ly9hcGkudG9uaWNwb3cuY29tJ1xyXG4gICAgdGhpcy5hcGlVcmxMb2NhbCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXHJcbiAgICB0aGlzLmFwaVVybFN0YWdpbmcgPSAnaHR0cHM6Ly9hcGkuc3RhZ2luZy50b25pY3Bvdy5jb20nXHJcbiAgICB0aGlzLmFwaVVybFByb2R1Y3Rpb24gPSAnaHR0cHM6Ly9hcGkudG9uaWNwb3cuY29tJ1xyXG4gICAgdGhpcy5ldmVudHNVcmwgPSAnaHR0cHM6Ly9ldmVudHMudG9uaWNwb3cuY29tJ1xyXG4gICAgdGhpcy5ldmVudHNVcmxMb2NhbCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDInXHJcbiAgICB0aGlzLmV2ZW50c1VybFN0YWdpbmcgPSAnaHR0cHM6Ly9ldmVudHMuc3RhZ2luZy50b25pY3Bvdy5jb20nXHJcbiAgICB0aGlzLmV2ZW50c1VybFByb2R1Y3Rpb24gPSAnaHR0cHM6Ly9ldmVudHMudG9uaWNwb3cuY29tJ1xyXG4gICAgdGhpcy5jdXN0b21FbnZpcm9ubWVudCA9ICdkYXRhLWVudmlyb25tZW50J1xyXG4gICAgdGhpcy5lbnZpcm9ubWVudCA9ICcnXHJcbiAgICB0aGlzLmVudmlyb25tZW50cyA9IFt0aGlzLmVudmlyb25tZW50TG9jYWwsIHRoaXMuZW52aXJvbm1lbnRTdGFnaW5nLCB0aGlzLmVudmlyb25tZW50UHJvZHVjdGlvbl1cclxuICAgIHRoaXMubWF4U2Vzc2lvbkRheXMgPSA2MFxyXG4gICAgdGhpcy5zZXNzaW9uTmFtZSA9ICd0bmNwd19zZXNzaW9uJ1xyXG4gICAgdGhpcy52ZXJzaW9uID0gJ3YwLjAuOCdcclxuICAgIHRoaXMud2lkZ2V0RGl2Q2xhc3MgPSAndG9uaWNwb3ctd2lkZ2V0J1xyXG4gICAgdGhpcy53aWRnZXRJZCA9ICdkYXRhLXdpZGdldC1pZCdcclxuICB9XHJcblxyXG4gIC8vIGlzRW52aXJvbm1lbnRWYWxpZCB3aWxsIGNoZWNrIGlmIHRoZSBnaXZlbiBlbnZpcm9ubWVudCBpcyB2YWxpZFxyXG4gIGlzRW52aXJvbm1lbnRWYWxpZCA9IChlbnZpcm9ubWVudDogc3RyaW5nKSA9PiB0aGlzLmVudmlyb25tZW50cy5pbmNsdWRlcyhlbnZpcm9ubWVudClcclxuXHJcbiAgLy8gc2V0RW52aXJvbm1lbnQgd2lsbCBzZXQgdGhlIGVudmlyb25tZW50XHJcbiAgc2V0RW52aXJvbm1lbnQgPSAoZW52aXJvbm1lbnQ6IHN0cmluZykgPT4ge1xyXG4gICAgLy8gTm8gZW52aXJvbm1lbnQgc2V0PyB1c2UgdGhlIGRlZmF1bHRcclxuICAgIGlmICghZW52aXJvbm1lbnQpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm90IGEgdmFsaWQgZW52aXJvbm1lbnQ/XHJcbiAgICBpZiAoIXRoaXMuaXNFbnZpcm9ubWVudFZhbGlkKGVudmlyb25tZW50KSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdGhlIGVudmlyb25tZW50XHJcbiAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnRcclxuXHJcbiAgICAvLyBTZXQgdGhlIEFQSSB1cmxcclxuICAgIGlmIChlbnZpcm9ubWVudCA9PT0gdGhpcy5lbnZpcm9ubWVudFN0YWdpbmcpIHtcclxuICAgICAgdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybFN0YWdpbmdcclxuICAgICAgdGhpcy5ldmVudHNVcmwgPSB0aGlzLmV2ZW50c1VybFN0YWdpbmdcclxuICAgIH0gZWxzZSBpZiAoZW52aXJvbm1lbnQgPT09IHRoaXMuZW52aXJvbm1lbnRMb2NhbCkge1xyXG4gICAgICB0aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsTG9jYWxcclxuICAgICAgdGhpcy5ldmVudHNVcmwgPSB0aGlzLmV2ZW50c1VybExvY2FsXHJcbiAgICB9IGVsc2UgaWYgKGVudmlyb25tZW50ID09PSB0aGlzLmVudmlyb25tZW50UHJvZHVjdGlvbikge1xyXG4gICAgICB0aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsUHJvZHVjdGlvblxyXG4gICAgICB0aGlzLmV2ZW50c1VybCA9IHRoaXMuZXZlbnRzVXJsUHJvZHVjdGlvblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzIHtcclxuICBzZXNzaW9uSWQ6IHN0cmluZ1xyXG4gIHN0YXJ0OiBudW1iZXJcclxuICBpbnRlcmFjdGlvblNlbnQ6IGJvb2xlYW5cclxuXHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbklkOiBzdHJpbmcpIHtcclxuICAgIC8vIFNldCB0aGUgY3VycmVudCBzZXNzaW9uXHJcbiAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25JZFxyXG5cclxuICAgIHRoaXMuaW50ZXJhY3Rpb25TZW50ID0gZmFsc2VcclxuXHJcbiAgICAvLyBSZW1lbWJlciB3aGVuIHdlIHN0YXJ0ZWRcclxuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgdGhpcy5kZXRlY3RJbnRlcmFjdGlvbigpXHJcbiAgICB0aGlzLmRldGVjdEJvdW5jZSgpXHJcbiAgICB0aGlzLmRldGVjdFdpZGdldENsaWNrKClcclxuICB9XHJcblxyXG4gIC8vIERldGVjdHMgY2xpY2sgb24gdGhlIHdpZGdldFxyXG4gIGRldGVjdFdpZGdldENsaWNrID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZTogRXZlbnQpID0+IHtcclxuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50XHJcbiAgICAgIHZhciB0YXJnZXQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KSBhcyBIVE1MRGl2RWxlbWVudFxyXG4gICAgICAvLyBHZXQgY29udGFpbmVyIGZyb20gdGhlIGNsaWNrZWQgZWxlbWVudFxyXG4gICAgICBsZXQgY29udGFpbmVyID0gdGFyZ2V0Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50XHJcbiAgICAgIC8vIFNlbmQgb25seSBpZiB3aWRnZXQgaW1hZ2Ugd2FzIGNsaWNrZWRcclxuICAgICAgaWYgKGNvbnRhaW5lcj8uY2xhc3NMaXN0Py5jb250YWlucygndG9uaWNwb3ctd2lkZ2V0JykpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gS2VlcG8gdGhpcyBhYm92ZSBzZW5kIHRvIHByZXZlbnQgc2VuZGluZyBtb3VzZWRvd24gQU5EIGNsaWNrIG9uIGluaXRpYWwgaW50ZXJhY3Rpb25cclxuICAgICAgICAgIHRoaXMuaW50ZXJhY3Rpb25TZW50ID0gdHJ1ZVxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5zZW5kRXZlbnQoJ2ludGVyYWN0aW9uJywgJ2NsaWNrJylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gcmVwb3J0IGludGVyYWN0aW9uOiBjbGljaycsIGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy8gRGV0ZWN0cyBhIGJvdW5jZSBldmVudFxyXG4gIGRldGVjdEJvdW5jZSA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9ICgpID0+IHtcclxuICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgb24gcGFnZVxyXG4gICAgICB0aGlzLnNlbmRFdmVudCgnYm91bmNlJywgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydCkudG9TdHJpbmcoKSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIERldGVjdHMgYSBwYWdlIGludGVyYWN0aW9uXHJcbiAgZGV0ZWN0SW50ZXJhY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pbnRlcmFjdGlvblNlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5zZW5kRXZlbnQoJ2ludGVyYWN0aW9uJywgJ21vdXNlZG93bicpXHJcbiAgICAgICAgICB0aGlzLmludGVyYWN0aW9uU2VudCA9IHRydWVcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gcmVwb3J0IGludGVyYWN0aW9uOiBtb3VzZWRvd24nLCBlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pbnRlcmFjdGlvblNlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5zZW5kRXZlbnQoJ2ludGVyYWN0aW9uJywgJ3Njcm9sbCcpXHJcbiAgICAgICAgICB0aGlzLmludGVyYWN0aW9uU2VudCA9IHRydWVcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gcmVwb3J0IGludGVyYWN0aW9uOiBzY3JvbGwnLCBlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmludGVyYWN0aW9uU2VudCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLnNlbmRFdmVudCgnaW50ZXJhY3Rpb24nLCAna2V5cHJlc3MnKVxyXG4gICAgICAgICAgdGhpcy5pbnRlcmFjdGlvblNlbnQgPSB0cnVlXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignZmFpbGVkIHRvIHJlcG9ydCBpbnRlcmFjdGlvbjoga2V5cHJlc3MnLCBlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIFNlbmQgZXZlbnQgd2lsbCBzZW5kIGFuIGV2ZW50IHRvIFRvbmljUG93XHJcbiAgc2VuZEV2ZW50ID0gYXN5bmMgKGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghdGhpcy5zZXNzaW9uSWQpIHtcclxuICAgICAgY29uc29sZS5pbmZvKCd5b3UgbXVzdCBjYWxsIGluaXQgd2l0aCBhIHNlc3Npb24gYmVmb3JlIHNlbmRpbmcgZXZlbnRzJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGNvbmZpZ1xyXG4gICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKVxyXG5cclxuICAgIC8vIHRvZG86IG9iZnVzY2F0ZSB0aGUgdXJsIHBhcmFtcyAoY2hhbmdlIHRvIHBheWxvYWQgb2YgSlNPTj8pXHJcbiAgICBhd2FpdCBmZXRjaChcclxuICAgICAgYCR7Y29uZmlnLmV2ZW50c1VybH0vdjEvZXZlbnRzP3Y9JHtjb25maWcudmVyc2lvbn0mbmFtZT0ke2V2ZW50TmFtZX0mdG5jcHdfc2Vzc2lvbj0ke3RoaXMuc2Vzc2lvbklkfSZkYXRhPSR7ZGF0YX1gLFxyXG4gICAgICB7IG1ldGhvZDogJ2dldCcgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJ1xyXG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vZXZlbnRzJ1xyXG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnXHJcblxyXG4vLyBoZWlnaHQ6IDI1MFxyXG4vLyBpbWFnZV91cmw6IFwiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vdG9uaWNwb3cvaW1hZ2UvdXBsb2FkL2NfY3JvcCx4XzAseV8wLHdfMzAwLGhfMjUwL3dfMzAwLGhfMjUwLGNfbGltaXQsZ19jZW50ZXIvdjE2MDY2MjIyNDgvb2N3a2ZzanNiMmh6Mm9zdHh5ZG4uanBnXCJcclxuLy8gbGlua191cmw6IFwiaHR0cHM6Ly9zdGFnaW5nLnRwb3cuYXBwL2MxZDBmOGM5XCJcclxuLy8gdGl0bGU6IFwiU29tZXRoaW5nIGNvb2xcIlxyXG4vLyB3aWR0aDogMzAwXHJcbmludGVyZmFjZSBXaWRnZXQge1xyXG4gIGhlaWdodDogbnVtYmVyXHJcbiAgaW1hZ2VfdXJsOiBzdHJpbmdcclxuICBsaW5rX3VybDogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIHdpZHRoOiBudW1iZXJcclxuICBpZDogbnVtYmVyXHJcbn1cclxuXHJcbi8vIE9wdGlvbnMgd2hlbiBjcmVhdGluZyBhIFRvbmljUG93IGluc3RhbmNlXHJcbmludGVyZmFjZSBUb25pY1Bvd09wdGlvbnMge1xyXG4gIEF1dG9Jbml0OiBib29sZWFuIC8vIE1hbnVhbGx5IGluaXRpYWxpemUgaW5zdGVhZCBvZiBhdXRvLWRldGVjdGluZyBkaXZzXHJcbiAgV2lkZ2V0UmVxdWVzdENhbGxiYWNrOiAod2lkZ2V0OiBXaWRnZXQpID0+IHZvaWRcclxufVxyXG5cclxuLy8gRGV0YXVsdCBvcHRpb25zXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBUb25pY1Bvd09wdGlvbnMgPSB7XHJcbiAgQXV0b0luaXQ6IHRydWUsXHJcbiAgV2lkZ2V0UmVxdWVzdENhbGxiYWNrOiAod2lkZ2V0OiBXaWRnZXQpID0+IHt9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb25pY1BvdyB7XHJcbiAgY29uZmlnOiBDb25maWdcclxuICBzdG9yYWdlOiBTdG9yYWdlXHJcbiAgZXZlbnRzOiBFdmVudHMgfCB1bmRlZmluZWRcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVG9uaWNQb3dPcHRpb25zID0gZGVmYXVsdE9wdGlvbnMpIHtcclxuICAgIC8vIEltYnVlIG9wdGlvbnNcclxuICAgIGZvciAobGV0IFtvcHRpb25LZXksIG9wdGlvblZhbF0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucykpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG9wdGlvbktleSwge1xyXG4gICAgICAgIHZhbHVlOiBvcHRpb25WYWwsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBuYW1lc3BhY2VzXHJcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKVxyXG4gICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG5cclxuICAgIC8vIFN0YXJ0IHRoZSBUb25pY1BvdyBzZXJ2aWNlIGFuZCBsb2FkIG1vZHVsZXNcclxuICAgIGlmIChvcHRpb25zLkF1dG9Jbml0KSB7XHJcbiAgICAgIC8vIExvYWQgdGhlIFRvbmljUG93IHdpZGdldFxyXG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XHJcbiAgICAgICAgLy8gVGhpcyBsb2FkcyBpZiB0aGUgPHNjcmlwdD4gaXMgZHluYW1pY2FsbHkgaW5qZWN0ZWQgaW50byB0aGUgcGFnZVxyXG4gICAgICAgIHRoaXMubG9hZCgpXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVGhpcyBsb2FkcyBpZiB0aGUgPHNjcmlwdD4gaXMgaGFyZGNvZGVkIGluIHRoZSBodG1sIHBhZ2UgaW4gdGhlIDxoZWFkPlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWQoKVxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcmVnaXN0ZXJFdmVudHMgLVJlZ2lzdGVycyBldmVudCBsaXN0ZW5lcnMuIFJ1bnMgb25seSBvbmNlXHJcbiAgcmVnaXN0ZXJFdmVudHMgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuZXZlbnRzKSB7XHJcbiAgICAgIC8vIFJlZ2lzdGVyIGV2ZW50cyBpZiB3ZSBoYXZlIGEgdmFsaWQgc2Vzc2lvblxyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHRoaXMuZ2V0VmlzaXRvclNlc3Npb24oKVxyXG4gICAgICBpZiAoc2Vzc2lvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZyBzZXNzaW9uJywgc2Vzc2lvbilcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudHMoc2Vzc2lvbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0T3JlbyBmb3IgY3JlYXRpbmcgbmV3IG9yZW9zXHJcbiAgc2V0T3JlbyA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRheXM6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiBkYXlzKVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX07cGF0aD0vO2V4cGlyZXM9JHtkYXRlLnRvVVRDU3RyaW5nKCl9YFxyXG4gIH1cclxuXHJcbiAgLy8gY2FwdHVyZVZpc2l0b3JTZXNzaW9uIHdpbGwgY2FwdHVyZSB0aGUgc2Vzc2lvbiBhbmQgc3RvcmUgaXRcclxuICAvLyBCdWlsZHMgYSBjb29raWUgc28gaXQncyBzZW50IG9uIHJlcXVlc3RzIGF1dG9tYXRpY2FsbHlcclxuICAvLyBTdG9yZXMgaW4gbG9jYWwgc3RvcmFnZSBmb3IgZWFzeSBhY2Nlc3MgZnJvbSB0aGUgYXBwbGljYXRpb25cclxuICBjYXB0dXJlVmlzaXRvclNlc3Npb24gPSAoY3VzdG9tU2Vzc2lvbklkOiBzdHJpbmcgPSAnJykgPT4ge1xyXG4gICAgbGV0IHNlc3Npb25JZCA9IGN1c3RvbVNlc3Npb25JZFxyXG5cclxuICAgIGlmICgoIWN1c3RvbVNlc3Npb25JZCB8fCAhY3VzdG9tU2Vzc2lvbklkLmxlbmd0aCkgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxyXG4gICAgICBzZXNzaW9uSWQgPSB1cmxQYXJhbXMuZ2V0KHRoaXMuY29uZmlnLnNlc3Npb25OYW1lKSB8fCAnJ1xyXG4gICAgfVxyXG4gICAgaWYgKHNlc3Npb25JZCAmJiBzZXNzaW9uSWQubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnNldE9yZW8odGhpcy5jb25maWcuc2Vzc2lvbk5hbWUsIHNlc3Npb25JZCwgdGhpcy5jb25maWcubWF4U2Vzc2lvbkRheXMpXHJcbiAgICAgIHRoaXMuc3RvcmFnZS5zZXRTdG9yYWdlKFxyXG4gICAgICAgIHRoaXMuY29uZmlnLnNlc3Npb25OYW1lLFxyXG4gICAgICAgIHNlc3Npb25JZCxcclxuICAgICAgICAyNCAqIDYwICogNjAgKiB0aGlzLmNvbmZpZy5tYXhTZXNzaW9uRGF5c1xyXG4gICAgICApXHJcbiAgICAgIHJldHVybiBzZXNzaW9uSWRcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICAvLyBnZXRWaXNpdG9yU2Vzc2lvbiB3aWxsIGdldCB0aGUgc2Vzc2lvbiBpZiBpdCBleGlzdHNcclxuICBnZXRWaXNpdG9yU2Vzc2lvbiA9ICgpID0+IHRoaXMuc3RvcmFnZS5nZXRTdG9yYWdlKHRoaXMuY29uZmlnLnNlc3Npb25OYW1lKVxyXG5cclxuICAvLyBsb2FkRGl2cyByZXBsYWNlcyBlYWNoIFRvbmljUG93IGRpdiB3aXRoIGEgY29ycmVzcG9uZGluZyBlbWJlZCB3aWRnZXRcclxuICBsb2FkRGl2cyA9IGFzeW5jICgpID0+IHtcclxuICAgIC8vIEdldCBhbGwgZGl2c1xyXG4gICAgY29uc3QgdG9uaWNEaXZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNvbmZpZy53aWRnZXREaXZDbGFzcylcclxuXHJcbiAgICAvLyBMb29wIGFsbCBkaXZzIHRoYXQgd2UgZm91bmRcclxuICAgIGZvciAobGV0IGkgPSB0b25pY0RpdnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgLy8gU2V0IHRoZSBkaXZcclxuICAgICAgY29uc3QgdG9uaWNEaXYgPSB0b25pY0RpdnNbaV1cclxuXHJcbiAgICAgIC8vIEdldCB0aGUgd2lkZ2V0IGlkXHJcbiAgICAgIGNvbnN0IHdpZGdldElkID0gdG9uaWNEaXYuZ2V0QXR0cmlidXRlKHRoaXMuY29uZmlnLndpZGdldElkKVxyXG4gICAgICBpZiAoIXdpZGdldElkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7d2lkZ2V0SWR9IG5vdCBmb3VuZGApXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2V0IHRoZSBjdXN0b20gZW52aXJvbm1lbnQgKHN3aXRjaGluZyBhd2F5IGZyb20gZGVmYXVsdDogcHJvZHVjdGlvbilcclxuICAgICAgY29uc3QgY3VzdG9tRW52aXJvbm1lbnQgPSB0b25pY0Rpdi5nZXRBdHRyaWJ1dGUodGhpcy5jb25maWcuY3VzdG9tRW52aXJvbm1lbnQpXHJcbiAgICAgIHRoaXMuY29uZmlnLnNldEVudmlyb25tZW50KGN1c3RvbUVudmlyb25tZW50IHx8ICdwcm9kdWN0aW9uJylcclxuXHJcbiAgICAgIC8vIEZpcmUgdGhlIHJlcXVlc3QgdG8gbG9hZCB0aGUgd2lkZ2V0IGRhdGFcclxuICAgICAgY29uc3QgcHJvbWlzZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgIGAke3RoaXMuY29uZmlnLmFwaVVybH0vdjEvd2lkZ2V0cy9kaXNwbGF5LyR7d2lkZ2V0SWR9P3Byb3ZpZGVyPWVtYmVkLSR7dGhpcy5jb25maWcudmVyc2lvbn1gXHJcbiAgICAgIClcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcm9taXNlLmpzb24oKVxyXG5cclxuICAgICAgLy8gRmlyZSBjYWxsYmFja1xyXG4gICAgICBkZWZhdWx0T3B0aW9ucy5XaWRnZXRSZXF1ZXN0Q2FsbGJhY2socmVzcG9uc2UgYXMgV2lkZ2V0KVxyXG5cclxuICAgICAgLy8gU2V0IFVSSSBlbmNvZGVkIHRpdGxlXHJcbiAgICAgIGNvbnN0IGNhbXBhaWduVGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQocmVzcG9uc2UudGl0bGUpXHJcblxyXG4gICAgICAvLyBTZXQgdGhlIEhUTUxcclxuICAgICAgdG9uaWNEaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgPGEgaHJlZj1cIiR7cmVzcG9uc2UubGlua191cmx9P3V0bV9zb3VyY2U9dG9uaWNwb3ctd2lkZ2V0cyZ1dG1fbWVkaXVtPXdpZGdldCZ1dG1fY2FtcGFpZ249JHt3aWRnZXRJZH0mdXRtX2NvbnRlbnQ9JHtjYW1wYWlnblRpdGxlfVwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIj5cclxuICAgICAgPGltZyBzcmM9XCIke3Jlc3BvbnNlLmltYWdlX3VybH1cIiBcclxuICAgICAgaWQ9XCIke3dpZGdldElkfVwiXHJcbiAgICAgIHdpZHRoPVwiJHtyZXNwb25zZS53aWR0aH1cIiBcclxuICAgICAgaGVpZ2h0PVwiJHtyZXNwb25zZS5oZWlnaHR9XCIgXHJcbiAgICAgIGFsdD1cIiR7cmVzcG9uc2UudGl0bGV9XCIgLz5cclxuICAgIDwvYT5gXHJcblxyXG4gICAgICAvLyBTZXQgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxyXG4gICAgICB0b25pY0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnLCByZXNwb25zZS53aWR0aClcclxuICAgICAgdG9uaWNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWhlaWdodCcsIHJlc3BvbnNlLmhlaWdodClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIExvYWQgdGhlIFRvbmljUG93IHNjcmlwdChzKSBhbmQgZGVmYXVsdCBzZXR0aW5nc1xyXG4gIGxvYWQgPSAoKSA9PiB7XHJcbiAgICAvLyBXZSBvbmx5IHdvcmsgaW4gYSBicm93c2VyXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignVG9uaWNQb3cgZW1iZWQgb25seSB3b3JrcyBpbiB0aGUgYnJvd3NlcicpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIExvYWQgYWxsIHRvbmljcyBmb3VuZCBvbiB0aGUgcGFnZSAoaWYgd2UgaGF2ZSBkaXYpXHJcbiAgICBjb25zdCB0b25pY0RpdnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuY29uZmlnLndpZGdldERpdkNsYXNzKVxyXG4gICAgaWYgKHRvbmljRGl2cyAmJiB0b25pY0RpdnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmxvYWREaXZzKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1RvbmljUG93IHdpZGdldChzKSBsb2FkZWQhJylcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcm9jZXNzIHZpc2l0b3IgdG9rZW5cclxuICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLmNhcHR1cmVWaXNpdG9yU2Vzc2lvbigpXHJcblxyXG4gICAgLy8gQ2FwdHVyZSBldmVudHMgaWYgd2UgaGF2ZSBhIHNlc3Npb25cclxuICAgIGlmIChzZXNzaW9uKSB7XHJcbiAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50cyhzZXNzaW9uKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETyAtIGhvdyB0ZiBkbyB3ZSB3ZSBhdXRvcnVuIHRoaXMgbm93P1xyXG5cclxuLy8gU2V0IG9uIHdpbmRvd1xyXG47KHdpbmRvdyBhcyBhbnkpLlRvbmljUG93ID0gVG9uaWNQb3cgfHwge31cclxuIiwiLyogZ2xvYmFsIGxvY2FsU3RvcmFnZSAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XHJcbiAgLypcclxuICByZW1vdmVTdG9yYWdlOiByZW1vdmVzIGEga2V5IGZyb20gbG9jYWxTdG9yYWdlIGFuZCBpdHMgc2libGluZyBleHBpcmFjeSBrZXlcclxuICBwYXJhbXM6XHJcbiAgICAgIGtleSA8c3RyaW5nPiA6IGxvY2FsU3RvcmFnZSBrZXkgdG8gcmVtb3ZlXHJcbiAgcmV0dXJuczpcclxuICAgICAgPGJvb2xlYW4+IDogdGVsbGluZyBpZiBvcGVyYXRpb24gc3VjY2VlZGVkXHJcbiAgKi9cclxuICByZW1vdmVTdG9yYWdlID0gKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSlcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7bmFtZX1fZXhwaXJlc0luYClcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYHJlbW92ZVN0b3JhZ2U6IEVycm9yIHJlbW92aW5nIGtleSBbJHtuYW1lfV0gZnJvbSBsb2NhbFN0b3JhZ2U6ICR7SlNPTi5zdHJpbmdpZnkoZSl9YFxyXG4gICAgICApXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgZ2V0U3RvcmFnZTogcmV0cmlldmVzIGEga2V5IGZyb20gbG9jYWxTdG9yYWdlIHByZXZpb3VzbHkgc2V0IHdpdGggc2V0U3RvcmFnZSgpLlxyXG4gIHBhcmFtczpcclxuICAgICAga2V5IDxzdHJpbmc+IDogbG9jYWxTdG9yYWdlIGtleVxyXG4gIHJldHVybnM6XHJcbiAgICAgIDxzdHJpbmc+IDogdmFsdWUgb2YgbG9jYWxTdG9yYWdlIGtleVxyXG4gICAgICBudWxsIDogaW4gY2FzZSBvZiBleHBpcmVkIGtleSBvciBmYWlsdXJlXHJcbiAgKi9cclxuICBnZXRTdG9yYWdlID0gKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyBlcG9jaCB0aW1lLCBsZXRzIGRlYWwgb25seSB3aXRoIGludGVnZXJcclxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcclxuXHJcbiAgICAvLyBTZXQgZXhwaXJhdGlvbiBmb3Igc3RvcmFnZVxyXG4gICAgbGV0IGV4cGlyZXNcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBleHBpcmVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7a2V5fV9leHBpcmVzYClcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coYGdldEl0ZW06IGVycm9yIGdldHRpbmcgbG9jYWxTdG9yYWdlOiAke0pTT04uc3RyaW5naWZ5KGUpfWApXHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV4cGlyZXMgPT09IHVuZGVmaW5lZCB8fCBleHBpcmVzID09PSBudWxsKSB7XHJcbiAgICAgIGV4cGlyZXMgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXhwaXJlZFxyXG4gICAgaWYgKGV4cGlyZXMgPCBub3cpIHtcclxuICAgICAgdGhpcy5yZW1vdmVTdG9yYWdlKGtleSlcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIGV4aXN0aW5nIGl0ZW1cclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBnZXRTdG9yYWdlOiBFcnJvciByZWFkaW5nIGtleSBbJHtrZXl9XSBmcm9tIGxvY2FsU3RvcmFnZTogJHtKU09OLnN0cmluZ2lmeShlKX1gKVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLypcclxuICBzZXRTdG9yYWdlOiB3cml0ZXMgYSBrZXkgaW50byBsb2NhbFN0b3JhZ2Ugc2V0dGluZyBhIGV4cGlyZSB0aW1lXHJcbiAgcGFyYW1zOlxyXG4gICAgICBrZXkgPHN0cmluZz4gICAgIDogbG9jYWxTdG9yYWdlIGtleVxyXG4gICAgICB2YWx1ZSA8c3RyaW5nPiAgIDogbG9jYWxTdG9yYWdlIHZhbHVlXHJcbiAgICAgIGV4cGlyZXMgPG51bWJlcj4gOiBudW1iZXIgb2Ygc2Vjb25kcyBmcm9tIG5vdyB0byBleHBpcmUgdGhlIGtleVxyXG4gIHJldHVybnM6XHJcbiAgICAgIDxib29sZWFuPiA6IHRlbGxpbmcgaWYgb3BlcmF0aW9uIHN1Y2NlZWRlZFxyXG4gICovXHJcbiAgc2V0U3RvcmFnZSA9IChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlczogbnVtYmVyIHwgbnVsbCA9IG51bGwpID0+IHtcclxuICAgIC8vIEV4cGlyZWQgdGltZVxyXG4gICAgaWYgKGV4cGlyZXMpIHtcclxuICAgICAgZXhwaXJlcyA9IE1hdGguYWJzKGV4cGlyZXMpIC8vIG1ha2Ugc3VyZSBpdCdzIHBvc2l0aXZlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBleHBpcmVzID0gMjQgKiA2MCAqIDYwIC8vIGRlZmF1bHQ6IHNlY29uZHMgZm9yIDEgZGF5XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWlsbGkgc2Vjb25kcyBzaW5jZSBlcG9jaCB0aW1lLCBsZXRzIGRlYWwgb25seSB3aXRoIGludGVnZXJcclxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcclxuICAgIGNvbnN0IHNjaGVkdWxlID0gbm93ICsgZXhwaXJlcyAqIDEwMDBcclxuICAgIHRyeSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke2tleX1fZXhwaXJlc2AsIHNjaGVkdWxlLnRvU3RyaW5nKCkpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBzZXRTdG9yYWdlOiBFcnJvciBzZXR0aW5nIGtleSBbJHtrZXl9XSBpbiBsb2NhbFN0b3JhZ2U6ICR7SlNPTi5zdHJpbmdpZnkoZSl9YClcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MDcpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==