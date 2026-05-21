# Seller Margin Tools V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ListingPilot AI demo dashboard with an English SEO-focused Seller Margin Tools static site, starting with a calculator-first homepage and a full TikTok Shop Fee Calculator page.

**Architecture:** Keep the first version as static HTML/CSS/JS with no backend, database, account system, or build step. Put fee rates in one browser-loadable config file, formulas in one UMD-style pure-function module that can also be required by Node tests, and page behavior in a small UI script that reads `data-calculator` attributes from static pages.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, PowerShell smoke tests, bundled or system Node.js for formula tests.

---

## Scope Check

This plan covers the first buildable site version described in the product and IA specs:

- Homepage with compact calculator snapshot.
- Full TikTok Shop Fee Calculator page.
- First batch calculator pages using the shared calculator template.
- Trust/legal pages.
- Centralized rate config.
- Formula tests and site smoke tests.

It intentionally excludes accounts, saved history, CSV import, payment subscriptions, AI features, server-side uploads, and platform integrations.

## File Structure

- `index.html`: Public homepage with top navigation, compact calculator snapshot, calculator directory, example fee table, trust sections, FAQ, and footer.
- `tiktok-shop-fee-calculator.html`: Primary SEO calculator page with full TikTok input form, result panel, breakdown, formula, example, sources, FAQ, and internal links.
- `etsy-fee-calculator.html`: Etsy calculator page using the shared calculator shell and Etsy inputs.
- `shopify-profit-calculator.html`: Shopify/DTC calculator page using the shared calculator shell and Shopify inputs.
- `paypal-fee-calculator.html`: PayPal calculator page using the shared calculator shell and PayPal inputs.
- `stripe-fee-calculator.html`: Stripe calculator page using the shared calculator shell and Stripe inputs.
- `break-even-roas-calculator.html`: Break-even ROAS calculator page using the shared calculator shell and ROAS inputs.
- `product-pricing-calculator.html`: Product pricing calculator page using the shared calculator shell and pricing inputs.
- `about.html`, `contact.html`, `privacy-policy.html`, `terms-of-use.html`, `affiliate-disclosure.html`, `disclaimer.html`: Trust/legal pages with shared header/footer.
- `rates.js`: Single source for default rates, regions, source links, currencies, and `ratesLastUpdated`.
- `calculator-core.js`: Pure formula functions and formatting helpers exposed as `SellerCalculators` in the browser and `module.exports` in tests.
- `calculator-pages.js`: Input schemas, result labels, examples, FAQs, source labels, and page-specific metadata for the calculator UI.
- `script.js`: UI initialization for homepage snapshot and calculator pages. Reads page data, handles region/rate changes, validates numeric inputs, and renders result panels.
- `styles.css`: Public utility-site styling, responsive layout, forms, result cards, breakdown tables, warnings, top nav, footer, and mobile behavior.
- `tests/formula-tests.cjs`: Node assertions for calculator formulas.
- `tests/formula-smoke.ps1`: Finds system or bundled Node and runs formula tests.
- `tests/site-smoke.ps1`: Static file smoke checks for pages, SEO structures, scripts, styles, and required page content.

## Task 1: Add Formula Tests First

**Files:**
- Create: `tests/formula-tests.cjs`
- Create: `tests/formula-smoke.ps1`
- Create later in this task: `calculator-core.js`

- [ ] **Step 1: Write failing formula tests**

Create `tests/formula-tests.cjs` with:

```js
const assert = require("node:assert/strict");
const calculators = require("../calculator-core.js");

function nearlyEqual(actual, expected, message) {
  assert.ok(Math.abs(actual - expected) < 0.000001, `${message}: expected ${expected}, got ${actual}`);
}

{
  const result = calculators.calculateTikTokShop({
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
    refundAllowanceRate: 0.02
  });

  nearlyEqual(result.grossRevenue, 30, "TikTok gross revenue");
  nearlyEqual(result.referralFee, 1.8, "TikTok referral fee");
  nearlyEqual(result.affiliateCommission, 3, "TikTok affiliate commission");
  nearlyEqual(result.refundAllowance, 0.6, "TikTok refund allowance");
  nearlyEqual(result.totalFees, 5.4, "TikTok total fees");
  nearlyEqual(result.totalCosts, 14.5, "TikTok total costs");
  nearlyEqual(result.profitBeforeAds, 10.1, "TikTok profit before ads");
  nearlyEqual(result.netProfit, 6.1, "TikTok net profit");
  nearlyEqual(result.profitMargin, 0.20333333333333334, "TikTok profit margin");
  nearlyEqual(result.maxAdSpendBeforeLoss, 10.1, "TikTok max ad spend");
}

{
  const result = calculators.calculateProductPricing({
    cogs: 8,
    shippingCost: 3,
    fulfillmentCost: 2,
    packagingCost: 0.5,
    otherFixedCosts: 1,
    platformFeeRate: 0.06,
    paymentFeeRate: 0.03,
    fixedPaymentFee: 0.3,
    targetMargin: 0.25
  });

  nearlyEqual(result.fixedCosts, 14.8, "Pricing fixed costs");
  nearlyEqual(result.percentageCostRate, 0.09, "Pricing percentage cost rate");
  nearlyEqual(result.requiredPrice, 22.424242424242426, "Required selling price");
  assert.equal(result.reachable, true);
}

{
  const result = calculators.calculateBreakEvenRoas({
    sellingPrice: 30,
    cogs: 8,
    platformFeeRate: 0.06,
    paymentFeeRate: 0.03,
    fixedPaymentFee: 0.3,
    shippingCost: 3,
    fulfillmentCost: 2,
    packagingCost: 0.5,
    otherCosts: 1
  });

  nearlyEqual(result.nonAdCosts, 17.5, "ROAS non-ad costs");
  nearlyEqual(result.breakEvenAdSpend, 12.5, "ROAS break-even ad spend");
  nearlyEqual(result.breakEvenRoas, 2.4, "ROAS break-even ROAS");
}

console.log("Formula tests passed.");
```

- [ ] **Step 2: Add the PowerShell formula test runner**

Create `tests/formula-smoke.ps1` with:

```powershell
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$testPath = Join-Path $PSScriptRoot "formula-tests.cjs"
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

$node = $null
if (Get-Command node -ErrorAction SilentlyContinue) {
    $node = (Get-Command node).Source
} elseif (Test-Path -LiteralPath $bundledNode) {
    $node = $bundledNode
}

if (-not $node) {
    throw "Node.js was not found. Install Node.js or use the Codex bundled runtime."
}

Push-Location $root
try {
    & $node $testPath
    if ($LASTEXITCODE -ne 0) {
        throw "Formula tests failed with exit code $LASTEXITCODE"
    }
} finally {
    Pop-Location
}
```

