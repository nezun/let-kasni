# Isolated Meta Preview QA, 2026-09-17

**RELEASE BLOCKED / NO PRODUCTION / NO GTM PUBLISH / NO PAID TRAFFIC**

## Current continuation: consent fix implemented, real Preview QA pending

### Actual SDK readiness correction (not yet a platform PASS)

Preview 19c1f48 / dpl_BX4SSthtYhJaVGiCxepvUJefCJzD remained isolated and
denied-by-default. Grant loaded the SDK but no Meta PageView: init/grant/track
were queued behind the initial revoke. Inspection of the current public Meta
SDK confirms its queue stops draining when revoked; a grant queued behind that
lock cannot unlock it. No claim was submitted.

The loader now emits a readiness event from the external SDK script onload.
Only the live SDK receives grant, after current consent/path checks, followed
by one initial PageView. Pending revoke commands are not duplicated; pending
navigation does not queue stale PageViews. Native SDK pushState PageViews are
disabled because the application already controls route tracking/private paths.
Eleven runtime regressions PASS for these loading/withdrawal/regrant cases.
Fresh full `npm run verify` PASS (Google39, lint, TypeScript, build195). The first
sandbox build could not fetch existing Google Fonts; the network-enabled full
rerun passed without changing dependencies or fonts. Actual
Preview consent gates and the single permitted lead still require verification.

### Preview caught Next inline Script ordering; correction verified locally

The first patched Preview eb4c35d / dpl_2eUzDQpYimLrzDPxKTZDAnrVouDu was
isolated: both email booleans FALSE, Supabase/local admin fallback/provider/
subscriptions OFF, QA CAPI configured. Initial denied state: fbq undefined,
optional resource count0, attribution absent. All four Google consent signals
updated granted with the existing loaders; Meta SDK loaded but stayed revoked,
no PageView resource. No claim attempted.

Installed Next16.2.4 `dist/client/script.js` calls inline afterLoad/onReady BEFORE
`document.body.appendChild(el)`. The ready callback thus ran before fbq existed.
Added a regression recreating that order: FAILED on the first fix (0 PageView).
The callback now queues a microtask, then checks current consent/public path/
fbq again before grant and initial PageView. Nine Meta runtime regressions PASS;
consent regrant also cannot replay an application Lead. Real Preview repeat and
single successful claim remain pending. Original pre-fix evidence below is history.

Owner authorized the minimal implementation on the existing PR31 branch.
`consent.ts` revokes the loaded Meta SDK synchronously before withdrawal/reset
cookie cleanup, and expires only optional root cookies with host-only/current
host/applicable parent domain attributes. `MetaPixel` also revokes on private
routes; its bootstrap starts revoked and disables automatic SDK configuration.
The guarded Next Script onReady grants and emits the initial PageView once only
with current consent/public path. Explicit Lead/CAPI architecture is unchanged.

Seven new application-runtime regressions PASS. The first four tests failed on
the unchanged candidate, confirming missing revoke and domain cleanup. Full
`npm run verify` PASS, including existing Google 39/39, lint, TypeScript and
build195. Frozen GTM export checker PASS with unchanged SHA. These are local
checks, NOT real Meta platform acceptance/dedup or a new browser PASS.

Preview update and original consent repro verification are in progress. The
single permitted new successful synthetic claim remains UNUSED. No production,
main, production credentials, GTM publication or advertising action.

## Candidate and scope

PR #31, branch `codex/google-ads-measurement`, candidate
`e99798fa60deda4414262be2391760aeaee77353`.
Session resume verified a clean canonical-remote feature checkout and current
`origin/main=e7dc38c0b022f42cad7d1ba98d74e88ecbb5ddaf`.
Unrelated canonical logo/footer edits remain preserved.

The owner authorized one isolated dataset, minimal QA CAPI access, branch-only
Preview environment configuration, Preview redeploy and at most one new
successful synthetic claim. The owner separately confirmed acceptance of Meta
Business Tools Terms immediately before dataset creation.

## Executed platform setup

