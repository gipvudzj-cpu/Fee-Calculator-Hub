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