- [ ] **Step 3: Run the tests to verify they fail**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\formula-smoke.ps1
```

Expected: FAIL because `calculator-core.js` does not exist.

- [ ] **Step 4: Add the pure formula module**

Create `calculator-core.js` with:

```js
(function attachCalculatorCore(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SellerCalculators = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCalculatorCore() {
  function number(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function safeRate(value) {
    return number(value);
  }

  function ratio(numerator, denominator) {
    return denominator > 0 ? numerator / denominator : 0;
  }

  function money(value) {
    return Math.round((number(value) + Number.EPSILON) * 100) / 100;
  }

  function calculateTikTokShop(input) {
    const grossRevenue = number(input.itemPrice) + number(input.buyerPaidShipping) - number(input.sellerDiscount);
    const referralFee = grossRevenue * safeRate(input.referralFeeRate);
    const affiliateCommission = grossRevenue * safeRate(input.affiliateCommissionRate);
    const refundAllowance = grossRevenue * safeRate(input.refundAllowanceRate);
    const totalFees = referralFee + affiliateCommission + refundAllowance;
    const totalCosts = number(input.cogs) + number(input.fulfillmentCost) + number(input.shippingLabelCost) + number(input.packagingCost) + number(input.otherCosts);
    const profitBeforeAds = grossRevenue - totalFees - totalCosts;
    const netProfit = profitBeforeAds - number(input.adSpend);

    return {
      grossRevenue,
      referralFee,
      affiliateCommission,
      refundAllowance,
      totalFees,
      totalCosts,
      profitBeforeAds,
      profitAfterAds: netProfit,
      netProfit,
      profitMargin: ratio(netProfit, grossRevenue),
      roi: ratio(netProfit, number(input.cogs)),
      maxAdSpendBeforeLoss: profitBeforeAds,
      effectiveFeeRate: ratio(totalFees, grossRevenue)
    };
  }

  function calculateEtsy(input) {
    const orderTotal = number(input.itemPrice) + number(input.shippingCharged) - number(input.sellerDiscount);
    const listingFees = number(input.listingFee) * Math.max(1, number(input.quantitySold));
    const transactionFee = orderTotal * safeRate(input.transactionFeeRate);
    const paymentFee = orderTotal * safeRate(input.paymentProcessingRate) + number(input.paymentProcessingFixedFee);
    const offsiteAdsFee = input.offsiteAdsEnabled ? orderTotal * safeRate(input.offsiteAdsRate) : 0;
    const currencyConversionFee = input.currencyConversionEnabled ? orderTotal * safeRate(input.currencyConversionRate) : 0;
    const totalFees = listingFees + transactionFee + paymentFee + offsiteAdsFee + currencyConversionFee;
    const totalCosts = number(input.cogs) + number(input.shippingLabelCost) + number(input.packagingCost);
    const netProfit = orderTotal - totalFees - totalCosts;

    return {
      grossRevenue: orderTotal,
      listingFees,
      transactionFee,
      paymentFee,
      offsiteAdsFee,
      currencyConversionFee,
      totalFees,
      totalCosts,
      netProfit,
      profitMargin: ratio(netProfit, orderTotal),
      roi: ratio(netProfit, number(input.cogs))
    };
  }

  function calculateShopify(input) {
    const revenue = number(input.itemPrice) + number(input.shippingCharged) - number(input.discount);
    const paymentFee = revenue * safeRate(input.paymentProcessingRate) + number(input.paymentProcessingFixedFee);
    const returnAllowance = revenue * safeRate(input.returnAllowanceRate);
    const totalFees = paymentFee + returnAllowance;
    const totalCosts = number(input.cogs) + number(input.shippingLabelCost) + number(input.packagingCost) + number(input.appOrderCost);
    const netProfit = revenue - totalFees - totalCosts - number(input.adSpend);

    return {
      grossRevenue: revenue,
      paymentFee,
      returnAllowance,
      totalFees,
      totalCosts,
      netProfit,
      profitMargin: ratio(netProfit, revenue),
      roi: ratio(netProfit, number(input.cogs)),
      maxAdSpendBeforeLoss: revenue - totalFees - totalCosts
    };
  }

  function calculatePayPal(input) {
    const amount = number(input.transactionAmount);
    const baseFee = amount * safeRate(input.percentageFee) + number(input.fixedFee);
    const crossBorderFee = amount * safeRate(input.crossBorderFeeRate);
    const currencyConversionFee = amount * safeRate(input.currencyConversionRate);
    const totalFees = baseFee + crossBorderFee + currencyConversionFee;

    return {
      grossRevenue: amount,
      baseFee,
      crossBorderFee,
      currencyConversionFee,
      totalFees,
      netReceived: amount - totalFees
    };
  }

  function calculateStripe(input) {
    const amount = number(input.transactionAmount);
    const processingFee = amount * safeRate(input.percentageFee) + number(input.fixedFee);
    const internationalFee = amount * safeRate(input.internationalCardRate);
    const currencyConversionFee = amount * safeRate(input.currencyConversionRate);
    const disputeAllowance = amount * safeRate(input.disputeAllowanceRate);
    const totalFees = processingFee + internationalFee + currencyConversionFee + disputeAllowance;

    return {
      grossRevenue: amount,
      processingFee,
      internationalFee,
      currencyConversionFee,
      disputeAllowance,
      totalFees,
      netReceived: amount - totalFees
    };
  }

  function calculateBreakEvenRoas(input) {
    const revenue = number(input.sellingPrice);
    const platformFee = revenue * safeRate(input.platformFeeRate);
    const paymentFee = revenue * safeRate(input.paymentFeeRate) + number(input.fixedPaymentFee);
    const nonAdCosts = number(input.cogs) + platformFee + paymentFee + number(input.shippingCost) + number(input.fulfillmentCost) + number(input.packagingCost) + number(input.otherCosts);
    const breakEvenAdSpend = revenue - nonAdCosts;

    return {
      grossRevenue: revenue,
      platformFee,
      paymentFee,
      nonAdCosts,
      breakEvenAdSpend,
      breakEvenRoas: breakEvenAdSpend > 0 ? revenue / breakEvenAdSpend : 0,
      profitableBeforeAds: breakEvenAdSpend > 0
    };
  }

  function calculateProductPricing(input) {
    const fixedCosts = number(input.cogs) + number(input.shippingCost) + number(input.fulfillmentCost) + number(input.packagingCost) + number(input.otherFixedCosts) + number(input.fixedPaymentFee);
    const percentageCostRate = safeRate(input.platformFeeRate) + safeRate(input.paymentFeeRate);
    const denominator = 1 - percentageCostRate - safeRate(input.targetMargin);
    const reachable = denominator > 0;

    return {
      fixedCosts,
      percentageCostRate,
      denominator,
      reachable,
      requiredPrice: reachable ? fixedCosts / denominator : 0
    };
  }

  return {
    money,
    calculateTikTokShop,
    calculateEtsy,
    calculateShopify,
    calculatePayPal,
    calculateStripe,
    calculateBreakEvenRoas,
    calculateProductPricing
  };
});
```

- [ ] **Step 5: Run formula tests to verify they pass**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\formula-smoke.ps1
```

Expected: PASS with `Formula tests passed.`

- [ ] **Step 6: Commit formula core if Git is available**

Run:

```powershell
git add calculator-core.js tests/formula-tests.cjs tests/formula-smoke.ps1
git commit -m "feat: add seller calculator formulas"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record these files in the task handoff and continue without committing.

## Task 2: Add Centralized Rate Configuration

**Files:**
- Create: `rates.js`
- Modify: `tests/site-smoke.ps1`

- [ ] **Step 1: Extend smoke test for rate config**

Replace the beginning file-existence section of `tests/site-smoke.ps1` with checks for the shared modules:

```powershell
$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$stylesPath = Join-Path $root "styles.css"
$scriptPath = Join-Path $root "script.js"
$corePath = Join-Path $root "calculator-core.js"
$ratesPath = Join-Path $root "rates.js"

Assert-FileExists $indexPath
Assert-FileExists $stylesPath
Assert-FileExists $scriptPath
Assert-FileExists $corePath
Assert-FileExists $ratesPath
```

Add these required JS checks:

```powershell
$rates = Get-Content -LiteralPath $ratesPath -Raw -Encoding UTF8

$requiredRates = @(
    "ratesLastUpdated",
    "United States",
    "tiktokShopUS",
    "etsyUS",
    "stripeUS",
    "paypalUS",
    "sourceUrl",
    "Coming soon",
    "Use custom rates"
)

foreach ($item in $requiredRates) {
    Assert-Contains $rates $item
}
```

- [ ] **Step 2: Run smoke test to verify it fails**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\site-smoke.ps1
```

Expected: FAIL because `rates.js` does not exist.

- [ ] **Step 3: Create the rate config**

Create `rates.js` with:

```js
(function attachRates(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SellerRates = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRates() {
  return {
    ratesLastUpdated: "2026-05-21",
    defaultRegion: "US",
    regions: [
      { id: "US", name: "United States", currency: "USD", symbol: "$", status: "active" },
      { id: "UK", name: "United Kingdom", currency: "GBP", symbol: "£", status: "Coming soon" },
      { id: "CA", name: "Canada", currency: "CAD", symbol: "C$", status: "Coming soon" },
      { id: "AU", name: "Australia", currency: "AUD", symbol: "A$", status: "Coming soon" },
      { id: "EU", name: "European Union", currency: "EUR", symbol: "€", status: "Coming soon" },
      { id: "SEA", name: "Southeast Asia", currency: "USD", symbol: "$", status: "Use custom rates" }
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
```

- [ ] **Step 4: Run the site smoke test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\site-smoke.ps1
```

Expected: PASS for rate config checks, or FAIL only on old dashboard assertions that will be replaced in Task 7.

- [ ] **Step 5: Commit rate config if Git is available**

Run:

```powershell
git add rates.js tests/site-smoke.ps1
git commit -m "feat: add seller fee rate config"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record these files in the task handoff and continue without committing.

## Task 3: Replace Dashboard HTML With Public Homepage

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write the homepage shell**

Replace `index.html` with this structure:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Seller Fee Calculators for Ecommerce Profit Margins | Seller Margin Tools</title>
    <meta name="description" content="Calculate real ecommerce seller profit after marketplace fees, payment fees, shipping, ads, commissions, and product costs.">
    <link rel="stylesheet" href="styles.css">
</head>
<body data-page="home">
    <header class="site-header">
        <a class="brand" href="index.html" aria-label="Seller Margin Tools home">
            <span class="brand-mark">SM</span>
            <span>
                <strong>Seller Margin Tools</strong>
                <small>Fee calculators for ecommerce sellers</small>
            </span>
        </a>
        <button class="menu-button" type="button" data-action="toggle-menu" aria-expanded="false" aria-controls="siteNav">Menu</button>
        <nav class="site-nav" id="siteNav" aria-label="Primary navigation">
            <a href="tiktok-shop-fee-calculator.html">TikTok Shop</a>
            <a href="etsy-fee-calculator.html">Etsy</a>
            <a href="shopify-profit-calculator.html">Shopify</a>
            <a href="break-even-roas-calculator.html">ROAS</a>
            <a href="about.html">About</a>
            <label class="region-control">
                <span>Region</span>
                <select data-region-select aria-label="Default rate region"></select>
            </label>
        </nav>
    </header>

    <main>
        <section class="hero-calculator">
            <div class="hero-copy">
                <p class="eyebrow">United States default · Rates editable</p>
                <h1>Seller Fee Calculators for Ecommerce Profit Margins</h1>
                <p>Calculate real seller profit after marketplace fees, payment fees, shipping, ads, commissions, and product costs.</p>
                <div class="trust-strip" data-rate-meta>Last updated May 21, 2026</div>
            </div>

            <form class="calculator-card compact-calculator" data-home-calculator>
                <div class="section-heading">
                    <h2>Quick margin snapshot</h2>
                    <p>Default calculator: TikTok Shop US</p>
                </div>
                <div class="field-grid">
                    <label><span>Item price</span><input name="itemPrice" type="number" step="0.01" value="30"></label>
                    <label><span>Buyer-paid shipping</span><input name="buyerPaidShipping" type="number" step="0.01" value="0"></label>
                    <label><span>Seller discount</span><input name="sellerDiscount" type="number" step="0.01" value="0"></label>
                    <label><span>COGS</span><input name="cogs" type="number" step="0.01" value="8"></label>
                    <label><span>Marketplace fee rate</span><input name="referralFeeRate" type="number" step="0.001" value="0.06" data-rate-field></label>
                    <label><span>Affiliate commission</span><input name="affiliateCommissionRate" type="number" step="0.001" value="0.10"></label>
                    <label><span>Shipping / fulfillment</span><input name="combinedShippingCost" type="number" step="0.01" value="5"></label>
                    <label><span>Ad spend per order</span><input name="adSpend" type="number" step="0.01" value="4"></label>
                </div>
            </form>

            <aside class="result-card" data-home-results aria-live="polite">
                <p class="eyebrow">Estimated result</p>
                <strong class="result-primary">$0.00</strong>
                <span>Net profit</span>
                <dl class="metric-list">
                    <div><dt>Margin</dt><dd data-result="profitMargin">0%</dd></div>
                    <div><dt>Total fees</dt><dd data-result="totalFees">$0.00</dd></div>
                    <div><dt>Max ad spend</dt><dd data-result="maxAdSpendBeforeLoss">$0.00</dd></div>
                </dl>
                <a class="primary-link" href="tiktok-shop-fee-calculator.html">Open full TikTok Shop calculator</a>
            </aside>
        </section>

        <section class="content-section">
            <div class="section-heading">
                <p class="eyebrow">Calculator hub</p>
                <h2>Choose a seller margin calculator</h2>
            </div>
            <div class="tool-grid">
                <a class="tool-card" href="tiktok-shop-fee-calculator.html"><strong>TikTok Shop Fee Calculator</strong><span>Referral fees, creator commission, ads, shipping, COGS.</span></a>
                <a class="tool-card" href="etsy-fee-calculator.html"><strong>Etsy Fee Calculator</strong><span>Listing, transaction, payment, Offsite Ads, shipping.</span></a>
                <a class="tool-card" href="shopify-profit-calculator.html"><strong>Shopify Profit Calculator</strong><span>DTC profit after processing, shipping, packaging, and ads.</span></a>
                <a class="tool-card" href="paypal-fee-calculator.html"><strong>PayPal Fee Calculator</strong><span>Estimate PayPal fees and net received.</span></a>
                <a class="tool-card" href="stripe-fee-calculator.html"><strong>Stripe Fee Calculator</strong><span>Estimate Stripe processing fees and net received.</span></a>
                <a class="tool-card" href="break-even-roas-calculator.html"><strong>Break-even ROAS Calculator</strong><span>Find the ROAS you need before ads lose money.</span></a>
                <a class="tool-card" href="product-pricing-calculator.html"><strong>Product Pricing Calculator</strong><span>Set a selling price for your target margin.</span></a>
            </div>
        </section>

        <section class="content-section split-section">
            <div>
                <p class="eyebrow">Hidden fee example</p>
                <h2>A $30 sale can become a much smaller profit</h2>
                <p>Platform fees are only one part of seller margin. Ads, affiliate commission, fulfillment, shipping labels, packaging, returns, and COGS can change the result fast.</p>
            </div>
            <table class="breakdown-table">
                <tbody>
                    <tr><th>Sale price</th><td>$30.00</td></tr>
                    <tr><th>Referral fee</th><td>-$1.80</td></tr>
                    <tr><th>Creator commission</th><td>-$3.00</td></tr>
                    <tr><th>COGS and shipping</th><td>-$13.00</td></tr>
                    <tr><th>Ad spend</th><td>-$4.00</td></tr>
                    <tr><th>Estimated net profit</th><td>$8.20</td></tr>
                </tbody>
            </table>
        </section>

        <section class="content-section">
            <h2>Built for sellers who need transparent math</h2>
            <p>Each calculator shows editable rates, formulas, examples, source links, and update dates. These tools estimate profit and fees; they are not tax, legal, accounting, or platform policy advice.</p>
        </section>
    </main>

    <footer class="site-footer">
        <div>
            <strong>Seller Margin Tools</strong>
            <p>Calculate real seller profit before fees surprise you.</p>
        </div>
        <nav aria-label="Footer navigation">
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="privacy-policy.html">Privacy</a>
            <a href="terms-of-use.html">Terms</a>
            <a href="affiliate-disclosure.html">Affiliate Disclosure</a>
            <a href="disclaimer.html">Disclaimer</a>
        </nav>
    </footer>

    <script src="rates.js"></script>
    <script src="calculator-core.js"></script>
    <script src="calculator-pages.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Run site smoke test and note expected failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\site-smoke.ps1
```

Expected: FAIL because smoke tests still assert old ListingPilot dashboard strings. Task 7 will replace those assertions.

- [ ] **Step 3: Commit homepage shell if Git is available**

Run:

```powershell
git add index.html
git commit -m "feat: replace demo dashboard with calculator homepage"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record `index.html` in the task handoff and continue without committing.

## Task 4: Add Calculator Page Data and Static Calculator Pages

**Files:**
- Create: `calculator-pages.js`
- Create: `tiktok-shop-fee-calculator.html`
- Create: `etsy-fee-calculator.html`
- Create: `shopify-profit-calculator.html`
- Create: `paypal-fee-calculator.html`
- Create: `stripe-fee-calculator.html`
- Create: `break-even-roas-calculator.html`
- Create: `product-pricing-calculator.html`

- [ ] **Step 1: Create page data module**

Create `calculator-pages.js` with:

```js
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
      ["affiliateCommission", "Creator commission cost", "money"],
      ["profitBeforeAds", "Profit before ads", "money"],
      ["profitAfterAds", "Profit after ads", "money"],
      ["maxAdSpendBeforeLoss", "Max ad spend before loss", "money"],
      ["effectiveFeeRate", "Effective fee rate", "percent"]
    ],
    formula: "Net profit = fee base - referral fee - affiliate commission - ad spend - fulfillment - shipping label - packaging - COGS - other costs - refund allowance.",
    example: "$30 item price, 6% referral fee, 10% affiliate commission, $8 COGS, $5 shipping and fulfillment, and $4 ad spend leaves an estimated $6.10 net profit.",
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
    faq: [["Why are Etsy payment rates editable?", "Etsy payment processing rates vary by country, so the calculator keeps the rate editable."]]
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
    faq: [["Does this include monthly Shopify plan cost?", "No. This calculator estimates per-order profit, not store-level monthly overhead."]]
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
    faq: [["Why does my PayPal account show a different fee?", "PayPal fee schedules vary by product, account, country, and transaction type."]]
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
    faq: [["Does this include Stripe disputes?", "The dispute allowance field is optional and estimates risk per order, not an official Stripe fee."]]
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
    faq: [["What ROAS should I target?", "Break-even ROAS is the minimum. Sellers usually need higher ROAS to cover overhead and profit goals."]]
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
    faq: [["Why did the calculator say the margin is unreachable?", "The target margin plus percentage fees leaves no room to cover fixed costs."]]
  }
};
```

- [ ] **Step 2: Create the TikTok calculator page**

Create `tiktok-shop-fee-calculator.html` with:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TikTok Shop Fee Calculator | Seller Margin Tools</title>
    <meta name="description" content="Calculate TikTok Shop seller profit after referral fees, creator commission, ads, fulfillment, shipping, COGS, packaging, and returns.">
    <link rel="stylesheet" href="styles.css">
</head>
<body data-page="calculator" data-calculator="tiktok">
    <div data-shared-header></div>
    <main class="calculator-page">
        <section class="calculator-hero">
            <div>
                <p class="eyebrow">United States default · Rates editable</p>
                <h1 data-calculator-title>TikTok Shop Fee Calculator</h1>
                <p data-calculator-intro></p>
                <div class="trust-strip" data-rate-meta></div>
            </div>
        </section>
        <section class="calculator-layout">
            <form class="calculator-card" data-calculator-form></form>
            <aside class="result-card full-results" data-calculator-results aria-live="polite"></aside>
        </section>
        <section class="content-section">
            <h2>Fee breakdown</h2>
            <table class="breakdown-table" data-breakdown-table></table>
        </section>
        <section class="content-section">
            <h2>Formula</h2>
            <p data-formula-copy></p>
        </section>
        <section class="content-section">
            <h2>Example calculation</h2>
            <p data-example-copy></p>
        </section>
        <section class="content-section">
            <h2>Fee sources</h2>
            <p data-source-copy></p>
        </section>
        <section class="content-section">
            <h2>FAQ</h2>
            <div data-faq-list></div>
        </section>
        <section class="content-section related-links">
            <h2>Related calculators</h2>
            <a href="break-even-roas-calculator.html">Break-even ROAS Calculator</a>
            <a href="product-pricing-calculator.html">Product Pricing Calculator</a>
            <a href="shopify-profit-calculator.html">Shopify Profit Calculator</a>
            <a href="stripe-fee-calculator.html">Stripe Fee Calculator</a>
        </section>
    </main>
    <div data-shared-footer></div>
    <script src="rates.js"></script>
    <script src="calculator-core.js"></script>
    <script src="calculator-pages.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create the remaining calculator page shells**

Create the six remaining calculator HTML files with the same structural body used by `tiktok-shop-fee-calculator.html`: shared header placeholder, `main.calculator-page`, `section.calculator-hero`, `section.calculator-layout`, fee breakdown, formula, example, fee sources, FAQ, related links, shared footer placeholder, and these script tags in order:

```html
<script src="rates.js"></script>
<script src="calculator-core.js"></script>
<script src="calculator-pages.js"></script>
<script src="script.js"></script>
```

Use these exact per-file values:

| File | Title | Meta description | Body attribute |
| --- | --- | --- | --- |
| `etsy-fee-calculator.html` | `Etsy Fee Calculator | Seller Margin Tools` | `Calculate Etsy seller profit after listing fees, transaction fees, payment processing, Offsite Ads, shipping, packaging, and product cost.` | `<body data-page="calculator" data-calculator="etsy">` |
| `shopify-profit-calculator.html` | `Shopify Profit Calculator | Seller Margin Tools` | `Calculate Shopify or DTC order profit after product cost, payment processing, shipping, packaging, app costs, returns, and ads.` | `<body data-page="calculator" data-calculator="shopify">` |
| `paypal-fee-calculator.html` | `PayPal Fee Calculator | Seller Margin Tools` | `Estimate PayPal transaction fees and net received after percentage fees, fixed fees, cross-border fees, and currency conversion.` | `<body data-page="calculator" data-calculator="paypal">` |
| `stripe-fee-calculator.html` | `Stripe Fee Calculator | Seller Margin Tools` | `Estimate Stripe processing fees and net received after card processing, international card fees, currency conversion, and dispute allowance.` | `<body data-page="calculator" data-calculator="stripe">` |
| `break-even-roas-calculator.html` | `Break-even ROAS Calculator | Seller Margin Tools` | `Calculate break-even ROAS and maximum ad spend per order before ecommerce ads lose money.` | `<body data-page="calculator" data-calculator="roas">` |
| `product-pricing-calculator.html` | `Product Pricing Calculator | Seller Margin Tools` | `Calculate the product selling price needed to hit a target profit margin after fixed costs and percentage fees.` | `<body data-page="calculator" data-calculator="pricing">` |

For each page, use this related-links block so users can move between the first-batch tools:

```html
<section class="content-section related-links">
    <h2>Related calculators</h2>
    <a href="tiktok-shop-fee-calculator.html">TikTok Shop Fee Calculator</a>
    <a href="etsy-fee-calculator.html">Etsy Fee Calculator</a>
    <a href="shopify-profit-calculator.html">Shopify Profit Calculator</a>
    <a href="paypal-fee-calculator.html">PayPal Fee Calculator</a>
    <a href="stripe-fee-calculator.html">Stripe Fee Calculator</a>
    <a href="break-even-roas-calculator.html">Break-even ROAS Calculator</a>
    <a href="product-pricing-calculator.html">Product Pricing Calculator</a>
</section>
```

- [ ] **Step 4: Commit calculator shells if Git is available**

Run:

```powershell
git add calculator-pages.js tiktok-shop-fee-calculator.html etsy-fee-calculator.html shopify-profit-calculator.html paypal-fee-calculator.html stripe-fee-calculator.html break-even-roas-calculator.html product-pricing-calculator.html
git commit -m "feat: add calculator page shells"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record these files in the task handoff and continue without committing.

## Task 5: Implement Shared UI Behavior

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Replace dashboard JavaScript with calculator UI code**

Replace `script.js` with:

```js
const rates = window.SellerRates;
const calculators = window.SellerCalculators;
const pageData = window.SellerCalculatorPages || {};

function getRegion(regionId = rates.defaultRegion) {
  return rates.regions.find((region) => region.id === regionId) || rates.regions[0];
}

function formatMoney(value, region = getRegion()) {
  return `${region.symbol}${calculators.money(value).toFixed(2)}`;
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

function formatValue(value, type, region) {
  if (type === "money") return formatMoney(value, region);
  if (type === "percent") return formatPercent(value);
  if (type === "number") return Number(value || 0).toFixed(2);
  return String(value ?? "");
}

function headerHtml() {
  return `
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Seller Margin Tools home">
        <span class="brand-mark">SM</span>
        <span><strong>Seller Margin Tools</strong><small>Fee calculators for ecommerce sellers</small></span>
      </a>
      <button class="menu-button" type="button" data-action="toggle-menu" aria-expanded="false" aria-controls="siteNav">Menu</button>
      <nav class="site-nav" id="siteNav" aria-label="Primary navigation">
        <a href="tiktok-shop-fee-calculator.html">TikTok Shop</a>
        <a href="etsy-fee-calculator.html">Etsy</a>
        <a href="shopify-profit-calculator.html">Shopify</a>
        <a href="break-even-roas-calculator.html">ROAS</a>
        <a href="about.html">About</a>
        <label class="region-control"><span>Region</span><select data-region-select aria-label="Default rate region"></select></label>
      </nav>
    </header>
  `;
}

function footerHtml() {
  return `
    <footer class="site-footer">
      <div><strong>Seller Margin Tools</strong><p>Calculate real seller profit before fees surprise you.</p></div>
      <nav aria-label="Footer navigation">
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="privacy-policy.html">Privacy</a>
        <a href="terms-of-use.html">Terms</a>
        <a href="affiliate-disclosure.html">Affiliate Disclosure</a>
        <a href="disclaimer.html">Disclaimer</a>
      </nav>
    </footer>
  `;
}

function hydrateSharedLayout() {
  document.querySelectorAll("[data-shared-header]").forEach((target) => {
    target.outerHTML = headerHtml();
  });
  document.querySelectorAll("[data-shared-footer]").forEach((target) => {
    target.outerHTML = footerHtml();
  });
}

function hydrateRegionSelectors() {
  document.querySelectorAll("[data-region-select]").forEach((select) => {
    select.innerHTML = rates.regions.map((region) => {
      const suffix = region.status === "active" ? "" : ` (${region.status})`;
      return `<option value="${region.id}">${region.name}${suffix}</option>`;
    }).join("");
    select.value = rates.defaultRegion;
  });
}

function readForm(form) {
  const data = {};
  form.querySelectorAll("input").forEach((input) => {
    data[input.name] = input.type === "checkbox" ? input.checked : Number(input.value);
  });
  return data;
}

function updateRateMeta(platformKey) {
  const platform = rates.platforms[platformKey] || rates.platforms.tiktokShopUS;
  const region = getRegion(platform.regionId);
  document.querySelectorAll("[data-rate-meta]").forEach((target) => {
    target.innerHTML = `${region.name} defaults · Rates editable · Last updated ${rates.ratesLastUpdated} · <a href="${platform.sourceUrl}" rel="nofollow">Source: ${platform.sourceLabel}</a>`;
  });
}

function renderHomeCalculator() {
  const form = document.querySelector("[data-home-calculator]");
  const resultCard = document.querySelector("[data-home-results]");
  if (!form || !resultCard) return;

  function calculate() {
    const values = readForm(form);
    const combinedShipping = Number(values.combinedShippingCost || 0);
    const result = calculators.calculateTikTokShop({
      ...values,
      fulfillmentCost: combinedShipping,
      shippingLabelCost: 0,
      packagingCost: 0,
      otherCosts: 0,
      refundAllowanceRate: 0
    });
    const region = getRegion();
    resultCard.querySelector(".result-primary").textContent = formatMoney(result.netProfit, region);
    resultCard.querySelector("[data-result='profitMargin']").textContent = formatPercent(result.profitMargin);
    resultCard.querySelector("[data-result='totalFees']").textContent = formatMoney(result.totalFees, region);
    resultCard.querySelector("[data-result='maxAdSpendBeforeLoss']").textContent = formatMoney(result.maxAdSpendBeforeLoss, region);
  }

  form.addEventListener("input", calculate);
  calculate();
  updateRateMeta("tiktokShopUS");
}

function renderCalculatorPage() {
  const calculatorId = document.body.dataset.calculator;
  const config = pageData[calculatorId];
  if (!config) return;

  const form = document.querySelector("[data-calculator-form]");
  const results = document.querySelector("[data-calculator-results]");
  const region = getRegion();

  document.querySelector("[data-calculator-title]").textContent = config.title;
  document.querySelector("[data-calculator-intro]").textContent = config.intro;
  document.querySelector("[data-formula-copy]").textContent = config.formula;
  document.querySelector("[data-example-copy]").textContent = config.example;
  updateRateMeta(config.defaultPlatform);

  const platform = rates.platforms[config.defaultPlatform];
  document.querySelector("[data-source-copy]").innerHTML = `<a href="${platform.sourceUrl}" rel="nofollow">${platform.sourceLabel}</a>. ${platform.notes || "Verify rates in your own seller or payment account before making decisions."}`;

  form.innerHTML = `
    <div class="section-heading"><h2>${config.title}</h2><p>Adjust any default rate or cost to match your order.</p></div>
    <div class="field-grid">
      ${config.fields.map(([name, label, value, type]) => {
        if (type === "checkbox") {
          return `<label class="checkbox-field"><input name="${name}" type="checkbox" ${value ? "checked" : ""}><span>${label}</span></label>`;
        }
        return `<label><span>${label}</span><input name="${name}" type="number" step="0.001" value="${value}"></label>`;
      }).join("")}
    </div>
  `;

  const faq = document.querySelector("[data-faq-list]");
  faq.innerHTML = config.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");

  function calculate() {
    const values = readForm(form);
    const result = calculators[config.formulaName](values);
    const primary = config.results[0];
    results.innerHTML = `
      <p class="eyebrow">Estimated result</p>
      <strong class="result-primary">${formatValue(result[primary[0]], primary[2], region)}</strong>
      <span>${primary[1]}</span>
      <dl class="metric-list">
        ${config.results.slice(1).map(([key, label, type]) => `<div><dt>${label}</dt><dd>${formatValue(result[key], type, region)}</dd></div>`).join("")}
      </dl>
      ${result.profitableBeforeAds === false ? `<p class="warning">This product is not profitable before ad spend.</p>` : ""}
    `;
    document.querySelector("[data-breakdown-table]").innerHTML = `
      <tbody>
        ${config.results.map(([key, label, type]) => `<tr><th>${label}</th><td>${formatValue(result[key], type, region)}</td></tr>`).join("")}
      </tbody>
    `;
  }

  form.addEventListener("input", calculate);
  calculate();
}

function bindMenu() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='toggle-menu']");
    if (!button) return;
    const nav = document.getElementById("siteNav");
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
  });
}

