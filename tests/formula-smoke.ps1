$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$systemNode = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if ($systemNode) {
    $node = $systemNode.Source
} elseif (Test-Path $bundledNode) {
    $node = $bundledNode
} else {
    throw "Node.js is required to run formula tests."
}

Push-Location $repoRoot
try {
    & $node "tests\formula-tests.cjs"
    if ($LASTEXITCODE -ne 0) {
        throw "Formula tests failed with exit code $LASTEXITCODE."
    }
    & $node "tests\sankey-renderer-tests.cjs"
    if ($LASTEXITCODE -ne 0) {
        throw "Sankey renderer tests failed with exit code $LASTEXITCODE."
    }
} finally {
    Pop-Location
}
