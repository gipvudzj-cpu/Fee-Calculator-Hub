const assert = require("node:assert/strict");
const {
  calculateBreakEvenRoas,
  calculateProductPricing,
  calculateTikTokShop,
} = require("../calculator-core.js");

function assertClose(actual, expected, message) {
  assert.equal(typeof actual, "number", message);
  assert.ok(
    Math.abs(actual - expected) < 1e-12,
    `${message}: expected ${expected}, got ${actual}`,
  );
}

const tiktok = calculateTikTokShop({
  itemPrice: 30,
  buyerPaidShipping: 0,
  sellerDiscount: 0,
  cogs: 8,
  referralFeeRate: 0.06,
  affiliateCommissionRate: 0.1,
  adSpend: 4,
  fulfillmentCost: 2,
  shippingLabelCost: 3,
  packagingCost: 0.5,
  otherCosts: 1,
  refundAllowanceRate: 0.02,
});

assertClose(tiktok.grossRevenue, 30, "TikTok grossRevenue");
assertClose(tiktok.referralFee, 1.8, "TikTok referralFee");
assertClose(tiktok.affiliateCommission, 3, "TikTok affiliateCommission");
assertClose(tiktok.refundAllowance, 0.6, "TikTok refundAllowance");
assertClose(tiktok.totalFees, 5.4, "TikTok totalFees");
assertClose(tiktok.totalCosts, 14.5, "TikTok totalCosts");
assertClose(tiktok.profitBeforeAds, 10.1, "TikTok profitBeforeAds");
assertClose(tiktok.netProfit, 6.1, "TikTok netProfit");
assertClose(tiktok.profitMargin, 0.20333333333333334, "TikTok profitMargin");
assertClose(tiktok.maxAdSpendBeforeLoss, 10.1, "TikTok maxAdSpendBeforeLoss");

const pricing = calculateProductPricing({
  cogs: 8,
  shippingCost: 3,
  fulfillmentCost: 2,
  packagingCost: 0.5,
  otherFixedCosts: 1,
  platformFeeRate: 0.06,
  paymentFeeRate: 0.03,
  fixedPaymentFee: 0.3,
  targetMargin: 0.25,
});

assertClose(pricing.fixedCosts, 14.8, "Product pricing fixedCosts");
assertClose(pricing.percentageCostRate, 0.09, "Product pricing percentageCostRate");
assertClose(pricing.requiredPrice, 22.424242424242426, "Product pricing requiredPrice");
assert.equal(pricing.reachable, true, "Product pricing reachable");

const roas = calculateBreakEvenRoas({
  sellingPrice: 30,
  cogs: 8,
  platformFeeRate: 0.06,
  paymentFeeRate: 0.03,
  fixedPaymentFee: 0.3,
  shippingCost: 3,
  fulfillmentCost: 2,
  packagingCost: 0.5,
  otherCosts: 1,
});

assertClose(roas.nonAdCosts, 17.5, "Break-even ROAS nonAdCosts");
assertClose(roas.breakEvenAdSpend, 12.5, "Break-even ROAS breakEvenAdSpend");
assertClose(roas.breakEvenRoas, 2.4, "Break-even ROAS breakEvenRoas");

console.log("Formula tests passed.");