hydrateSharedLayout();
hydrateRegionSelectors();
bindMenu();
renderHomeCalculator();
renderCalculatorPage();
```

- [ ] **Step 2: Run formula tests**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\formula-smoke.ps1
```

Expected: PASS with `Formula tests passed.`

- [ ] **Step 3: Commit UI behavior if Git is available**

Run:

```powershell
git add script.js
git commit -m "feat: render seller calculator UI"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record `script.js` in the task handoff and continue without committing.

## Task 6: Replace Dashboard CSS With Utility Site Styling

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Replace CSS with public site styles**

Replace `styles.css` with:

```css
:root {
    color-scheme: light;
    --bg: #f6f8f7;
    --surface: #ffffff;
    --surface-soft: #eef6f4;
    --ink: #172322;
    --muted: #64716f;
    --line: #dce7e4;
    --teal: #0b8f85;
    --teal-dark: #086d66;
    --amber: #e7a940;
    --red: #b42318;
    --blue: #2563eb;
    --shadow: 0 18px 44px rgba(25, 43, 40, 0.08);
}

* { box-sizing: border-box; }

body {
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(180deg, #fbfcfb, var(--bg));
    color: var(--ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    letter-spacing: 0;
}

a { color: inherit; }
button, input, select { font: inherit; }
button { cursor: pointer; }

.site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    min-height: 72px;
    padding: 14px clamp(16px, 4vw, 40px);
    border-bottom: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(18px);
}

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--ink);
    text-decoration: none;
}