- Correct existing portfolio: Letkasni.rs, `2535168546914445`.
- Protected production dataset: `2347588039400204`, website letkasni.rs.
- Created exactly one dataset: **LetKasni QA — Preview only**, `2358413618029924`.
- Did not select the production ad-account checkbox during creation.
- Reopened Events Manager and verified two resources, the new QA ID, owner ID
  and creation date Sep 17, 2026. QA overview reported no activity.
- QA settings offer sharing with an ad account; no account was connected.
- Automatic advanced matching and automatic events were OFF. No change to
  production Pixel settings or permissions was made.
- Selected direct integration **without Dataset Quality API** in the QA UI.
  The default Quality API option explicitly warns that generating its token
  gives permissions to previously generated tokens; it was not used.

## Verified QA-only asset access

The owner confirmed the QA Employee/access creation and then separately approved
the displayed business-wide Non-discrimination policy certification. Accepted
that policy, verified Meta's confirmation, and created the separate **Employee**
system user **LetKasni QA — Preview only**, `61594371304399`. No Admin role was
granted. Those approvals are settled and must not be requested again.

Assigned only the QA dataset with **Use events dataset** partial access; left
Manage events dataset OFF and the production checkbox unselected. After reload,
the user's Assigned assets panel shows exactly these two linked QA assets:

1. QA Pixel `2358413618029924`: Partial access **View Pixels**.
2. QA events-dataset asset `1748562979704779`: Partial access **Use events dataset**.

Both are named **LetKasni QA — Preview only**. The latter is the Business Settings
asset-link ID, not the Events Manager Pixel destination; do not substitute it for
`NEXT_PUBLIC_META_PIXEL_ID`. Meta created the linked Pixel access automatically
from the selected QA dataset. No production asset was assigned.

### Remaining application/token blocker

#### Current conclusion: NEED_CODE_FIX — real Meta consent-withdrawal failure

Owner confirmed reconnect; recovered the exact QA Preview through Chrome Window
menu and verified the URL before runtime actions. Read-only native console now
confirmed all four Google consent signals: default denied, then granted after
Accept all. Allowlisted attribution contains the obvious TEST_GCLID_META_QA_20260917
and TEST_META_QA_PREVIEW campaign. No private storage or token values inspected.

Reproduction on serving e99798f / dpl_GimL6AdSbFj4xFSZNvWpjBfAxjcX:

1. Existing Privacy settings -> Reject optional -> reload: analytics/marketing
   false and no optional tracking resources (earlier positive denied baseline).
2. Existing Privacy settings -> Accept all: analytics/marketing true, actual QA
   Pixel PageView 2358413618029924, existing direct GA4/GTM loaders.
3. Existing Privacy settings -> Reject optional WITHOUT reload: consent timestamp
   1789643367824; analytics/marketing false; all four most recent Google consent
   values denied; localStorage attribution removed.
4. Exact Meta-cookie-name check still finds _fbp. Cookie Store metadata only:
   name _fbp, domain let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app,
   path /. Cookie value never read/reported.
5. Resource entries with timeOrigin + startTime strictly after that withdrawal
   timestamp show ONE subsequent tracking request: host www.facebook.com,
   path /tr/, Pixel ID 2358413618029924, event **SubscribedButtonClick**.
   Classified only allowlisted destination/event/consent parameters; no raw
   tracking URL, cookie value or customer payload exposed. This is an actual
   post-withdrawal Meta resource request, not Google Consent Mode ping. Exact
   initiation within the synchronous withdrawal click/SDK callback race was not
   instrumented, and Meta platform processing is not proven by this resource.
6. Reloaded with the denied cookie. Final actual runtime: analytics=false,
   marketing=false, attributionCleared=true, optionalResources=0. QA Preview is
   left in this safe state; no optional SDK loaded after reload.

**Release blocker:** same-page withdrawal does not reliably stop the already
loaded Meta SDK and does not remove its _fbp cookie. Do not substitute the safe
post-reload result for a PASS on same-page withdrawal. No controlled claim was
submitted: required pre-claim consent gate failed, so one-claim allowance UNUSED.

Code inspection (unchanged HEAD) identifies the likely mechanism:
src/components/meta-pixel.tsx lines 20-26 only updates React hasConsent; lines
49-50 return null, but no explicit SDK consent revoke/grant command is sent to
the already-loaded window.fbq. Wrapper gating does not control SDK automatic
events. src/lib/consent.ts line 122 expireCookie omits Domain; metadata observed
above is consistent with a cookie-scope cleanup gap, but exact cookie-attribute
mechanism was not independently instrumented. Both need real-browser regression.

