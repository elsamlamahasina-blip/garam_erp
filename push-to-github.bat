@echo off
title Push MADURA ERP/EIS ke GitHub
color 0b
echo =====================================================================
echo   MADURA ERP/EIS - SISTEM INFORMASI GARAM DAN UMKM PAMEKASAN
echo   Proses Push ke GitHub: https://github.com/elsamlamahasina-blip/garam_erp.git
echo =====================================================================
echo.
cd /d "%~dp0"

echo Memeriksa status Git lokal...
"C:\Program Files\Git\cmd\git.exe" status

echo.
echo Melakukan push ke origin main...
"C:\Program Files\Git\cmd\git.exe" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [SUKSES] Seluruh kode berhasil di-push ke GitHub!
    echo Silakan refresh halaman: https://github.com/elsamlamahasina-blip/garam_erp
    echo =====================================================================
) else (
    echo.
    echo [PERHATIAN] Jika diminta login, silakan ikuti petunjuk browser untuk otorisasi GitHub.
)

echo.
pause
