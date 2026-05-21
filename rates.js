(function (root, factory) {
    var rates = factory();

    if (typeof module === "object" && module.exports) {
        module.exports = rates;
    }

    root.SellerRates = rates;
})(typeof self !== "undefined" ? self : this, function () {
    "use strict";

    return {
        ratesLastUpdated: "2026-05-21",
        defaultRegion: "US",
        regions: [
            {
                id: "US",
                name: "United States",
                currency: "USD",
                symbol: "$",
                status: "active"
            },
            {
                id: "UK",
                name: "United Kingdom",
                currency: "GBP",
                symbol: "£",
                status: "Coming soon"
            },
            {
                id: "CA",
                name: "Canada",
                currency: "CAD",
                symbol: "C$",
                status: "Coming soon"
            },
            {
                id: "AU",
                name: "Australia",
                currency: "AUD",
                symbol: "A$",
                status: "Coming soon"
            },
            {
                id: "EU",
                name: "European Union",
                currency: "EUR",
                symbol: "€",
                status: "Coming soon"
            },
            {
                id: "SEA",
                name: "Southeast Asia",
                currency: "USD",
                symbol: "$",
                status: "Use custom rates"
            }
        ],
        platforms: {
            tiktokShopUS: {
                regionId: "US",
                referralFeeRate: 0.06,
                newSellerPromoRate: 0.03,
                affiliateCommissionRate: 0,
                refundAllowanceRate: 0.02,
                sourceLabel: "TikTok Shop Seller University / Seller Center",
                sourceUrl: "https://seller-us.tiktok.com/university/essay?article_type=agreement&from=other&identity=1&knowledge_id=1331308753078058&role=1",
                notes: "Verify the final referral fee in TikTok Shop Seller Center before making business decisions."
            },
            etsyUS: {
                regionId: "US",
                listingFee: 0.2,
                transactionFeeRate: 0.065,
                paymentProcessingRate: 0.03,
                paymentProcessingFixedFee: 0.25,
                offsiteAdsLowVolumeRate: 0.15,
                offsiteAdsHighVolumeRate: 0.12,
                currencyConversionRate: 0.025,
                sourceLabel: "Etsy Help",
                sourceUrl: "https://help.etsy.com/hc/en-gb/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy"
            },
            shopifyUS: {
                regionId: "US",
                paymentProcessingRate: 0.029,
                paymentProcessingFixedFee: 0.3,
                returnAllowanceRate: 0.02,
                sourceLabel: "Shopify pricing context",
                sourceUrl: "https://www.shopify.com/pricing"
            },
            stripeUS: {
                regionId: "US",
                domesticCardRate: 0.029,
                domesticFixedFee: 0.3,
                internationalCardRate: 0.015,
                currencyConversionRate: 0.01,
                sourceLabel: "Stripe pricing",
                sourceUrl: "https://stripe.com/us/pricing"
            },
            paypalUS: {
                regionId: "US",
                checkoutRate: 0.0349,
                fixedFee: 0.49,
                crossBorderFeeRate: 0.015,
                currencyConversionRate: 0.03,
                sourceLabel: "PayPal business fees",
                sourceUrl: "https://www.paypal.com/business/paypal-business-fees"
            }
        }
    };
});
