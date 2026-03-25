# Fix corrupted UTF-8 emojis
$files = @("reviews.html", "aircraft-services.html", "blog-auto-detailing-guide.html", "fleet-services.html", "marine-services.html", "motorcycle-services.html", "personal-vehicles.html", "gift-certificates.html")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        # Read file as UTF-8
        $content = Get-Content $file -Raw -Encoding UTF8
        $original = $content
        
        # Replace corrupted emoji patterns using regex escape
        $content = $content -replace [regex]::Escape("ðŸ•'"), "🕒"
        $content = $content -replace [regex]::Escape("ðŸ"ž"), "📞"
        $content = $content -replace [regex]::Escape("ðŸ'¬"), "💬"
        $content = $content -replace [regex]::Escape("ðŸ'"), "⭐"
        $content = $content -replace [regex]::Escape("ðŸŽŠ"), "🎊"
        $content = $content -replace [regex]::Escape("ðŸ'Ž"), "💎"
        $content = $content -replace [regex]::Escape("ðŸ'³"), "💳"
        $content = $content -replace [regex]::Escape("ðŸ""), "📍"
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
            Write-Host "✅ $file fixed"
        } else {
            Write-Host "ℹ️  No changes for $file"
        }
    }
}

Write-Host "`nComplete!"
