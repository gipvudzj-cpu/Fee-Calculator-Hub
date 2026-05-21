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
$indexPath = Join-Path $root "index.html"
$stylesPath = Join-Path $root "styles.css"
$scriptPath = Join-Path $root "script.js"
$calculatorCorePath = Join-Path $root "calculator-core.js"
$ratesPath = Join-Path $root "rates.js"

Assert-FileExists $indexPath
Assert-FileExists $stylesPath
Assert-FileExists $scriptPath
Assert-FileExists $calculatorCorePath
Assert-FileExists $ratesPath

$html = Get-Content -LiteralPath $indexPath -Raw -Encoding UTF8
$css = Get-Content -LiteralPath $stylesPath -Raw -Encoding UTF8
$js = Get-Content -LiteralPath $scriptPath -Raw -Encoding UTF8
$rates = Get-Content -LiteralPath $ratesPath -Raw -Encoding UTF8
$zh = -join ([char]0x4E2D, [char]0x6587)

$requiredHtml = @(
    "ListingPilot AI",
    "Listing Optimizer",
    "Dashboard",
    "Listings",
    "Reviews",
    "Translation",
    "Insights",
    "data-panel=""dashboard""",
    "data-panel=""listings""",
    "data-panel=""reviews""",
    "data-panel=""translation""",
    "data-panel=""insights""",
    "data-action=""generate-listing""",
    "data-action=""copy-title""",
    "data-action=""export-listing""",
    "data-action=""translate-listing""",
    "data-action=""open-product""",
    "data-action=""draft-reply""",
    "data-action=""approve-reply""",
    "data-action=""schedule-reply""",
    "role=""dialog""",
    "<option>$zh</option>"
)

foreach ($item in $requiredHtml) {
    Assert-Contains $html $item
}

$requiredCss = @(
    "@media (max-width: 860px)",
    ".modal",
    ".workspace",
    ".sidebar",
    "border-radius: 8px"
)

foreach ($item in $requiredCss) {
    Assert-Contains $css $item
}

$requiredJs = @(
    "openModal",
    "closeModal",
    "showToast",
    "generateListing",
    "document.querySelectorAll('[data-panel]')",
    "document.querySelectorAll('[data-action]')",
    "data-set-language=""$zh"""
)

foreach ($item in $requiredJs) {
    Assert-Contains $js $item
}

$requiredRates = @(
    "ratesLastUpdated",
    "regions: [",
    "currency: ""USD""",
    "symbol: ""$""",
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

Write-Host "Site smoke checks passed."
