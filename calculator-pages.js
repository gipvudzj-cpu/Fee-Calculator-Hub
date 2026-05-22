window.SellerCalculatorPages = {
    tiktok: {
        title: "TikTok Shop Fee Calculator",
        intro: "Estimate real TikTok Shop order profit after referral fees, creator affiliate commission, ad spend, fulfillment, shipping, product cost, packaging, and refunds.",
        defaultPlatform: "tiktokShopUS",
        formulaName: "calculateTikTokShop",
        fields: [
            ["itemPrice", "Item price", 30],
            ["buyerPaidShipping", "Buyer-paid shipping", 0],
            ["sellerDiscount", "Seller discount", 0],
            ["cogs", "Product cost / COGS", 8],
            ["referralFeeRate", "Referral fee rate", 0.06],
            ["useNewSellerPromo", "Use TikTok new-seller promotion rate", false, "checkbox"],
            ["newSellerPromoRate", "New-seller promotion rate", 0.03],
            ["affiliateCommissionRate", "Affiliate commission rate", 0.1],
            ["adSpend", "Ad spend per order", 4],
            ["fulfillmentCost", "Fulfillment cost", 2],
            ["shippingLabelCost", "Shipping label cost", 3],
            ["packagingCost", "Packaging cost", 0.5],
            ["otherCosts", "Other per-order costs", 1],
            ["refundAllowanceRate", "Refund allowance rate", 0.02]
        ],
        results: [
            ["netProfit", "Net profit", "money"],
            ["profitMargin", "Profit margin", "percent"],
            ["totalFees", "Total fees", "money"],
            ["totalCosts", "Total costs", "money"],
            ["referralFee", "Referral fee", "money"],
            ["appliedReferralFeeRate", "Applied referral fee rate", "percent"],
            ["affiliateCommission", "Creator commission cost", "money"],
            ["profitBeforeAds", "Profit before ads", "money"],
            ["profitAfterAds", "Profit after ads", "money"],
            ["maxAdSpendBeforeLoss", "Max ad spend before loss", "money"],
            ["effectiveFeeRate", "Effective fee rate", "percent"]
        ],
        formula: "Net profit = fee base - applied referral fee - affiliate commission - ad spend - fulfillment - shipping label - packaging - COGS - other costs - refund allowance. The optional new-seller promotion uses the promotion rate instead of the standard referral fee rate.",
        example: "$30 item price, 6% referral fee, 10% affiliate commission, $8 COGS, $5 shipping and fulfillment, and $4 ad spend leaves an estimated $6.10 net profit. If the new-seller promotion applies, use the promotion checkbox and rate field.",
        faq: [
            ["Does this include TikTok Shop creator commission?", "Yes. Enter the affiliate commission rate you offer creators, or use 0% when the order has no creator commission."],
            ["Are the default rates official advice?", "No. Defaults are editable estimates. Verify your final fee rates inside TikTok Shop Seller Center."],
            ["Can I use this for non-US orders?", "For version 1, United States defaults are active. Other regions can use custom rates until regional defaults are configured."]
        ]
    },
    etsy: {
        title: "Etsy Fee Calculator",
        intro: "Estimate Etsy seller profit after listing fees, transaction fees, payment processing, Offsite Ads, shipping, packaging, and product cost.",
        defaultPlatform: "etsyUS",
        formulaName: "calculateEtsy",
        fields: [
            ["itemPrice", "Item price", 35],
            ["shippingCharged", "Shipping charged to buyer", 5],
            ["sellerDiscount", "Seller discount", 0],
            ["quantitySold", "Quantity sold", 1],
            ["cogs", "Product cost / COGS", 10],
            ["shippingLabelCost", "Shipping label cost", 4],
            ["packagingCost", "Packaging cost", 1],
            ["listingFee", "Listing fee", 0.2],
            ["transactionFeeRate", "Transaction fee rate", 0.065],
            ["paymentProcessingRate", "Payment processing rate", 0.03],
            ["paymentProcessingFixedFee", "Payment processing fixed fee", 0.25],
            ["offsiteAdsEnabled", "Apply Offsite Ads fee", false, "checkbox"],
            ["offsiteAdsRate", "Offsite Ads rate", 0.15],
            ["currencyConversionEnabled", "Apply currency conversion fee", false, "checkbox"],
            ["currencyConversionRate", "Currency conversion rate", 0]
        ],
        results: [
            ["netProfit", "Net profit", "money"],
            ["profitMargin", "Profit margin", "percent"],
            ["totalFees", "Total fees", "money"],
            ["totalCosts", "Total costs", "money"],
            ["listingFees", "Listing fees", "money"],
            ["transactionFee", "Transaction fee", "money"],
            ["paymentFee", "Payment fee", "money"],
            ["offsiteAdsFee", "Offsite Ads fee", "money"]
        ],
        formula: "Net profit = order total - listing fees - transaction fee - payment fee - Offsite Ads fee - shipping label - packaging - COGS.",
        example: "Use the Offsite Ads rate field only when the sale is attributed to Offsite Ads.",
        faq: [
            ["Why are Etsy payment rates editable?", "Etsy payment processing rates vary by country, so the calculator keeps the rate editable."]
        ]
    },
    shopify: {
        title: "Shopify Profit Calculator",
        intro: "Estimate Shopify or DTC order profit after product cost, card processing, shipping, packaging, app/order costs, return allowance, and ad spend.",
        defaultPlatform: "shopifyUS",
        formulaName: "calculateShopify",
        fields: [
            ["itemPrice", "Item price", 40],
            ["shippingCharged", "Shipping charged to buyer", 0],
            ["discount", "Discount", 0],
            ["cogs", "COGS", 12],
            ["paymentProcessingRate", "Payment processing rate", 0.029],
            ["paymentProcessingFixedFee", "Payment processing fixed fee", 0.3],
            ["shippingLabelCost", "Shipping label cost", 5],
            ["packagingCost", "Packaging cost", 1],
            ["appOrderCost", "App/order cost", 0.5],
            ["adSpend", "Ad spend per order", 8],
            ["returnAllowanceRate", "Return allowance rate", 0.02]
        ],
        results: [
            ["netProfit", "Net profit", "money"],
            ["profitMargin", "Profit margin", "percent"],
            ["totalFees", "Total fees", "money"],
            ["totalCosts", "Total costs", "money"],
            ["paymentFee", "Payment fee", "money"],
            ["returnAllowance", "Return allowance", "money"],
            ["maxAdSpendBeforeLoss", "Max ad spend before loss", "money"]
        ],
        formula: "Net profit = revenue - payment fee - COGS - shipping label - packaging - app/order cost - ad spend - return allowance.",
        example: "Use this for order-level DTC margin before fixed overhead.",
        faq: [
            ["Does this include monthly Shopify plan cost?", "No. This calculator estimates per-order profit, not store-level monthly overhead."]
        ]
    },
    paypal: {
        title: "PayPal Fee Calculator",
        intro: "Estimate PayPal transaction fees and net amount received after percentage fees, fixed fees, cross-border fees, and currency conversion.",
        defaultPlatform: "paypalUS",
        formulaName: "calculatePayPal",
        fields: [
            ["transactionAmount", "Transaction amount", 100],
            ["percentageFee", "Percentage fee", 0.0349],
            ["fixedFee", "Fixed fee", 0.49],
            ["crossBorderFeeRate", "Cross-border fee rate", 0],
            ["currencyConversionRate", "Currency conversion rate", 0]
        ],
        results: [
            ["netReceived", "Net received", "money"],
            ["totalFees", "Total fees", "money"],
            ["baseFee", "Base fee", "money"],
            ["crossBorderFee", "Cross-border fee", "money"],
            ["currencyConversionFee", "Currency conversion fee", "money"]
        ],
        formula: "Net received = transaction amount - base fee - cross-border fee - currency conversion fee.",
        example: "Enter your actual merchant fee schedule when it differs from the default.",
        faq: [
            ["Why does my PayPal account show a different fee?", "PayPal fee schedules vary by product, account, country, and transaction type."]
        ]
    },
    stripe: {
        title: "Stripe Fee Calculator",
        intro: "Estimate Stripe processing fees and net received after card processing, international card fees, currency conversion, and dispute allowance.",
        defaultPlatform: "stripeUS",
        formulaName: "calculateStripe",
        fields: [
            ["transactionAmount", "Transaction amount", 100],
            ["percentageFee", "Percentage fee", 0.029],
            ["fixedFee", "Fixed fee", 0.3],
            ["internationalCardRate", "International card rate", 0],
            ["currencyConversionRate", "Currency conversion rate", 0],
            ["disputeAllowanceRate", "Dispute allowance rate", 0]
        ],
        results: [
            ["netReceived", "Net received", "money"],
            ["totalFees", "Total fees", "money"],
            ["processingFee", "Processing fee", "money"],
            ["internationalFee", "International fee", "money"],
            ["currencyConversionFee", "Currency conversion fee", "money"],
            ["disputeAllowance", "Dispute allowance", "money"]
        ],
        formula: "Net received = transaction amount - processing fee - international fee - currency conversion fee - dispute allowance.",
        example: "Use international and conversion fields only when they apply to the transaction.",
        faq: [
            ["Does this include Stripe disputes?", "The dispute allowance field is optional and estimates risk per order, not an official Stripe fee."]
        ]
    },
    roas: {
        title: "Break-even ROAS Calculator",
        intro: "Find the maximum ad spend per order and break-even ROAS before paid ads turn a product unprofitable.",
        defaultPlatform: "tiktokShopUS",
        formulaName: "calculateBreakEvenRoas",
        fields: [
            ["sellingPrice", "Selling price", 30],
            ["cogs", "COGS", 8],
            ["platformFeeRate", "Platform fee rate", 0.06],
            ["paymentFeeRate", "Payment fee rate", 0.03],
            ["fixedPaymentFee", "Fixed payment fee", 0.3],
            ["shippingCost", "Shipping cost", 3],
            ["fulfillmentCost", "Fulfillment cost", 2],
            ["packagingCost", "Packaging cost", 0.5],
            ["otherCosts", "Other costs", 1]
        ],
        results: [
            ["breakEvenAdSpend", "Break-even ad spend", "money"],
            ["breakEvenRoas", "Break-even ROAS", "number"],
            ["nonAdCosts", "Non-ad costs", "money"],
            ["platformFee", "Platform fee", "money"],
            ["paymentFee", "Payment fee", "money"]
        ],
        formula: "Break-even ROAS = revenue / break-even ad spend.",
        example: "If break-even ad spend is zero or negative, the product is unprofitable before ads.",
        faq: [
            ["What ROAS should I target?", "Break-even ROAS is the minimum. Sellers usually need higher ROAS to cover overhead and profit goals."]
        ]
    },
    pricing: {
        title: "Product Pricing Calculator",
        intro: "Calculate the selling price needed to hit a target profit margin after fixed costs and percentage fees.",
        defaultPlatform: "tiktokShopUS",
        formulaName: "calculateProductPricing",
        fields: [
            ["cogs", "Product cost / COGS", 8],
            ["shippingCost", "Shipping cost", 3],
            ["fulfillmentCost", "Fulfillment cost", 2],
            ["packagingCost", "Packaging cost", 0.5],
            ["otherFixedCosts", "Other fixed per-order costs", 1],
            ["platformFeeRate", "Platform fee rate", 0.06],
            ["paymentFeeRate", "Payment fee rate", 0.03],
            ["fixedPaymentFee", "Fixed payment fee", 0.3],
            ["targetMargin", "Target profit margin", 0.25]
        ],
        results: [
            ["requiredPrice", "Required selling price", "money"],
            ["fixedCosts", "Fixed costs", "money"],
            ["percentageCostRate", "Percentage cost rate", "percent"],
            ["denominator", "Pricing denominator", "number"]
        ],
        formula: "Required price = fixed costs / (1 - percentage fee rate - target margin).",
        example: "If the denominator is zero or negative, the target margin is not reachable with those rates.",
        faq: [
            ["Why did the calculator say the margin is unreachable?", "The target margin plus percentage fees leaves no room to cover fixed costs."]
        ]
    }
};
