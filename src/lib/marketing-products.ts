export type ApprovedMarketingProduct = {
  productId: string;
  scopeId: "vga_passenger_consumer_rights_v1";
  approvedAt: string;
  approvedBy: string;
};

// Intentionally empty: this release builds the lawful subscription entry and
// send gate, but does not approve or launch a sales campaign. Adding a product
// requires an explicit business/legal decision in a later reviewed change.
export const approvedMarketingProducts: ApprovedMarketingProduct[] = [];

export function getApprovedMarketingProduct(productId: string) {
  return approvedMarketingProducts.find((product) => product.productId === productId);
}