Smallest proposed fix, NOT IMPLEMENTED in this report-only platform QA:

- Synchronize existing SDK consent with marketing consent and private-path
  blocking, including immediate revoke and deliberate grant before permitted
  sends. Cover SDK initialization races; no new banner/parallel integration.
- Expire optional cookies for their actual domain/path scope, not only default
  host-only root cookies; verify _fbp disappears immediately without reload.
- Add regression covering an already-initialized SDK/automatic event after
  withdrawal and actual scoped cookies. Existing 39 mocks passing did not catch
  these real SDK behaviors. Repeat denied/granted/revoked/admin gates before
  spending the still-unused one-claim live allowance.

No application source, production Meta settings/env, GTM, main or deployment was
changed to work around this failure. This finding requires the scoped code-fix
pass and another Preview redeploy, not additional credentials or account setup.

#### Earlier continuation: serving isolation and denied/granted browser gates verified

Preview deployment GimL6AdSbFj4xFSZNvWpjBfAxjcX reached **Ready**, build 1m30s.
Authenticated branch-alias /api/health returned candidate e99798fa60deda4414262be2391760aeaee77353
and dpl_GimL6AdSbFj4xFSZNvWpjBfAxjcX, timestamp 2026-09-17T10:52:38.127Z.
Verified Supabase/local admin fallback false, provider off, subscriptions false,
analytics ga4, metaCapiConfigured true. Both Preview QA email booleans false;
native AX truncates long JSON, so Pretty print plus screenshot verified the final
adminClaimEmailRecipientConfigured false. No secret/customer data in this health UI.

Opened browser test through QA Events Manager Test Events Website for:
https://let-kasni-git-codex-goog-2c8116-audiblelover2018-1361s-projects.vercel.app/?gclid=TEST_GCLID_META_QA_20260917&utm_source=google&utm_medium=cpc&utm_campaign=TEST_META_QA_PREVIEW&utm_term=test-google-ads

Used existing Privacy settings -> Reject optional -> reload. Read-only native
DevTools console inspected only the exact consent localStorage key and tracking
resource allowlist. Current v3/PP1.3 analytics=false/marketing=false; **Meta 0,
GTM 0, GA4 collection 0**. Then existing Privacy settings -> Accept all. Current
analytics=true/marketing=true; actual resource shows **PageView to Pixel
2358413618029924 only**; loader destinations GTM-WT3B2L8P and direct GA4
G-RVJ906DKVF. No production Pixel destination observed in this allowlisted result.
This confirms browser resource delivery, not Meta Test Events processing or Lead.

Further consent-signal/attribution console checks were interrupted by concurrent
owner Chrome window changes and were not verified. Recovered the known QA window
twice through native Window menu, checked exact Preview domain before actions;
repeated interruption prevented reliable continuation. Attempted direct targeted
Chrome tab inventory with output suppressed; it timed out/reset CUA. Do not auto
reconnect into an unrelated private foreground window. Owner must foreground QA
Preview and leave it unchanged during the remaining test, then permit reconnect.

No form was submitted or attempted successfully. The one-claim allowance remains
unused. Still pending: actual four consent signals, revoke/admin browser blocking,
attribution/navigation, failed validation, one successful Lead, real CAPI/Test
Events/dedup evidence, refresh/Back and same-claim Google regression.

#### Earlier continuation: replacement securely installed; QA Preview building

Owner gave action-time issuance approval and completed Meta's fresh confirmation
code directly in Chrome. No code was read or requested in chat. Meta displayed
Token created for the prepared ads_read-only / 60-day QA request. Replacement
token UI was inspected only via fixed control labels. Used Copy -> closed token
modal -> existing Vercel masked input -> native super+v. No clipboard/value read,
raw token state, token screenshot, file/log token or production-token access.

