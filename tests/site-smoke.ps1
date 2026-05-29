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
    "sankey-renderer.js",
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
$calculatorPages = @(
    "tiktok-shop-fee-calculator.html",
    "etsy-fee-calculator.html",
    "shopify-profit-calculator.html",
    "paypal-fee-calculator.html",
    "stripe-fee-calculator.html",
    "break-even-roas-calculator.html",
    "product-pricing-calculator.html"
)
$css = Get-Content -LiteralPath (Join-Path $root "styles.css") -Raw -Encoding UTF8
$js = Get-Content -LiteralPath (Join-Path $root "script.js") -Raw -Encoding UTF8
$sankeyRenderer = Get-Content -LiteralPath (Join-Path $root "sankey-renderer.js") -Raw -Encoding UTF8
$rates = Get-Content -LiteralPath (Join-Path $root "rates.js") -Raw -Encoding UTF8
$pages = Get-Content -LiteralPath (Join-Path $root "calculator-pages.js") -Raw -Encoding UTF8

$requiredHome = @(
    "MarginPath",
    "Marketplace Fee Calculators for Ecommerce Sellers",
    "data-home-calculator",
    "data-home-results",
    "data-profit-sankey",
    "data-sankey-canvas",
    "sankey-renderer.js",
    "alluvial-flow",
    "sankey-mobile-summary",
    "Sankey diagram",
    "data-language-select",
    '<option value="es">ES</option>',
    '<option value="ja">JA</option>',
    "MarginPath is independent and is not affiliated with, endorsed by, or sponsored by TikTok, Shopify, Etsy, Stripe, or PayPal.",
    "TikTok Shop Fee Calculator",
    "Etsy Fee Calculator",
    "Shopify Profit Calculator",
    "PayPal Fee Calculator",
    "Stripe Fee Calculator",
    "Break-even ROAS Calculator",
    "Product Pricing Calculator",
    "Privacy Policy",
    "Affiliate Disclosure",
    "Disclaimer"
)

foreach ($item in $requiredHome) {
    Assert-Contains $index $item
}

if ($index -match "Seller Margin Tools") {
    throw "Expected home page main UI to remove old Seller Margin Tools brand"
}

foreach ($file in $requiredFiles | Where-Object { $_ -like "*.html" }) {
    $htmlContent = Get-Content -LiteralPath (Join-Path $root $file) -Raw -Encoding UTF8
    if ($htmlContent -match "Seller Margin Tools") {
        throw "Expected $file to use MarginPath instead of old Seller Margin Tools brand"
    }
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

foreach ($calculatorPage in $calculatorPages) {
    $calculatorContent = Get-Content -LiteralPath (Join-Path $root $calculatorPage) -Raw -Encoding UTF8
    Assert-Contains $calculatorContent "data-rate-meta"
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
    "@media (prefers-reduced-motion: reduce)",
    ".site-header",
    ".marginpath-workbench",
    ".calculator-layout",
    ".result-card",
    ".sankey-card",
    ".sankey-stage",
    ".marginpath-workbench > *",
    "overflow-wrap: anywhere",
    "overflow-x: hidden",
    ".breakdown-table",
    "border-radius: 8px"
)

foreach ($item in $requiredCss) {
    Assert-Contains $css $item
}

if ($css -match "min\(100% -") {
    throw "Expected responsive widths to use calc() inside min() to avoid mobile overflow"
}

$requiredJs = @(
    "renderHomeCalculator",
    "renderHomeSankey",
    "MarginPathSankeyRenderer",
    "renderCalculatorPage",
    "hydrateRegionSelectors",
    "hydrateLanguageSelectors",
    "formatMoney",
    "data-region-select",
    "data-language-select",
    "SellerCalculators",
    "resolveFieldDefault",
    "String(value ?? """")",
    "Target margin is not reachable with these fee rates."
)

foreach ($item in $requiredJs) {
    Assert-Contains $js $item
}

$requiredSankeyRenderer = @(
    "createHomeSankeyModel",
    "renderHomeSankeyDiagram",
    "createRibbonPath",
    "sankey-link-${escapeHtml(link.id)}",
    "sankey-node-${escapeHtml(node.id)}",
    "module.exports"
)

foreach ($item in $requiredSankeyRenderer) {
    Assert-Contains $sankeyRenderer $item
}

Write-Host "Site smoke checks passed."