.brand-mark {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: var(--ink);
    color: white;
    font-weight: 900;
}

.brand strong, .brand small { display: block; }
.brand small { margin-top: 2px; color: var(--muted); font-size: 12px; }

.site-nav {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--muted);
    font-size: 14px;
    font-weight: 700;
}

.site-nav a {
    text-decoration: none;
}

.site-nav a:hover { color: var(--teal-dark); }

.menu-button { display: none; }

.region-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.region-control span {
    font-size: 12px;
    text-transform: uppercase;
}

select, input {
    width: 100%;
    min-height: 42px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
    color: var(--ink);
    padding: 10px 12px;
}

main {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 28px 0 48px;
}

.hero-calculator, .calculator-layout, .split-section {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr) minmax(280px, 0.75fr);
    gap: 18px;
    align-items: start;
}

.calculator-layout {
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.7fr);
}

.split-section {
    grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1fr);
}

.calculator-hero, .content-section {
    margin-top: 24px;
}

.eyebrow {
    margin: 0 0 8px;
    color: var(--teal-dark);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
}

h1, h2, h3, p { margin-top: 0; }
h1 { margin-bottom: 12px; font-size: clamp(34px, 5vw, 58px); line-height: 1.02; }
h2 { margin-bottom: 10px; font-size: 24px; line-height: 1.15; }
p { color: var(--muted); line-height: 1.55; }

