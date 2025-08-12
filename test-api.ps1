# PowerShell script to test API
Write-Host "🚀 Testing Lumina Restaurant API..." -ForegroundColor Green

# Test health endpoint
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5175/api/health" -Method Get
    Write-Host "✅ Health Check: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test reservation creation
$testReservation = @{
    name = "PowerShell Test"
    email = "test@powershell.com"
    phone = "+1-555-TEST"
    date = "2025-08-25"
    time = "20:00"
    guests = "2"
    occasion = "Test"
    specialRequests = "This is a test reservation from PowerShell"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5175/api/reservations" -Method Post -Body $testReservation -ContentType "application/json"
    Write-Host "✅ Reservation Created: ID = $($response.reservationId)" -ForegroundColor Green
} catch {
    Write-Host "❌ Reservation Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test contact form
$testContact = @{
    name = "PowerShell Contact"
    email = "contact@powershell.com"
    subject = "Test Contact"
    message = "This is a test contact message from PowerShell"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5175/api/contact" -Method Post -Body $testContact -ContentType "application/json"
    Write-Host "✅ Contact Message Saved: ID = $($response.messageId)" -ForegroundColor Green
} catch {
    Write-Host "❌ Contact Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🎉 API Tests Complete!" -ForegroundColor Cyan
