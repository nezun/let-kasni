import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Read-only contract for the actual Google UI export; never imports or publishes.
const path = process.argv[2] ?? new URL("../docs/GTM-WT3B2L8P-workspace2-2026-09-16.json", import.meta.url);
const raw = readFileSync(path, "utf8");
const document = JSON.parse(raw);
const version = document.containerVersion;
assert.equal(document.exportFormatVersion, 2);
assert.equal(version.accountId, "6376980479");
assert.equal(version.containerId, "264196113");
assert.equal(version.container.publicId, "GTM-WT3B2L8P");
assert.deepEqual(version.container.usageContext, ["WEB"]);
assert.equal(version.tag.length, 3, "No parallel GA4, Meta or other tag allowed");
assert.equal(version.trigger.length, 1);
assert.equal(version.variable.length, 1);
assert.equal(version.builtInVariable.length, 5);
assert.equal(/gtm_auth|access_token|api_secret|user_data|user_provided_data/i.test(raw), false);

const parameter = (item, key) => item.parameter?.find((value) => value.key === key)?.value;
const tag = (id, type) => {
  const item = version.tag.find((value) => value.tagId === id);
  assert.ok(item, `Missing tag ${id}`);
  assert.equal(item.type, type);
  // Do not introduce additional consent grants/overrides; built-in Google checks
  // and the website's existing consent-gated loading remain authoritative.
  assert.equal(item.consentSettings?.consentStatus, "NOT_SET");
  return item;
};
const lead = tag("7", "awct");
assert.equal(parameter(lead, "conversionId"), "18452620232");
assert.equal(parameter(lead, "conversionLabel"), "VnU-CKD6zfgcEMjH8t5E");
assert.equal(parameter(lead, "orderId"), "{{DLV - transaction_id}}");
assert.equal(parameter(lead, "enableConversionLinker"), "true");
for (const key of ["enableNewCustomerReporting", "enableProductReporting", "enableShippingData"]) {
  assert.equal(parameter(lead, key), "false");
}
assert.deepEqual(lead.firingTriggerId, ["4"]);
const trigger = version.trigger[0];
assert.equal(trigger.triggerId, "4");
assert.equal(trigger.type, "CUSTOM_EVENT");
assert.equal(trigger.customEventFilter.length, 1);
assert.equal(trigger.customEventFilter[0].type, "EQUALS");
assert.equal(parameter(trigger.customEventFilter[0], "arg0"), "{{_event}}");
assert.equal(parameter(trigger.customEventFilter[0], "arg1"), "lead_submit");
const variable = version.variable[0];
assert.equal(variable.name, "DLV - transaction_id");
assert.equal(variable.type, "v");
assert.equal(parameter(variable, "dataLayerVersion"), "2");
assert.equal(parameter(variable, "setDefaultValue"), "false");
assert.equal(parameter(variable, "name"), "eventModel.transaction_id");
assert.deepEqual(tag("5", "gclidw").firingTriggerId, ["2147479553"]);
const base = tag("8", "googtag");
assert.equal(parameter(base, "tagId"), "AW-18452620232");
assert.deepEqual(base.firingTriggerId, ["2147479573"]);
console.log(`GTM export contract PASS: GTM-WT3B2L8P; 3 tags / 1 trigger / 1 custom variable; sha256=${createHash("sha256").update(raw).digest("hex")}`);