.trust-strip {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 10px;
    border: 1px solid rgba(11, 143, 133, 0.2);
    border-radius: 8px;
    background: var(--surface-soft);
    color: var(--teal-dark);
    font-size: 13px;
    font-weight: 800;
}

.trust-strip a { color: var(--teal-dark); }

.calculator-card, .result-card, .tool-card, .content-section {
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface);
    box-shadow: var(--shadow);
}

.calculator-card, .result-card, .content-section { padding: 18px; }

.field-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

label {
    display: grid;
    gap: 7px;
    color: var(--muted);
    font-size: 13px;
    font-weight: 800;
}

.checkbox-field {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 42px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
}

.checkbox-field input {
    width: 18px;
    min-height: 18px;
}

.result-primary {
    display: block;
    margin-bottom: 2px;
    color: var(--ink);
    font-size: 42px;
    line-height: 1;
}

.metric-list {
    display: grid;
    gap: 10px;
    margin: 18px 0;
}

.metric-list div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line);
}

.metric-list dt { color: var(--muted); }
.metric-list dd { margin: 0; font-weight: 900; }

.primary-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--teal);
    color: white;
    font-weight: 900;
    text-decoration: none;
}

.tool-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.tool-card {
    display: grid;
    gap: 8px;
    min-height: 132px;
    padding: 16px;
    text-decoration: none;
}

