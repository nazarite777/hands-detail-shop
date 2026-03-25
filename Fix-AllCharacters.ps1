$ErrorActionPreference = "Continue"

# Hex data for corrupted/correct character pairs
$replacements = @(
    @{old = "â˜…"; new = "⭐"},
    @{old = "ðŸ•'"; new = "🕐"},
    @{old = "ðŸ`"ž"; new = "📞"},
    @{old = "ðŸ'¬"; new = "💬"},
    @{old = "ðŸŽŠ"; new = "🎊"},
    @{old = "ðŸ'Ž"; new = "💎"},
    @{old = "ðŸ'³"; new = "💳"},
    @{old = "ðŸ`""; new = "📍"},
    @{old = "ðŸŒŠ"; new = "🌊"},
    @{old = "âœ‰ï¸"; new = "✉️"},
    @{old = "ðŸ"§"; new = "🔧"},
    @{old = "ðŸ`"©"; new = "📩"},
    @{old = "â€""; new = "–"},
)

# Get all HTML files
$htmlFiles = Get-ChildItem -Path "c:\users\cbevv\hands-detail-shop" -Include "*.html" -Recurse | Select-Object -ExpandProperty FullName

Write-Host "Found $($htmlFiles.Count) HTML files"
Write-Host "Processing..."

foreach ($file in $htmlFiles) {
    try {
        $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        $original = $content
        
        foreach ($rep in $replacements) {
            $content = $content.Replace($rep.old, $rep.new)
        }
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
            $relPath = $file -replace [regex]::Escape("c:\users\cbevv\hands-detail-shop\"), ""
            Write-Host "✓ $relPath"
        }
    }
    catch {
        Write-Host "✗ Error in $file"
    }
}

Write-Host "Done!"
