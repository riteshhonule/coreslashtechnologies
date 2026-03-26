
$searchPattern = "CoreslashTechnologies"
$replacement = "CoreslashTechnologies"
$excludeDirs = @("node_modules", "dist", ".git", ".next", "out")

# List of files to process
$allFiles = Get-ChildItem -Path . -Recurse -File | Where-Object { 
    $fullName = $_.FullName
    $exclude = $false
    foreach ($dir in $excludeDirs) {
        if ($fullName -match "\\$dir\\") { $exclude = $true; break }
    }
    !$exclude
}

# Step 1: Content replacement
foreach ($file in $allFiles) {
    try {
        if ($file.Extension -match "\.(png|jpg|jpeg|gif|ico|webp|avif|webm|mp4|zip|pdf|exe|dll)$") {
            continue # Skip binary files for content replacement
        }
        $content = Get-Content -Path $file.FullName -Raw -Encoding utf8
        if ($content -match $searchPattern) {
            Write-Host "Processing: $($file.FullName)"
            # Case-insensitive global replacement
            $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $searchPattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            Set-Content -Path $file.FullName -Value $newContent -Encoding utf8
        }
    } catch {
        Write-Warning "Failed: $($file.FullName) - $($_.Exception.Message)"
    }
}

# Step 2: Renaming (files and folders)
$itemsToRename = Get-ChildItem -Path . -Recurse | Where-Object { 
    $name = $_.Name
    $fullName = $_.FullName
    $exclude = $false
    foreach ($dir in $excludeDirs) {
        if ($fullName -match "\\$dir\\") { $exclude = $true; break }
    }
    !$exclude -and ($name -match $searchPattern)
} | Sort-Object -Property @{Expression={$_.FullName.Length}} -Descending

foreach ($item in $itemsToRename) {
    try {
        $newName = [System.Text.RegularExpressions.Regex]::Replace($item.Name, $searchPattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        $parentPath = Split-Path $item.FullName -Parent
        $newPath = Join-Path $parentPath $newName
        
        Write-Host "Renaming: $($item.FullName) -> $newName"
        Move-Item -LiteralPath $item.FullName -Destination $newPath -Force
    } catch {
        $msg = $_.Exception.Message
        Write-Warning "Rename Failed: $($item.FullName) - $msg"
    }
}

