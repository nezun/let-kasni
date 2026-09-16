import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Local diagnostic ONLY. Never serve from the application or deploy this fixture.
// CSP prevents all collector/image/frame connections; transport hooks capture
// real SDK-generated collector payloads, not synthesized gtag commands.
const moduleNames = ["analytics-privacy", "analytics", "google-tracking-keys", "google-tracking"];
const sources = Object.fromEntries(moduleNames.map((name) => [
  `@/lib/${name}`,
  ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText,
]));
const html = `<!doctype html><html><head>
<meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' https://www.googletagmanager.com 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; img-src 'none'; frame-src 'none'; style-src 'unsafe-inline'">
<title>TEST_PRIVATE_MARKER_20260916</title></head><body>
<h1>Isolated GA4 SDK diagnostic</h1><p>No claim/database/email/Meta/Ads transport.</p>
<a id="qa-download" target="_blank" rel="noopener noreferrer" href="https://example.invalid/private/TEST_PRIVATE_MARKER_20260916.pdf?token=TEST_PRIVATE_MARKER_20260916">Test download</a>
<a id="qa-outbound" target="_blank" rel="noopener noreferrer" href="https://example.invalid/private/TEST_PRIVATE_MARKER_20260916?token=TEST_PRIVATE_MARKER_20260916">Test outbound</a>
<form id="qa-form" name="qa-test-form" target="_blank" action="/qa-form-endpoint" method="post"><label>Test field<input id="qa-name" name="test_name" type="text"></label><button id="qa-submit" type="submit">Local test submit</button></form>
<script>
window.__qa={captures:[],commands:[],consent:__QA_CONSENT__};
const capture=(url,body)=>{window.__qa.captures.push({url:String(url),body:typeof body==='string'?body:''});};
navigator.sendBeacon=(url,body)=>{capture(url,body);return true;};
window.fetch=async(url,options)=>{capture(url,options?.body);return new Response(null,{status:204});};
const imageSrc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
Object.defineProperty(HTMLImageElement.prototype,'src',{...imageSrc,set(value){capture(value,'');}});
XMLHttpRequest.prototype.open=function(method,url){this.__qaUrl=url;};
XMLHttpRequest.prototype.send=function(body){capture(this.__qaUrl,body);};
window.dataLayer=[];window.gtag=function(){window.__qa.commands.push(Array.from(arguments));window.dataLayer.push(arguments);};
const allowed=value=>value?'granted':'denied';
gtag('consent','default',{analytics_storage:allowed(__qa.consent.analytics),ad_storage:allowed(__qa.consent.marketing),ad_user_data:allowed(__qa.consent.marketing),ad_personalization:allowed(__qa.consent.marketing)});
const sources=${JSON.stringify(sources).replaceAll("<", "\\u003c")};const modules={};
function require(name){
 if(name==='@/lib/consent')return{hasAnalyticsConsent:()=>__qa.consent.analytics,hasMarketingConsent:()=>__qa.consent.marketing};
 if(name==='@/lib/env')return{getGoogleAnalyticsId:()=> 'G-RVJ906DKVF'};
 if(modules[name])return modules[name].exports;
 if(!sources[name])throw new Error('Unexpected module '+name);
 const loaded={exports:{}};modules[name]=loaded;new Function('module','exports','require',sources[name])(loaded,loaded.exports,require);return loaded.exports;
}
const analytics=require('@/lib/analytics');const tracking=require('@/lib/google-tracking');const paths=['/','/en','/proveri-let'];
analytics.syncAnalytics(paths);
__qa.navigate=()=>{history.pushState({},'', '/en?email=TEST_PRIVATE_MARKER_20260916%40example.com&q=TEST_PRIVATE_MARKER_20260916&utm_campaign=TEST_PRIVATE_MARKER_20260916');analytics.syncAnalytics(paths);};
__qa.lead=()=>{const input={claimId:'00000000-0000-4000-8000-000000000006',source:'inline_form',locale:'en'};tracking.trackLeadSubmitOnce(input);tracking.trackLeadSubmitOnce(input);analytics.trackEvent('generate_lead',{event_category:'claim',event_label:'inline_form',form_locale:'en'});};
__qa.private=()=>{history.pushState({},'', '/admin/claims/TEST_PRIVATE_MARKER_20260916?token=TEST_PRIVATE_MARKER_20260916');analytics.syncAnalytics(paths);};
__qa.move=path=>{const url=new URL(path,location.origin);if(url.origin!==location.origin)throw new Error('Local scenario only');history.pushState({},'',url);analytics.syncAnalytics(paths);};
__qa.setConsent=consent=>{__qa.consent=consent;tracking.updateGoogleConsent(consent);analytics.syncAnalytics(paths);};
__qa.summary=()=>__qa.captures.map(hit=>{const url=new URL(hit.url,location.href);const body=new URLSearchParams(hit.body);const query=url.searchParams;return {host:url.hostname,path:url.pathname,event:query.get('en')||body.get('en'),dl:query.get('dl')||body.get('dl'),dr:query.get('dr')||body.get('dr'),dt:query.get('dt')||body.get('dt'),privateMarker:(hit.url+' '+hit.body).includes('TEST_PRIVATE_MARKER_20260916'),bodyEvents:body.get('en'),payloadFields:[...new Set([...query.keys(),...body.keys()])].filter(key=>!['cid','sid','sct'].includes(key))};});
</script>
<script async onload="__qa.sdkLoaded=true" src="https://www.googletagmanager.com/gtag/js?id=G-RVJ906DKVF"></script>
</body></html>`;
const server = createServer((request, response) => {
  const mode = new URL(request.url, "http://127.0.0.1:3016").searchParams.get("qa_consent") ?? "analytics";
  const consent = { analytics: ["analytics", "both"].includes(mode), marketing: ["marketing", "both"].includes(mode) };
  response.writeHead(200, { "content-type": "text/html; charset=utf-8", "referrer-policy": "no-referrer", "cache-control": "no-store" });
  response.end(html.replace("__QA_CONSENT__", JSON.stringify(consent)));
});
server.listen(3016, "127.0.0.1", () => console.log("Isolated SDK fixture http://127.0.0.1:3016 (all collector transport blocked)"));
