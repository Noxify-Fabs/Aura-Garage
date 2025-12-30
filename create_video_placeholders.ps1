# Script untuk membuat video placeholder kosong
$videos = @(
    'supra-showcase.mp4',
    'bmw-m4-showcase.mp4',
    'civic-type-r-showcase.mp4',
    'gr86-showcase.mp4',
    'brz-showcase.mp4',
    'amg45s-showcase.mp4',
    'lexus-lm-showcase.mp4',
    'vellfire-showcase.mp4',
    'alphard-showcase.mp4',
    'byd-seal-showcase.mp4',
    'bmw-i7-showcase.mp4',
    'ioniq5-showcase.mp4',
    'fortuner-showcase.mp4',
    'pajero-showcase.mp4',
    'palisade-showcase.mp4'
)

$videosPath = "$PSScriptRoot\videos"

# Buat pesan placeholder
$message = "Ini adalah video placeholder. Silakan ganti dengan video asli.\nNama file: "

foreach ($video in $videos) {
    $filePath = Join-Path $videosPath $video
    
    # Buat file teks dengan ekstensi .mp4
    $message + $video | Out-File -FilePath $filePath -Encoding utf8
    
    Write-Host "Created placeholder: $filePath"
}

Write-Host "\nSemua video placeholder telah dibuat di folder: $videosPath"
Write-Host "Silakan ganti file-file ini dengan video asli Anda."
