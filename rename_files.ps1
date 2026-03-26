
# File renaming mapping
$renameMap = @(
    @("coreslashtechnologies", "CoreslashTechnologiestechnologies"),
    @("Coreslash", "CoreslashTechnologies"),
    @("Coreslash Technologies", "CoreslashTechnologies Technologies"),
    @("coreslashtechnologies", "CoreslashTechnologiesTechnologies"),
    @("Coreslash", "CoreslashTechnologies")
)

# Get all files and directories
$items = Get-ChildItem -Path . -Recurse | Where-Object { 
    $_.FullName -notmatch "node_modules" -and 
    $_.FullName -notmatch "dist" -and 
    $_.FullName -notmatch "\.git" -and
    $_.FullName -notmatch "\.gemini" -and 
    $_.Name -notmatch "rename_files.ps1" -and
    $_.Name -notmatch "replace_names.ps1"
} | Sort-Object FullName -Descending

foreach ($item in $items) {
    $newName = $item.Name
    foreach ($pair in $renameMap) {
        $search = $pair[0]
        $replace = $pair[1]
        if ($newName.Contains($search)) {
             $newName = $newName.Replace($search, $replace)
        }
    }
    
    if ($newName -ne $item.Name) {
        $parentPath = Split-Path -Path $item.FullName -Parent
        $newPath = Join-Path -Path $parentPath -ChildPath $newName
        try {
            Move-Item -Path $item.FullName -Destination $newPath -Force
            Write-Host "Renamed: $($item.FullName) -> $newName"
        } catch {
            Write-Warning "Failed to rename: $($item.FullName) to $newName"
        }
    }
}