Vercel's initial three-row Save partially created the two valid Secret rows but
rejected NEXT_PUBLIC_META_PIXEL_ID as Secret. Retrying the valid two rows returned
already-exists for the exact branch. Closed the duplicate unsaved draft, refreshed
and verified the persisted Secret rows. Added Pixel separately as Config, removed
default Production selection, selected only codex/google-ads-measurement, checked
the exact non-secret value, saved and refreshed. Final visible persisted rows:

- NEXT_PUBLIC_META_PIXEL_ID: Config, Preview / codex/google-ads-measurement,
  2358413618029924.
- META_CONVERSIONS_API_ACCESS_TOKEN: Secret, same Preview branch, new QA token.
- META_TEST_EVENT_CODE: Secret, same Preview branch, TEST65347.

No Production/global Preview/Development scope was selected at any Save. Original
production rows remain separate. The new token's requested scopes/expiry and QA
asset assignments are UI evidence, not Graph token-debug proof of effective scope.

Redeploy modal verified Preview, current codex/google-ads-measurement candidate
e99798fa60deda4414262be2391760aeaee77353, Use existing Build Cache OFF. Clicked
Redeploy. New deployment **GimL6AdSbFj4xFSZNvWpjBfAxjcX** is **Building** in
Preview; do not transfer previous health results to it. No production promotion.
No new successful claim yet; next gate is serving-health/consent/browser isolation.
Fresh local measurement check 39/39 PASS; frozen GTM export contract PASS, same
SHA256 f776ac715d9a71ec070aaf6a4dc3912faed052ca5a9bda6ef201b1ad38504e1d.
These remain local evidence, not real Meta delivery/dedup proof.

#### Earlier continuation: safe connection restored; replacement ready for final issuance

Owner confirmed the intended Meta foreground window. Chrome reconnected, but the
window still displayed another **Token created** modal and automatic initial UI
emission exposed that QA token too. It was not copied, installed or used. Closed
the modal and completed Revoke tokens for verified QA Employee 61594371304399,
including the confirmation naming LetKasni QA — Preview only. The dialog closed;
Generate token was enabled. As before, no persistent revocation toast or Graph
debug proof was captured. Production user/token were untouched.

The next replacement wizard is now at its final enabled **Generate token** button:
QA app selected, 60 days selected, only ads_read selected. Issuance is pending
action-time confirmation for creating persistent API access. No further account
verification is currently displayed. Keep the existing CUA app binding; do not
reconnect or emit raw UI while a token modal is open.

QA Events Manager Test Events / Website shows **TEST65347** for destination
2358413618029924. Prepared the existing UNSAVED branch-only Vercel form with
three rows: META_CONVERSIONS_API_ACCESS_TOKEN (empty), NEXT_PUBLIC_META_PIXEL_ID
(2358413618029924), META_TEST_EVENT_CODE (TEST65347). The two non-secret values
were explicitly revealed individually, verified exactly, then masked again;
the token field was never revealed. All rows currently use Secret type, including
the non-secret IDs; NEXT_PUBLIC exposure is intentional for the browser Pixel.
Scope remains exactly codex/google-ads-measurement. No Save/redeploy/new claim.

Remaining immediate step: owner confirms final replacement-token issuance;
agent clicks Generate, observes only fixed success/Copy/Done controls, transfers
via native Copy/Paste directly into the masked Vercel token field, verifies scope
again and saves Preview only. Owner should not generate or copy the token manually.
The earlier reconnect block below is resolved, not a current blocker.

#### Earlier continuation: account verified; first QA token revoked; replacement pending

Owner completed account verification. Reconnecting Chrome automatically emitted
the first QA token in a tool result while Meta displayed **Token created**. Treat
that token as exposed: it was not copied, installed, saved to files or used for
API requests. Clicked Done, then **Revoke tokens** for the verified QA Employee
`61594371304399`, then confirmed the dialog explicitly naming **LetKasni QA —
Preview only**. The dialog closed and Generate token was available again. No
persistent success toast or Graph token-debug evidence was captured; the UI
revocation action completed. Production credentials/user were not touched.

Started a replacement request for the same QA app; selected-app dropdown was
opened. Replacement issuance is **NOT CONFIRMED**. All subsequent token UI
inspection was limited to fixed control labels, never raw token values.
Concurrent Chrome navigation moved the active window to unrelated content. An
inventory request timed out and reset the computer-use session. Automatic review
then rejected reconnecting Chrome because initial UI emission could reveal
unrelated private content or credentials. That rejection was not bypassed.

