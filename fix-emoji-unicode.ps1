$files = @(
    "reviews.html",
    "aircraft-services.html", 
    "blog-auto-detailing-guide.html",
    "fleet-services.html",
    "marine-services.html",
    "motorcycle-services.html",
    "personal-vehicles.html",
    "gift-certificates.html"
)

foreach ($filename in $files) {
    if (-not (Test-Path $filename)) {
        Write-Host "File not found: $filename"
        continue
    }

    $content = Get-Content $filename -Raw -Encoding UTF8
    $originalLength = $content.Length
    
    # Replace corrupted patterns
    $content = $content.Replace([char]0xD83D + [char]0xDC51, "🕒")  # clock
    $content = $content.Replace([char]0xD83D + [char]0xDC4E, "📞")  # phone
    $content = $content.Replace([char]0xD83D + [char]0xDCAC, "💬")  # chat
    $content = $content.Replace([char]0xD83D + [char]0xDC8E, "💎")  # gem
    $content = $content.Replace([char]0xD83D + [char]0xDCB3, "💳")  # card
    $content = $content.Replace([char]0xD83D + [char]0xDCCD, "📍")  # pin
    $content = $content.Replace([char]0xD83D + [char]0xDEA7, "🚗")  # car
    $content = $content.Replace([char]0xD83D + [char]0xDC87, "✨")  # sparkles
    
    $newLength = $content.Length
    
    # Write back
    $encoding = [System.Text.Encoding]::UTF8
    [System.IO.File]::WriteAllText($filename, $content, $encoding)
    
    Write-Host "Fixed $filename ($originalLength → $newLength bytes)"
}

Write-Host "Complete!"