.tool-card span {
    color: var(--muted);
    line-height: 1.45;
}

.breakdown-table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
}

.breakdown-table th, .breakdown-table td {
    padding: 12px;
    border-bottom: 1px solid var(--line);
    text-align: left;
}

.breakdown-table td {
    text-align: right;
    font-weight: 900;
}

.warning {
    padding: 10px 12px;
    border: 1px solid rgba(180, 35, 24, 0.22);
    border-radius: 8px;
    background: #fff3f0;
    color: var(--red);
    font-weight: 800;
}

details {
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
}

summary {
    cursor: pointer;
    font-weight: 900;
}

.related-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.related-links h2 {
    flex-basis: 100%;
}

.related-links a {
    padding: 9px 10px;
    border: 1px solid var(--line);
    border-radius: 8px;
    color: var(--teal-dark);
    font-weight: 800;
    text-decoration: none;
}

.site-footer {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 28px clamp(16px, 4vw, 40px);
    border-top: 1px solid var(--line);
    background: white;
}

.site-footer nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.site-footer a {
    color: var(--muted);
    text-decoration: none;
}

@media (max-width: 980px) {
    .hero-calculator, .calculator-layout, .split-section {
        grid-template-columns: 1fr;
    }

    .tool-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 760px) {
    .site-header {
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .menu-button {
        display: inline-flex;
        min-height: 40px;
        padding: 9px 12px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: white;
        font-weight: 900;
    }

    .site-nav {
        display: none;
        flex-basis: 100%;
        align-items: stretch;
        flex-direction: column;
    }

    .site-nav.open {
        display: flex;
    }

    main {
        width: min(100% - 24px, 1180px);
        padding-top: 18px;
    }

    .field-grid, .tool-grid {
        grid-template-columns: 1fr;
    }

    .result-primary {
        font-size: 36px;
    }

    .site-footer {
        flex-direction: column;
    }
}
```

- [ ] **Step 2: Manually inspect color use**

Run:

```powershell
Select-String -Path styles.css -Pattern "#|teal|green|purple|gradient|orb"
```

Expected: Palette uses neutral backgrounds with teal accents and no purple/orb decorative theme.

- [ ] **Step 3: Commit styling if Git is available**

Run:

```powershell
git add styles.css
git commit -m "style: add seller utility site layout"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record `styles.css` in the task handoff and continue without committing.

## Task 7: Add Trust and Legal Pages

**Files:**
- Create: `about.html`
- Create: `contact.html`
- Create: `privacy-policy.html`
- Create: `terms-of-use.html`
- Create: `affiliate-disclosure.html`
- Create: `disclaimer.html`

- [ ] **Step 1: Create static legal page template content**

Use this complete structure for each page, changing the `<title>`, `<meta name="description">`, `<h1>`, and body paragraphs:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About | Seller Margin Tools</title>
    <meta name="description" content="Learn about Seller Margin Tools, a calculator hub for ecommerce seller fees and profit margins.">
    <link rel="stylesheet" href="styles.css">
</head>
<body data-page="content">
    <div data-shared-header></div>
    <main>
        <article class="content-section">
            <p class="eyebrow">Seller Margin Tools</p>
            <h1>About</h1>
            <p>Seller Margin Tools helps ecommerce sellers estimate marketplace fees, payment fees, shipping costs, ad spend, and order-level profit before they list or source a product.</p>
            <p>The calculators are built for practical planning. Default rates are editable, formulas are shown in plain English, and sellers should verify final rates in their own seller or payment accounts.</p>
        </article>
    </main>
    <div data-shared-footer></div>
    <script src="rates.js"></script>
    <script src="calculator-core.js"></script>
    <script src="calculator-pages.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

Create the other pages with these H1/body requirements:

- `contact.html`: H1 `Contact`; include `For questions, corrections, or fee source updates, contact the site owner at hello@example.com.`.
- `privacy-policy.html`: H1 `Privacy Policy`; state that the static calculator runs in the browser and does not require an account for basic use.
- `terms-of-use.html`: H1 `Terms of Use`; state that tools are provided for informational estimates and users remain responsible for business decisions.
- `affiliate-disclosure.html`: H1 `Affiliate Disclosure`; state that future pages may include affiliate links and that recommendations should remain relevant to seller workflows.
- `disclaimer.html`: H1 `Disclaimer`; state that the site is not tax, legal, accounting, financial, or platform policy advice.

- [ ] **Step 2: Commit trust pages if Git is available**

Run:

```powershell
git add about.html contact.html privacy-policy.html terms-of-use.html affiliate-disclosure.html disclaimer.html
git commit -m "feat: add seller site trust pages"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record these files in the task handoff and continue without committing.

## Task 8: Replace Smoke Tests for the New Site

**Files:**
- Modify: `tests/site-smoke.ps1`

- [ ] **Step 1: Replace old dashboard assertions**

Replace `tests/site-smoke.ps1` with:

```powershell
$ErrorActionPreference = "Stop"

function Assert-FileExists($Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Expected file to exist: $Path"
    }
}

