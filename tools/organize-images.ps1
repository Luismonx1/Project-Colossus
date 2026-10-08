$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\luisg\OneDrive\Área de Trabalho\Projeto Colossus\Project-Colossus'
$imageRoot = Join-Path $repo 'Images\Colossos'
$names = @('Valus','Quadratus','Gaius','Phaedra','Avion','Barba','Hydrus','Kuromori','Basaran','Dirge','Celosia','Pelagia','Phalanx','Cenobia','Argus','Malus')
$moves = @()
foreach ($name in $names) {
    $destination = Join-Path $imageRoot $name
    foreach ($file in Get-ChildItem -LiteralPath $imageRoot -File) {
        if ($file.Name -match ('^' + $name + '(Template|Cinematic)\.')) {
            $target = [IO.Path]::GetFullPath((Join-Path $destination $file.Name))
            if (-not $target.StartsWith($imageRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Destino fora da pasta de imagens.' }
            if (Test-Path -LiteralPath $target) { throw "Arquivo de destino já existe: $target" }
            $moves += @{ Source = $file.FullName; Target = $target; Directory = $destination }
        }
    }
}
foreach ($move in $moves) {
    New-Item -ItemType Directory -Path $move.Directory -Force | Out-Null
    Move-Item -LiteralPath $move.Source -Destination $move.Target
}
$textFiles = @()
foreach ($directory in @('Pages','Styles','Scripts')) {
    $textFiles += Get-ChildItem -LiteralPath (Join-Path $repo $directory) -File -Recurse | Where-Object { $_.Extension -in @('.html','.css','.js') }
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
foreach ($file in $textFiles) {
    $text = [IO.File]::ReadAllText($file.FullName)
    $updated = $text
    foreach ($name in $names) {
        $updated = $updated.Replace("Images/Colossos/${name}Template", "Images/Colossos/$name/${name}Template").Replace("Images/Colossos/${name}Cinematic", "Images/Colossos/$name/${name}Cinematic")
    }
    if ($updated -ne $text) { [IO.File]::WriteAllText($file.FullName, $updated, $utf8) }
}
$manifest = Join-Path $imageRoot 'cinematic-images.md'
$text = [IO.File]::ReadAllText($manifest)
foreach ($name in $names) { $text = $text.Replace("](${name}Cinematic", "]($name/${name}Cinematic") }
[IO.File]::WriteAllText($manifest, $text, $utf8)
$checked = 0
foreach ($file in $textFiles) {
    foreach ($match in [regex]::Matches([IO.File]::ReadAllText($file.FullName), 'Images/Colossos/[^\s"''<>\)]+')) {
        if (-not (Test-Path -LiteralPath (Join-Path $repo $match.Value))) { throw "Referência quebrada: $($match.Value)" }
        $checked++
    }
}
Write-Output "Organização concluída: $($moves.Count) arquivos em 16 pastas; $checked referências conferidas."
