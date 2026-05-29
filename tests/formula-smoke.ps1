$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$systemNode = Get-Command node -ErrorAction SilentlyContinue
$homeRoot = if ($env:USERPROFILE) { $env:USERPROFILE } else { $env:HOME }
$bundledNode = if ($homeRoot) {
    Join-Path $homeRoot ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe"
} else {
    $null
}
$formulaTests = Join-Path $PSScriptRoot "formula-tests.cjs"
$sankeyTests = Join-Path $PSScriptRoot "sankey-renderer-tests.cjs"

if ($systemNode) {
    $node = $systemNode.Source
} elseif ($bundledNode -and (Test-Path $bundledNode)) {
    $node = $bundledNode
} else {
    throw "Node.js is required to run formula tests."
}

Push-Location $repoRoot
try {
    & $node $formulaTests
    if ($LASTEXITCODE -ne 0) {
        throw "Formula tests failed with exit code $LASTEXITCODE."
    }
    & $node $sankeyTests
    if ($LASTEXITCODE -ne 0) {
        throw "Sankey renderer tests failed with exit code $LASTEXITCODE."
    }
} finally {
    Pop-Location
}