function Assert-Contains($Content, $Needle) {
    if ($Content -notmatch [regex]::Escape($Needle)) {
        throw "Expected content to contain: $Needle"
    }
}

$root = Split-Path -Parent $PSScriptRoot

$requiredFiles = @(
    "index.html",
    "styles.css",
    "script.js",
    "rates.js",
    "calculator-core.js",
    "calculator-pages.js",
    "tiktok-shop-fee-calculator.html",
    "etsy-fee-calculator.html",
    "shopify-profit-calculator.html",
    "paypal-fee-calculator.html",
    "stripe-fee-calculator.html",
    "break-even-roas-calculator.html",
    "product-pricing-calculator.html",
    "about.html",
    "contact.html",
    "privacy-policy.html",
    "terms-of-use.html",
    "affiliate-disclosure.html",
    "disclaimer.html"
)

foreach ($file in $requiredFiles) {
    Assert-FileExists (Join-Path $root $file)
}

$index = Get-Content -LiteralPath (Join-Path $root "index.html") -Raw -Encoding UTF8
$tiktok = Get-Content -LiteralPath (Join-Path $root "tiktok-shop-fee-calculator.html") -Raw -Encoding UTF8
$css = Get-Content -LiteralPath (Join-Path $root "styles.css") -Raw -Encoding UTF8
$js = Get-Content -LiteralPath (Join-Path $root "script.js") -Raw -Encoding UTF8
$rates = Get-Content -LiteralPath (Join-Path $root "rates.js") -Raw -Encoding UTF8
$pages = Get-Content -LiteralPath (Join-Path $root "calculator-pages.js") -Raw -Encoding UTF8