Current access prerequisite: owner brings the intended Meta Business Settings
window to the foreground, closes any token-value modal, and authorizes a safe
Chrome reconnect. Do not repeat completed developer/password/account verification.
Then finish a fresh minimal replacement request and directly paste via native
Copy/Paste into the verified branch-only masked Vercel input. Never reuse the
first token. No Preview environment Save, redeploy or new claim has occurred.
The historical account-verification observations below are superseded.

#### Earlier continuation: app created; token request needed account verification

Owner completed password reauthentication. Fresh developer dashboard confirms
**LetKasni QA CAPI Preview**, application ID `4666725866879719`, URL includes
the correct portfolio `2535168546914445`. Business Settings separately confirms
Owned by Letkasni.rs. The app remains **Unpublished**; no app release was performed.

An app without a use case offered No permissions available, both with Test app
and with the temporary Develop app role. Added **Measure ad performance data with
Marketing API** only to this isolated application. Its official permission panel
explicitly states that **ads_read** also grants access to the Server-Side API for
web events. Restored the QA user's application role to **Test app only**;
Develop app, View insights and Manage app are OFF in the final saved assignment.
After the use case was added, the token permission selector became available
with this minimal Test app role. No production app/user was modified.

Fresh reload before generation verified **3 assigned business assets**: the new
QA application, QA Pixel and linked QA dataset. No ad account/Page/production
dataset is assigned. Token request selected **only ads_read**, not ads_management,
business_management or page permissions; expiry **60 days**, not Never.
Clicked Generate token. Meta returned **Account verification required**:
"To help keep this account secure, we need you to verify your account for this request."
The Verify account control is offered. **Token issuance is NOT CONFIRMED** and
no Copy/Done success control or token was obtained. Do not claim API acceptance,
token expiry start date, or actual generated-token scope from this pending request.
Owner must complete this specific account verification in Meta Business Suite.
Developer registration and password reauthentication are already settled.

Prepared an UNSAVED Vercel Secret input for META_CONVERSIONS_API_ACCESS_TOKEN,
note naming the QA app/user/ads_read/60-day boundary, scope verified to exactly
codex/google-ads-measurement. Removed the default Production selection; global
Preview and Development remain unselected. **No env Save action was performed**,
no token pasted, and no redeploy/claim occurred.

One accessibility inspection was rejected by automatic review because a broad
token-related text filter might expose credentials. It was not executed. Safer
inspection emitted only fixed control names/non-secret verification status;
no token, password or verification code was output or copied.
Concurrent owner Chrome navigation interrupted several target actions; do not
interpret those rejected clicks as successful Verify account actions.

#### Continuation after owner developer registration

Owner reported completion; fresh Chrome UI now shows **All apps - Meta for
Developers**, No apps yet, and an enabled Create App button. The earlier
developer-account registration blocker is resolved.

Prepared a new dedicated application **LetKasni QA CAPI Preview**: selected
**Create an app without a use case** (no added permissions/features/products),
existing portfolio **Letkasni.rs**, and verified Overview says No use cases
selected and No requirements. Clicked Create app. Meta then opened **Please
re-enter your password** for Nemanja Zunic, explicitly requiring the account
password before continuing. Creation is **NOT CONFIRMED**, and no app ID or token
exists as evidence yet. Requested only direct owner reauthentication in that
Chrome modal; never request a password in chat, read credentials or bypass the
security prompt. The following registration observations are historical.

Fresh reload: **Generate token disabled** for the QA user. Installed apps:
**No apps installed yet**. Business Settings / Apps in the same portfolio:
**No apps added**; Add offers **Create a new app ID disabled**, Connect an app ID,
and Request access to an app ID. No existing owned QA app was found.

Opening the official developer apps URL redirected to the developer homepage.
Get Started opened **Create a Meta for Developers account**, with Register,
Verify account, Contact info and About you steps. Continue explicitly accepts
**Meta Platform Terms** and **Developer Policies** for the personal developer
account. This new account-wide registration/terms action was not performed;
cancelled the dialog without accepting terms, entering contacts or initiating
verification. No login/2FA bypass was attempted. Do not claim that a code/OTP was
requested; only the upcoming Verify account step was visible.

