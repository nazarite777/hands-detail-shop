$old = 'SPRING SPECIAL: 15% OFF First-Time'
$new = 'PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time'

Get-ChildItem -Path '*.html' -File | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content.Contains($old)) {
        Write-Host "Updating: $($_.Name)"
        $newContent = $content.Replace($old, $new)
        [System.IO.File]::WriteAllText($_.FullName, $newContent)
    }
}

Get-ChildItem -Path 'hands-detail-shop-seo-update/*.html' -File | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content.Contains($old)) {
        Write-Host "Updating: $($_.FullName)"
        $newContent = $content.Replace($old, $new)
        [System.IO.File]::WriteAllText($_.FullName, $newContent)
    }
}

Get-ChildItem -Path 'hands-detail-update/*.html' -File | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content.Contains($old)) {
        Write-Host "Updating: $($_.FullName)"
        $newContent = $content.Replace($old, $new)
        [System.IO.File]::WriteAllText($_.FullName, $newContent)
    }
}

Write-Host "Done!"