$requiredHome = @(
    "Seller Margin Tools",
    "Seller Fee Calculators for Ecommerce Profit Margins",
    "data-home-calculator",
    "data-home-results",
    "TikTok Shop Fee Calculator",
    "Etsy Fee Calculator",
    "Shopify Profit Calculator",
    "PayPal Fee Calculator",
    "Stripe Fee Calculator",
    "Break-even ROAS Calculator",
    "Product Pricing Calculator",
    "Hidden fee example",
    "Privacy Policy",
    "Affiliate Disclosure",
    "Disclaimer"
)

foreach ($item in $requiredHome) {
    Assert-Contains $index $item
}

$requiredTikTok = @(
    "<h1 data-calculator-title>TikTok Shop Fee Calculator</h1>",
    "data-calculator=""tiktok""",
    "data-calculator-form",
    "data-calculator-results",
    "Fee breakdown",
    "Formula",
    "Example calculation",
    "Fee sources",
    "FAQ",
    "Related calculators"
)

foreach ($item in $requiredTikTok) {
    Assert-Contains $tiktok $item
}

$requiredRates = @(
    "ratesLastUpdated",
    "United States",
    "tiktokShopUS",
    "etsyUS",
    "shopifyUS",
    "stripeUS",
    "paypalUS",
    "sourceUrl"
)

foreach ($item in $requiredRates) {
    Assert-Contains $rates $item
}

$requiredPages = @(
    "TikTok Shop Fee Calculator",
    "Etsy Fee Calculator",
    "Shopify Profit Calculator",
    "PayPal Fee Calculator",
    "Stripe Fee Calculator",
    "Break-even ROAS Calculator",
    "Product Pricing Calculator",
    "calculateTikTokShop",
    "calculateProductPricing"
)

foreach ($item in $requiredPages) {
    Assert-Contains $pages $item
}

$requiredCss = @(
    "@media (max-width: 760px)",
    ".site-header",
    ".hero-calculator",
    ".calculator-layout",
    ".result-card",
    ".breakdown-table",
    "border-radius: 8px"
)

foreach ($item in $requiredCss) {
    Assert-Contains $css $item
}

$requiredJs = @(
    "renderHomeCalculator",
    "renderCalculatorPage",
    "hydrateRegionSelectors",
    "formatMoney",
    "data-region-select",
    "SellerCalculators"
)

foreach ($item in $requiredJs) {
    Assert-Contains $js $item
}

Write-Host "Site smoke checks passed."
```

- [ ] **Step 2: Run smoke tests**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\site-smoke.ps1
```

Expected: PASS with `Site smoke checks passed.`

- [ ] **Step 3: Run formula tests again**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\formula-smoke.ps1
```

Expected: PASS with `Formula tests passed.`

- [ ] **Step 4: Commit smoke tests if Git is available**

Run:

```powershell
git add tests/site-smoke.ps1
git commit -m "test: update smoke checks for seller calculator site"
```

Expected in the current workspace may be: `git` is not recognized. If Git remains unavailable, record `tests/site-smoke.ps1` in the task handoff and continue without committing.

## Task 9: Manual Browser Verification

**Files:**
- No source files unless verification reveals a defect.

- [ ] **Step 1: Start a local static server**

Run:

```powershell
$python = "C:\Users\99563\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
& $python -m http.server 4173 --bind 127.0.0.1 --directory "D:\Codex.web"
```

Expected: local server is available at `http://localhost:4173/`.

- [ ] **Step 2: Verify homepage manually**

Open:

```text
http://localhost:4173/
```

Expected:

- Header shows `Seller Margin Tools`.
- First screen shows the compact margin calculator.
- Result card updates when input values change.
- Calculator cards link to all first-batch calculator pages.
- Hidden fee example appears below the tool cards.
- No ListingPilot AI, dashboard, reviews, translations, or AI workspace copy remains.

- [ ] **Step 3: Verify TikTok page manually**

Open:

```text
http://localhost:4173/tiktok-shop-fee-calculator.html
```

Expected:

- H1 is `TikTok Shop Fee Calculator`.
- Input fields render above the fold.
- Result card updates when `Ad spend per order`, `COGS`, or `Affiliate commission rate` changes.
- Fee breakdown, formula, example, sources, FAQ, and related calculators are present.

- [ ] **Step 4: Verify mobile layout**

Use a narrow viewport or browser responsive mode.

Expected:

- Header collapses cleanly.
- Calculator inputs are single-column.
- Result card appears immediately after the form.
- Text does not overflow buttons, cards, nav, or tables.

- [ ] **Step 5: Stop the local server**

Stop the foreground server with `Ctrl+C` in the terminal that started it. If a background server was used, stop only the exact listening process for port `4173`; do not use recursive deletion or broad process-kill commands.

## Final Verification

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\formula-smoke.ps1
powershell -ExecutionPolicy Bypass -File tests\site-smoke.ps1
```

Expected:

```text
Formula tests passed.
Site smoke checks passed.
```

Then do the manual browser checks in Task 9.

## Implementation Notes

- Keep all user-visible content in English.
- Use United States as the active default region.
- Keep future regions visible but not falsely configured.
- Do not add AI copywriting, accounts, saved history, CSV import, or backend logic.
- Do not keep old ListingPilot AI dashboard components.
- Keep default fee rates editable and source-linked.
- The current environment may not have `git` on PATH. When commit steps fail because `git` is unavailable, continue the task and report the uncommitted changed files.
