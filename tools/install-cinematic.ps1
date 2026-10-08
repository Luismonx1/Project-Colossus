$projectRoot = Split-Path -Parent $PSScriptRoot
$ErrorActionPreference = 'Stop'
$targetRepo = 'C:\Users\luisg\OneDrive\Área de Trabalho\Projeto Colossus\Project-Colossus'
$names = @('Quadratus','Gaius','Phaedra','Avion','Barba','Hydrus','Kuromori','Basaran','Dirge','Celosia','Pelagia','Phalanx','Cenobia','Argus','Malus')
$files = @('Pages/HomePage.html','Styles/HomePage.css','Images/Colossos/cinematic-images.md')
foreach ($name in $names) {
    $files += "Images/Colossos/${name}Cinematic.webp"
    $files += "Images/Colossos/${name}Cinematic.prompt.txt"
}
foreach ($file in $files) {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $file))) { throw "Arquivo ausente: $file" }
}
foreach ($file in $files) {
    Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination (Join-Path $targetRepo $file)
}
Write-Output "Galeria atualizada: 15 novas imagens, prompts, HTML e CSS. Valus preservado."
