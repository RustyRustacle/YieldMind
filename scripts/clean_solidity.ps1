$files = Get-ChildItem -Path "contracts" -Filter "*.sol" -Recurse

foreach ($file in $files) {
    Write-Host "Cleaning file: $($file.FullName)"
    # Read content as a single string to preserve line endings (or let PowerShell handle them)
    $content = Get-Content -Raw -Path $file.FullName
    
    # Save as UTF8 without BOM
    $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file.FullName, $content, $Utf8NoBomEncoding)
}
