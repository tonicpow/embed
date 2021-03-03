(()=>{"use strict";const e="local",t="staging",n="production",o={apiUrl:"https://api.tonicpow.com",apiUrlLocal:"http://localhost:3000",apiUrlStaging:"https://api.staging.tonicpow.com",apiUrlProduction:"https://api.tonicpow.com",eventsUrl:"https://webserver.tonicpow.com",eventsUrlLocal:"http://localhost:3002",eventsUrlStaging:"https://webserver.staging.tonicpow.com",eventsUrlProduction:"https://webserver.staging.tonicpow.com",customEnvironment:"data-environment",environment:n,environmentLocal:e,environmentStaging:t,environmentProduction:n,environments:[e,t,n],maxSessionDays:60,sessionName:"tncpw_session",version:"v0.0.6",widgetDivClass:"tonicpow-widget",widgetId:"data-widget-id",isEnvironmentValid:e=>o.environments.includes(e),setEnvironment:e=>{e&&o.isEnvironmentValid(e)&&(o.environment=e,e===o.environmentStaging?(o.apiUrl=o.apiUrlStaging,o.eventsUrl=o.eventsUrlStaging):e===o.environmentLocal?(o.apiUrl=o.apiUrlLocal,o.eventsUrl=o.eventsUrlLocal):e===o.environmentProduction&&(o.apiUrl=o.apiUrlProduction,o.eventsUrl=o.eventsUrlProduction))}},i=o,r={removeStorage:e=>{try{localStorage.removeItem(e),localStorage.removeItem(`${e}_expiresIn`)}catch(t){return console.log(`removeStorage: Error removing key [${e}] from localStorage: ${JSON.stringify(t)}`),!1}return!0},getStorage:e=>{const t=Date.now();let n;try{n=localStorage.getItem(`${e}_expires`)}catch(e){return console.log(`getItem: error getting localStorage: ${JSON.stringify(e)}`),null}if(null==n&&(n=0),n<t)return r.removeStorage(e),null;try{return localStorage.getItem(e)}catch(t){return console.log(`getStorage: Error reading key [${e}] from localStorage: ${JSON.stringify(t)}`),null}},setStorage:(e,t,n=null)=>{n=n?Math.abs(n):86400;const o=Date.now()+1e3*n;try{localStorage.setItem(e,t),localStorage.setItem(`${e}_expires`,o.toString())}catch(t){return console.log(`setStorage: Error setting key [${e}] in localStorage: ${JSON.stringify(t)}`),!1}return!0}},s=r,a={};let c=null;const l=(new Date).getTime();a.init=e=>{c=e,a.detectInteraction(),a.detectBounce()},a.sendEvent=async(e,t)=>{c?await fetch(`${i.eventsUrl}/v1/widgets/event?eventName=${e}&session=${c}&data=${t}`,{method:"get"}):console.error("You must call init with a session before sending events")},a.detectBounce=()=>{window.onbeforeunload=()=>{a.sendEvent("bounce",(new Date).getTime()-l)}},a.detectInteraction=()=>{let e=!1;document.addEventListener("mousedown",(async()=>{if(!e)try{e=!0,await a.sendEvent("interaction","mousedown")}catch(e){console.error("Failed to report interaction",e)}})),document.addEventListener("scroll",(async()=>{if(!e)try{e=!0,await a.sendEvent("interaction","scroll")}catch(e){console.error("Failed to report interaction",e)}})),document.addEventListener("keypress",(async()=>{if(!e)try{e=!0,await a.sendEvent("interaction","keypress")}catch(e){console.error("Failed to report interaction",e)}})),document.addEventListener("click",(async()=>{if(!e)try{e=!0,await a.sendEvent("interaction","click")}catch(e){console.error("Failed to report interaction",e)}}))};const d=a,g={Config:i,Storage:s,setOreo:(e,t,n)=>{const o=new Date;o.setTime(o.getTime()+864e5*n),document.cookie=`${e}=${t};path=/;expires=${o.toUTCString()}`},captureVisitorSession:(e="")=>{let t=e;e&&e.length||"undefined"==typeof window||(t=new URLSearchParams(window.location.search).get(i.sessionName)),t&&t.length>0&&(g.setOreo(i.sessionName,t,i.maxSessionDays),g.Storage.setStorage(i.sessionName,t,86400*i.maxSessionDays))},getVisitorSession:()=>g.Storage.getStorage(i.sessionName),loadDivs:async()=>{const e=document.getElementsByClassName(i.widgetDivClass);for(let t=e.length-1;t>=0;t--){const n=e[t],o=n.getAttribute(i.widgetId);if(!o){console.log(`${o} not found`);continue}const r=n.getAttribute(i.customEnvironment);i.setEnvironment(r);const s=await fetch(`${i.apiUrl}/v1/widgets/display/${o}?provider=embed-${i.version}`),a=await s.json(),c=encodeURIComponent(a.title);n.innerHTML=`\n    <a href="${a.link_url}?utm_source=tonicpow-widgets&utm_medium=widget&utm_campaign=${o}&utm_content=${c}">\n      <img src="${a.image_url}" \n      width="${a.width}" \n      height="${a.height}" \n      alt="${a.title}" />\n    </a>`,n.setAttribute("data-width",a.width),n.setAttribute("data-height",a.height)}},load:()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");const e=document.getElementsByClassName(i.widgetDivClass);e&&e.length>0&&g.loadDivs().then((()=>{console.log("TonicPow widget(s) loaded!")})),g.captureVisitorSession();const t=g.getVisitorSession();t&&d.init(t)}};"complete"===document.readyState||"interactive"===document.readyState?g.load():document.addEventListener("DOMContentLoaded",(()=>{g.load()})),"undefined"!=typeof window&&(window.TonicPow=g)})();