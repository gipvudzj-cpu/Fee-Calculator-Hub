(function (root) {
    "use strict";

    var calculators = root.SellerCalculators || {};

    function moneyResult(key, label) {
        return { key: key, label: label, format: "money" };
    }

    function percentResult(key, label) {
        return { key: key, label: label, format: "percent" };
    }

    function decimalResult(key, label) {
        return { key: key, label: label, format: "decimal" };
    }

    function moneyField(name, label, value) {
        return { name: name, label: label, type: "number", value: value, step: 0.01 };
    }

    function rateField(name, label, value) {
        return { name: name, label: label, type: "number", value: value, step: 0.001 };
    }

    function checkboxField(name, label, value) {
        return { name: name, label: label, type: "checkbox", value: value };
    }

    root.SellerCalculatorPages = {
        tiktok: {
            title: "TikTok Shop Fee Calculator",
            intro: "Estimate TikTok Shop profit after referral fees, creator affiliate commission, ad spend, fulfillment, shipping, product cost, packaging, and refund allowance.",
            defaultPlatform: "tiktokShopUS",
            formulaName: "calculateTikTokShop",
            fields: [
                moneyField("itemPrice", "Item price", 30),
                moneyField("buyerPaidShipping", "Buyer-paid shipping", 0),
                moneyField("sellerDiscount", "Seller discount", 0),
                moneyField("cogs", "Product cost / COGS", 8),
                rateField("referralFeeRate", "Referral fee rate", 0.06),
                rateField("affiliateCommissionRate", "Creator affiliate commission rate", 0.1),
                moneyField("adSpend", "Ad spend per order", 4),
                moneyField("fulfillmentCost", "Fulfillment cost", 2),
                moneyField("shippingLabelCost", "Shipping label cost", 3),
                moneyField("packagingCost", "Packaging cost", 0.5),
                moneyField("otherCosts", "Other costs", 1),
                rateField("refundAllowanceRate", "Refund allowance rate", 0.02)
            ],
            results: [
                moneyResult("netProfit", "Net profit"),
                percentResult("profitMargin", "Profit margin"),
                moneyResult("totalFees", "Total fees"),
                moneyResult("totalCosts", "Total costs"),
                moneyResult("affiliateCommission", "Affiliate commission"),
                moneyResult("profitBeforeAds", "Profit before ads"),
                moneyResult("profitAfterAds", "Profit after ads"),
                moneyResult("maxAdSpendBeforeLoss", "Max ad spend before loss"),
                percentResult("effectiveFeeRate", "Effective fee rate")
            ],
            formula: calculators.calculateTikTokShop,
            example: "On a $30 TikTok Shop order with $8 COGS, a 6% referral fee, 10% creator commission, $4 ad spend, $2 fulfillment, $3 shipping, $0.50 packaging, $1 other cost, and a 2% refund allowance, estimated net profit is $7.10.",
            faq: [
                {
                    question: "Does this include TikTok Shop referral fees?",
                    answer: "Yes. The referral fee rate is editable so you can match the rate shown in Seller Center."
                },
                {
                    question: "Should creator affiliate commission be entered per order?",
                    answer: "Enter the commission rate you expect on orders attributed to creators or affiliates."
                }
            ]
        },
        etsy: {
            title: "Etsy Fee Calculator",
            intro: "Calculate Etsy seller profit after listing fees, transaction fees, payment processing, Offsite Ads, shipping, packaging, and product cost.",
            defaultPlatform: "etsyUS",
            formulaName: "calculateEtsy",
            fields: [
                moneyField("itemPrice", "Item price", 35),
                moneyField("shippingCharged", "Shipping charged", 5),
                moneyField("sellerDiscount", "Seller discount", 0),
                { name: "quantitySold", label: "Quantity sold", type: "number", value: 1, step: 1 },
                moneyField("cogs", "Product cost / COGS", 10),
                moneyField("shippingLabelCost", "Shipping label cost", 4),
                moneyField("packagingCost", "Packaging cost", 1),
                moneyField("listingFee", "Listing fee", 0.2),
                rateField("transactionFeeRate", "Transaction fee rate", 0.065),
                rateField("paymentProcessingRate", "Payment processing rate", 0.03),
                moneyField("paymentProcessingFixedFee", "Payment processing fixed fee", 0.25),
                rateField("offsiteAdsRate", "Offsite Ads rate", 0.15),
                rateField("currencyConversionRate", "Currency conversion rate", 0),
                checkboxField("offsiteAdsEnabled", "Offsite Ads enabled", false),
                checkboxField("currencyConversionEnabled", "Currency conversion enabled", false)
            ],
            results: [
                moneyResult("netProfit", "Net profit"),
                percentResult("profitMargin", "Profit margin"),
                moneyResult("totalFees", "Total fees"),
                moneyResult("totalCosts", "Total costs"),
                moneyResult("listingFees", "Listing fees"),
                moneyResult("transactionFee", "Transaction fee"),
                moneyResult("paymentFee", "Payment fee"),
                moneyResult("offsiteAdsFee", "Offsite Ads fee")
            ],
            formula: calculators.calculateEtsy,
            example: "A $35 Etsy item with $5 shipping charged, $10 COGS, $4 shipping label, $1 packaging, standard listing, transaction, and payment fees returns estimated net profit before optional Offsite Ads.",
            faq: [
                {
                    question: "Does this include Offsite Ads?",
                    answer: "Yes, when the Offsite Ads checkbox is enabled. You can edit the rate to match your Etsy account."
                },
                {
                    question: "Are listing fees multiplied by quantity?",
                    answer: "Yes. Listing fees use the listing fee value multiplied by quantity sold."
                }
            ]
        },
        shopify: {
            title: "Shopify Profit Calculator",
            intro: "Calculate Shopify or DTC order profit after product cost, payment processing, shipping, packaging, app costs, returns, and ads.",
            defaultPlatform: "shopifyUS",
            formulaName: "calculateShopify",
            fields: [
                moneyField("itemPrice", "Item price", 40),
                moneyField("shippingCharged", "Shipping charged", 0),
                moneyField("discount", "Discount", 0),
                moneyField("cogs", "Product cost / COGS", 12),
                rateField("paymentProcessingRate", "Payment processing rate", 0.029),
                moneyField("paymentProcessingFixedFee", "Payment processing fixed fee", 0.3),
                moneyField("shippingLabelCost", "Shipping label cost", 5),
                moneyField("packagingCost", "Packaging cost", 1),
                moneyField("appOrderCost", "App cost per order", 0.5),
                moneyField("adSpend", "Ad spend per order", 8),
                rateField("returnAllowanceRate", "Return allowance rate", 0.02)
            ],
            results: [
                moneyResult("netProfit", "Net profit"),
                percentResult("profitMargin", "Profit margin"),
                moneyResult("totalFees", "Total fees"),
                moneyResult("totalCosts", "Total costs"),
                moneyResult("paymentFee", "Payment fee"),
                moneyResult("returnAllowance", "Return allowance"),
                moneyResult("maxAdSpendBeforeLoss", "Max ad spend before loss")
            ],
            formula: calculators.calculateShopify,
            example: "A $40 Shopify order with $12 COGS, standard payment processing, $5 shipping, $1 packaging, $0.50 app cost, $8 ads, and 2% return allowance estimates order profit after ads.",
            faq: [
                {
                    question: "Can this work for non-Shopify DTC stores?",
                    answer: "Yes. Edit the payment processing, app, shipping, return, and ad assumptions for your store."
                },
                {
                    question: "Does this include monthly Shopify subscription cost?",
                    answer: "No. Add a per-order allocation in app cost or other operating analysis if needed."
                }
            ]
        },
        paypal: {
            title: "PayPal Fee Calculator",
            intro: "Estimate PayPal transaction fees and net received after percentage fees, fixed fees, cross-border fees, and currency conversion.",
            defaultPlatform: "paypalUS",
            formulaName: "calculatePayPal",
            fields: [
                moneyField("transactionAmount", "Transaction amount", 100),
                rateField("percentageFee", "Percentage fee", 0.0349),
                moneyField("fixedFee", "Fixed fee", 0.49),
                rateField("crossBorderFeeRate", "Cross-border fee rate", 0),
                rateField("currencyConversionRate", "Currency conversion rate", 0)
            ],
            results: [
                moneyResult("netReceived", "Net received"),
                moneyResult("totalFees", "Total fees"),
                moneyResult("baseFee", "Base fee"),
                moneyResult("crossBorderFee", "Cross-border fee"),
                moneyResult("currencyConversionFee", "Currency conversion fee")
            ],
            formula: calculators.calculatePayPal,
            example: "A $100 PayPal payment at 3.49% plus $0.49 has a $3.98 base fee before optional cross-border or currency conversion fees.",
            faq: [
                {
                    question: "Does this include cross-border fees?",
                    answer: "Yes. Enter a cross-border fee rate when it applies to the transaction."
                },
                {
                    question: "Is the fixed fee editable?",
                    answer: "Yes. Update the fixed fee for your currency and PayPal product."
                }
            ]
        },
        stripe: {
            title: "Stripe Fee Calculator",
            intro: "Estimate Stripe processing fees and net received after card processing, international card fees, currency conversion, and dispute allowance.",
            defaultPlatform: "stripeUS",
            formulaName: "calculateStripe",
            fields: [
                moneyField("transactionAmount", "Transaction amount", 100),
                rateField("percentageFee", "Percentage fee", 0.029),
                moneyField("fixedFee", "Fixed fee", 0.3),
                rateField("internationalCardRate", "International card rate", 0),
                rateField("currencyConversionRate", "Currency conversion rate", 0),
                rateField("disputeAllowanceRate", "Dispute allowance rate", 0)
            ],
            results: [
                moneyResult("netReceived", "Net received"),
                moneyResult("totalFees", "Total fees"),
                moneyResult("processingFee", "Processing fee"),
                moneyResult("internationalFee", "International fee"),
                moneyResult("currencyConversionFee", "Currency conversion fee"),
                moneyResult("disputeAllowance", "Dispute allowance")
            ],
            formula: calculators.calculateStripe,
            example: "A $100 Stripe card payment at 2.9% plus $0.30 has a $3.20 processing fee before optional international, conversion, or dispute allowance costs.",
            faq: [
                {
                    question: "Does this model international cards?",
                    answer: "Yes. Add the international card rate when the card is issued outside your domestic market."
                },
                {
                    question: "What is dispute allowance?",
                    answer: "It is an optional per-transaction reserve for expected dispute or chargeback cost."
                }
            ]
        },
        roas: {
            title: "Break-even ROAS Calculator",
            intro: "Calculate break-even ROAS and maximum ad spend per order before ecommerce ads lose money.",
            defaultPlatform: "tiktokShopUS",
            formulaName: "calculateBreakEvenRoas",
            fields: [
                moneyField("sellingPrice", "Selling price", 30),
                moneyField("cogs", "Product cost / COGS", 8),
                rateField("platformFeeRate", "Platform fee rate", 0.06),
                rateField("paymentFeeRate", "Payment fee rate", 0.03),
                moneyField("fixedPaymentFee", "Fixed payment fee", 0.3),
                moneyField("shippingCost", "Shipping cost", 3),
                moneyField("fulfillmentCost", "Fulfillment cost", 2),
                moneyField("packagingCost", "Packaging cost", 0.5),
                moneyField("otherCosts", "Other costs", 1)
            ],
            results: [
                moneyResult("breakEvenAdSpend", "Break-even ad spend"),
                decimalResult("breakEvenRoas", "Break-even ROAS"),
                moneyResult("nonAdCosts", "Non-ad costs"),
                moneyResult("platformFee", "Platform fee"),
                moneyResult("paymentFee", "Payment fee")
            ],
            formula: calculators.calculateBreakEvenRoas,
            example: "A $30 product with $8 COGS, 6% platform fee, 3% plus $0.30 payment fee, $3 shipping, $2 fulfillment, $0.50 packaging, and $1 other costs can spend up to the remaining contribution before ads lose money.",
            faq: [
                {
                    question: "What does break-even ROAS mean?",
                    answer: "It is revenue divided by the maximum ad spend per order before profit reaches zero."
                },
                {
                    question: "What if break-even ad spend is zero?",
                    answer: "The order is not profitable before ads under the entered cost assumptions."
                }
            ]
        },
        pricing: {
            title: "Product Pricing Calculator",
            intro: "Calculate the product selling price needed to hit a target profit margin after fixed costs and percentage fees.",
            defaultPlatform: "tiktokShopUS",
            formulaName: "calculateProductPricing",
            fields: [
                moneyField("cogs", "Product cost / COGS", 8),
                moneyField("shippingCost", "Shipping cost", 3),
                moneyField("fulfillmentCost", "Fulfillment cost", 2),
                moneyField("packagingCost", "Packaging cost", 0.5),
                moneyField("otherFixedCosts", "Other fixed costs", 1),
                rateField("platformFeeRate", "Platform fee rate", 0.06),
                rateField("paymentFeeRate", "Payment fee rate", 0.03),
                moneyField("fixedPaymentFee", "Fixed payment fee", 0.3),
                rateField("targetMargin", "Target margin", 0.25)
            ],
            results: [
                moneyResult("requiredPrice", "Required price"),
                moneyResult("fixedCosts", "Fixed costs"),
                percentResult("percentageCostRate", "Percentage cost rate"),
                decimalResult("denominator", "Denominator")
            ],
            formula: calculators.calculateProductPricing,
            example: "With $14.80 in fixed costs, 9% percentage fees, and a 25% target margin, the required selling price is fixed costs divided by 0.66.",
            faq: [
                {
                    question: "Why can required price show zero?",
                    answer: "If fees plus target margin are 100% or more, the target is not reachable with the entered rates."
                },
                {
                    question: "Should shipping be included?",
                    answer: "Include shipping when you pay it or when free shipping is built into your price."
                }
            ]
        }
    };
})(typeof window !== "undefined" ? window : this);