At that earlier checkpoint, one owner action was needed: complete the displayed
**Account verification required / Verify account** security check in Meta Business Suite.
Developer registration, app creation and password reauthentication are already
verified complete; do not ask for them again. Then verify token issuance and
assign the minimum app permission to this QA Employee, and verify actual token
scope before adding it to Preview. Do not connect the production CAPI app blindly
or expand existing production-user access to get past this blocker.

### Protected existing CAPI user

Business Settings / System users also contains the existing Employee user,
Conversions API System User `61593330505838`, with three assigned business assets:

1. Conversions API Application `2441967242879228`: Develop app, View insights,
   Test app.
2. Production Pixel `2347588039400204`: View Pixels.
3. LetKasni.rs events dataset `802785256229271`: Use events dataset.

No token was generated, revealed, copied, rotated or installed. A token produced
on a QA dataset page is not assumed to be resource-scoped. The existing user is
not QA-only and its production permissions were not changed.

Official current prerequisites were read in Chrome:
[Meta CAPI get started](https://developers.facebook.com/documentation/ads-commerce/conversions-api/get-started),
updated Jun 28, 2026. It describes Events Manager-generated CAPI app/system-user
setup and the own-app/system-user route with an assigned Pixel. This documents
supported setup paths, not proof of this account's eventual token scope.

## Test results and limits

Fresh `npm run google-ads:check`: **39/39 PASS**, including actual-route/browser
helpers with external transport mocked, consent/admin gates and matching event
IDs. These are local regressions, **not Meta platform acceptance or dedup proof**.

No new successful claim was submitted. The permitted one-claim allowance remains
unused. QA env is saved branch-only; Preview is Ready and health isolation plus
denied/granted browser destination gates are verified, not live Lead processing.
Consequently:

| Required control | Status |
| --- | --- |
| QA_ENVIRONMENT | PASS: branch-only QA env; serving SHA/deployment and downstream-off health confirmed; QA browser destination confirmed |
| META_BROWSER_DELIVERY | FAIL consent-withdrawal gate: QA Pixel PageView verified, subsequent SubscribedButtonClick after withdrawal; Lead not attempted |
| META_SERVER_ACCEPTANCE | NOT_VERIFIED |
| META_PLATFORM_DEDUP | NOT_VERIFIED |
| GOOGLE_REGRESSION | NOT_VERIFIED for the new live Meta scenario; local 39/39 PASS |
| RELEASE | BLOCKED / NEED_CODE_FIX: stop loaded SDK on withdrawal and clear scoped Meta cookies |
| PRODUCTION_DEPLOY | NOT_PERFORMED |
| GTM_PUBLISH | NOT_PERFORMED |
| PAID_TRAFFIC | NOT_AUTHORIZED |

## Safe continuation / repeatable release fixture

After the minimal consent-withdrawal code fix and fresh Preview verification:

1. Configure only Preview branch `codex/google-ads-measurement` in canonical
   Vercel project `let-kasni`: public QA Pixel ID above, secret new QA CAPI token,
   QA Test Events code. Never use or reveal the production token.
2. Redeploy Preview only; pin serving SHA/deployment with authenticated health.
   Confirm both email booleans remain false, Supabase/provider/subscriptions off,
   browser has only the QA Pixel, and server uses the same QA resource.
3. Before creating a claim, inspect denied/granted/revoked marketing consent and
   admin blocking. Preserve Google/GTM configuration.
4. Submit at most one synthetic form claim through the existing application.
   Record UUID, matching browser/server event ID, QA destination, API acceptance,
   Test Events processing/dedup evidence and refresh/Back repeat suppression.
   Same payload IDs alone do not prove platform dedup.
5. Update this report and freeze exact candidate/deployment/unchanged GTM draft.
   Request one coordinated production release approval only after required gates
   pass. Existing rollback and separate durable/atomic storage paid-launch gate
   remain in the release-candidate document.

This persistent isolated fixture makes later release QA repeatable. Do not
schedule synthetic lead submissions, delete the dataset/access, publish GTM,
merge main or deploy production as part of this task.
