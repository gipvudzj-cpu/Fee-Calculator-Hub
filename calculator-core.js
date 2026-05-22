(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SellerCalculators = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function number(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function safeRate(value) {
    return Math.max(0, number(value));
  }

  function ratio(numerator, denominator) {
    denominator = number(denominator);
    return denominator === 0 ? 0 : number(numerator) / denominator;
  }

  function money(value) {
    return Math.round((number(value) + Number.EPSILON) * 100) / 100;
  }

  function calculateTikTokShop(input) {
    input = input || {};

    var grossRevenue =
      number(input.itemPrice) +
      number(input.buyerPaidShipping) -
      number(input.sellerDiscount);
    var appliedReferralFeeRate = input.useNewSellerPromo
      ? safeRate(input.newSellerPromoRate)
      : safeRate(input.referralFeeRate);
    var referralFee = grossRevenue * appliedReferralFeeRate;
    var affiliateCommission = grossRevenue * safeRate(input.affiliateCommissionRate);
    var refundAllowance = grossRevenue * safeRate(input.refundAllowanceRate);
    var totalFees = referralFee + affiliateCommission + refundAllowance;
    var totalCosts =
      number(input.cogs) +
      number(input.fulfillmentCost) +
      number(input.shippingLabelCost) +
      number(input.packagingCost) +
      number(input.otherCosts);
    var profitBeforeAds = grossRevenue - totalFees - totalCosts;
    var netProfit = profitBeforeAds - number(input.adSpend);

    return {
      grossRevenue: grossRevenue,
      appliedReferralFeeRate: appliedReferralFeeRate,
      referralFee: referralFee,
      affiliateCommission: affiliateCommission,
      refundAllowance: refundAllowance,
      totalFees: totalFees,
      totalCosts: totalCosts,
      profitBeforeAds: profitBeforeAds,
      profitAfterAds: netProfit,
      netProfit: netProfit,
      profitMargin: ratio(netProfit, grossRevenue),
      roi: ratio(netProfit, input.cogs),
      maxAdSpendBeforeLoss: profitBeforeAds,
      effectiveFeeRate: ratio(totalFees, grossRevenue),
    };
  }

  function calculateEtsy(input) {
    input = input || {};

    var orderTotal =
      number(input.itemPrice) +
      number(input.shippingCharged) -
      number(input.sellerDiscount);
    var listingFees = number(input.listingFee) * number(input.quantitySold || 1);
    var transactionFee = orderTotal * safeRate(input.transactionFeeRate);
    var paymentFee =
      orderTotal * safeRate(input.paymentProcessingRate) +
      number(input.paymentProcessingFixedFee);
    var offsiteAdsFee = input.offsiteAdsEnabled
      ? orderTotal * safeRate(input.offsiteAdsRate)
      : 0;
    var currencyConversionFee = input.currencyConversionEnabled
      ? orderTotal * safeRate(input.currencyConversionRate)
      : 0;
    var totalFees =
      listingFees +
      transactionFee +
      paymentFee +
      offsiteAdsFee +
      currencyConversionFee;
    var totalCosts =
      number(input.cogs) +
      number(input.shippingLabelCost) +
      number(input.packagingCost);
    var netProfit = orderTotal - totalFees - totalCosts;

    return {
      orderTotal: orderTotal,
      grossRevenue: orderTotal,
      listingFees: listingFees,
      transactionFee: transactionFee,
      paymentFee: paymentFee,
      offsiteAdsFee: offsiteAdsFee,
      currencyConversionFee: currencyConversionFee,
      totalFees: totalFees,
      totalCosts: totalCosts,
      netProfit: netProfit,
      profitMargin: ratio(netProfit, orderTotal),
      roi: ratio(netProfit, input.cogs),
    };
  }

  function calculateShopify(input) {
    input = input || {};

    var revenue =
      number(input.itemPrice) +
      number(input.shippingCharged) -
      number(input.discount);
    var paymentFee =
      revenue * safeRate(input.paymentProcessingRate) +
      number(input.paymentProcessingFixedFee);
    var returnAllowance = revenue * safeRate(input.returnAllowanceRate);
    var totalCosts =
      number(input.cogs) +
      number(input.shippingLabelCost) +
      number(input.packagingCost) +
      number(input.appOrderCost);
    var totalFees = paymentFee + returnAllowance;
    var maxAdSpendBeforeLoss = revenue - totalFees - totalCosts;
    var netProfit =
      maxAdSpendBeforeLoss -
      number(input.adSpend);

    return {
      revenue: revenue,
      grossRevenue: revenue,
      paymentFee: paymentFee,
      returnAllowance: returnAllowance,
      totalFees: totalFees,
      totalCosts: totalCosts,
      netProfit: netProfit,
      profitMargin: ratio(netProfit, revenue),
      roi: ratio(netProfit, input.cogs),
      maxAdSpendBeforeLoss: maxAdSpendBeforeLoss,
    };
  }

  function calculatePayPal(input) {
    input = input || {};

    var transactionAmount = number(input.transactionAmount);
    var baseFee =
      transactionAmount * safeRate(input.percentageFee) +
      number(input.fixedFee);
    var crossBorderFee =
      transactionAmount * safeRate(input.crossBorderFeeRate);
    var currencyConversionFee =
      transactionAmount * safeRate(input.currencyConversionRate);
    var totalFees = baseFee + crossBorderFee + currencyConversionFee;

    return {
      grossRevenue: transactionAmount,
      transactionAmount: transactionAmount,
      baseFee: baseFee,
      crossBorderFee: crossBorderFee,
      currencyConversionFee: currencyConversionFee,
      totalFees: totalFees,
      netReceived: transactionAmount - totalFees,
    };
  }

  function calculateStripe(input) {
    input = input || {};

    var transactionAmount = number(input.transactionAmount);
    var processingFee =
      transactionAmount * safeRate(input.percentageFee) +
      number(input.fixedFee);
    var internationalFee =
      transactionAmount * safeRate(input.internationalCardRate);
    var currencyConversionFee =
      transactionAmount * safeRate(input.currencyConversionRate);
    var disputeAllowance =
      transactionAmount * safeRate(input.disputeAllowanceRate);
    var totalFees =
      processingFee +
      internationalFee +
      currencyConversionFee +
      disputeAllowance;

    return {
      grossRevenue: transactionAmount,
      transactionAmount: transactionAmount,
      processingFee: processingFee,
      internationalFee: internationalFee,
      currencyConversionFee: currencyConversionFee,
      disputeAllowance: disputeAllowance,
      totalFees: totalFees,
      netReceived: transactionAmount - totalFees,
    };
  }

  function calculateBreakEvenRoas(input) {
    input = input || {};

    var revenue = number(input.sellingPrice);
    var platformFee = revenue * safeRate(input.platformFeeRate);
    var paymentFee =
      revenue * safeRate(input.paymentFeeRate) +
      number(input.fixedPaymentFee);
    var nonAdCosts =
      number(input.cogs) +
      platformFee +
      paymentFee +
      number(input.shippingCost) +
      number(input.fulfillmentCost) +
      number(input.packagingCost) +
      number(input.otherCosts);
    var breakEvenAdSpend = revenue - nonAdCosts;

    return {
      grossRevenue: revenue,
      revenue: revenue,
      platformFee: platformFee,
      paymentFee: paymentFee,
      nonAdCosts: nonAdCosts,
      breakEvenAdSpend: breakEvenAdSpend,
      breakEvenRoas: breakEvenAdSpend <= 0 ? 0 : ratio(revenue, breakEvenAdSpend),
      profitableBeforeAds: breakEvenAdSpend > 0,
    };
  }

  function calculateProductPricing(input) {
    input = input || {};

    var fixedCosts =
      number(input.cogs) +
      number(input.shippingCost) +
      number(input.fulfillmentCost) +
      number(input.packagingCost) +
      number(input.otherFixedCosts) +
      number(input.fixedPaymentFee);
    var percentageCostRate =
      safeRate(input.platformFeeRate) +
      safeRate(input.paymentFeeRate);
    var denominator =
      1 -
      percentageCostRate -
      safeRate(input.targetMargin);
    var reachable = denominator > 0;

    return {
      fixedCosts: fixedCosts,
      percentageCostRate: percentageCostRate,
      denominator: denominator,
      requiredPrice: reachable ? fixedCosts / denominator : 0,
      reachable: reachable,
    };
  }

  return {
    number: number,
    safeRate: safeRate,
    ratio: ratio,
    money: money,
    calculateTikTokShop: calculateTikTokShop,
    calculateEtsy: calculateEtsy,
    calculateShopify: calculateShopify,
    calculatePayPal: calculatePayPal,
    calculateStripe: calculateStripe,
    calculateBreakEvenRoas: calculateBreakEvenRoas,
    calculateProductPricing: calculateProductPricing,
  };
});
