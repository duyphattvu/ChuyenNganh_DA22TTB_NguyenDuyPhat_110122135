@echo off
echo ========================================
echo    FIX MYSQL XAMPP - SHOP GIAY
echo ========================================
echo.

echo [1] Dang tat MySQL process...
taskkill /F /IM mysqld.exe 2>nul
timeout /t 2 >nul

echo [2] Backup va xoa file log loi...
cd /d C:\xampp\mysql\data

if exist "ibdata1.bak" del "ibdata1.bak"
if exist "ib_logfile0.bak" del "ib_logfile0.bak"
if exist "ib_logfile1.bak" del "ib_logfile1.bak"

if exist "ib_logfile0" (
    rename "ib_logfile0" "ib_logfile0.bak"
    echo    - Da backup ib_logfile0
)
if exist "ib_logfile1" (
    rename "ib_logfile1" "ib_logfile1.bak"
    echo    - Da backup ib_logfile1
)

echo.
echo [3] Xoa file aria log...
if exist "aria_log_control" del "aria_log_control"
if exist "aria_log.00000001" del "aria_log.00000001"
echo    - Da xoa aria log files

echo.
echo ========================================
echo    HOAN TAT! 
echo    Hay khoi dong lai MySQL trong XAMPP
echo ========================================
echo.
pause
