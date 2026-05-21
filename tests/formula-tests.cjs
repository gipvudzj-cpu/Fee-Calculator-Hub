const assert = require("node:assert/strict");
const {
  calculateBreakEvenRoas,
  calculateEtsy,
  calculatePayPal,
  calculateProductPricing,
  calculateShopify,
  calculateStripe,
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
assertClose(tiktok.profitAfterAds, 6.1, "TikTok profitAfterAds");
assertClose(tiktok.netProfit, 6.1, "TikTok netProfit");
assertClose(tiktok.profitMargin, 0.20333333333333334, "TikTok profitMargin");
assertClose(tiktok.roi, 0.7625, "TikTok roi");
assertClose(tiktok.maxAdSpendBeforeLoss, 10.1, "TikTok maxAdSpendBeforeLoss");

const etsy = calculateEtsy({
  itemPrice: 30,
  shippingCharged: 5,
  sellerDiscount: 0,
  quantitySold: 1,
  cogs: 8,
  shippingLabelCost: 3,
  packagingCost: 0.5,
  listingFee: 0.2,
  transactionFeeRate: 0.065,
  paymentProcessingRate: 0.03,
  paymentProcessingFixedFee: 0.25,
  offsiteAdsEnabled: true,
  offsiteAdsRate: 0.15,
  currencyConversionEnabled: true,
  currencyConversionRate: 0.025,
});

assertClose(etsy.grossRevenue, 35, "Etsy grossRevenue");
assertClose(etsy.totalFees, 9.9, "Etsy totalFees");
assertClose(etsy.totalCosts, 11.5, "Etsy totalCosts");
assertClose(etsy.netProfit, 13.6, "Etsy netProfit");
assertClose(etsy.roi, 1.7, "Etsy roi");

const shopify = calculateShopify({
  itemPrice: 30,
  shippingCharged: 0,
  discount: 0,
  cogs: 8,
  paymentProcessingRate: 0.03,
  paymentProcessingFixedFee: 0.3,
  shippingLabelCost: 3,
  packagingCost: 0.5,
  appOrderCost: 1,
  adSpend: 4,
  returnAllowanceRate: 0.02,
});

assertClose(shopify.grossRevenue, 30, "Shopify grossRevenue");
assertClose(shopify.totalFees, 1.8, "Shopify totalFees");
assertClose(shopify.totalCosts, 12.5, "Shopify totalCosts");
assertClose(shopify.netProfit, 11.7, "Shopify netProfit");
assertClose(shopify.roi, 1.4625, "Shopify roi");
assertClose(shopify.maxAdSpendBeforeLoss, 15.7, "Shopify maxAdSpendBeforeLoss");

const paypal = calculatePayPal({
  transactionAmount: 30,
  percentageFee: 0.0349,
  fixedFee: 0.49,
  crossBorderFeeRate: 0.015,
  currencyConversionRate: 0.03,
});

assertClose(paypal.grossRevenue, 30, "PayPal grossRevenue");
assertClose(paypal.transactionAmount, 30, "PayPal transactionAmount");
assertClose(paypal.totalFees, 2.887, "PayPal totalFees");
assertClose(paypal.netReceived, 27.113, "PayPal netReceived");

const stripe = calculateStripe({
  transactionAmount: 30,
  percentageFee: 0.029,
  fixedFee: 0.3,
  internationalCardRate: 0.015,
  currencyConversionRate: 0.01,
  disputeAllowanceRate: 0.02,
});

assertClose(stripe.grossRevenue, 30, "Stripe grossRevenue");
assertClose(stripe.transactionAmount, 30, "Stripe transactionAmount");
assertClose(stripe.disputeAllowance, 0.6, "Stripe disputeAllowance");
assertClose(stripe.totalFees, 2.52, "Stripe totalFees");
assertClose(stripe.netReceived, 27.48, "Stripe netReceived");

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
assertClose(pricing.denominator, 0.66, "Product pricing denominator");
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

assertClose(roas.grossRevenue, 30, "Break-even ROAS grossRevenue");
assertClose(roas.nonAdCosts, 17.5, "Break-even ROAS nonAdCosts");
assertClose(roas.breakEvenAdSpend, 12.5, "Break-even ROAS breakEvenAdSpend");
assertClose(roas.breakEvenRoas, 2.4, "Break-even ROAS breakEvenRoas");

console.log("Formula tests passed.");
