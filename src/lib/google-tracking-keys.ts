export const googleEventStoragePrefix = "letkasni-google-event:";

const deliveredEventKeys = new Set<string>();

export function hasDeliveredGoogleEvent(storageKey: string) {
  return deliveredEventKeys.has(storageKey);
}

export function markGoogleEventDelivered(storageKey: string) {
  deliveredEventKeys.add(storageKey);
}

export function clearDeliveredGoogleEvents() {
  deliveredEventKeys.clear();
}
