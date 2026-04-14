/**
 * BACKEND LOGIC - Google Apps Script
 * Platform: Google Spreadsheet & Blogger WebApp
 */

const SS = SpreadsheetApp.getActiveSpreadsheet();

// 1. Inisialisasi Database (Header disesuaikan dengan field baru)
function setupDatabase() {
  const sheets = [
    { name: 'users', header: ['username', 'password', 'role', 'nama_lengkap'] },
    { name: 'master_data', header: ['id_user', 'nama', 'tipe', 'jabatan', 'kelas', 'jurusan', 'descriptor'] },
    { name: 'log_absensi', header: ['timestamp', 'id_user', 'nama', 'tipe', 'status'] }
  ];

  sheets.forEach(s => {
    let sheet = SS.getSheetByName(s.name);
    if (!sheet) {
      sheet = SS.insertSheet(s.name);
      sheet.appendRow(s.header);
      
      // Default Admin Account
      if (s.name === 'users') {
        sheet.appendRow(['admin', 'admin2026', 'Admin', 'Administrator Utama']);
      }
    } else {
      // Update header jika sudah ada sheetnya (opsional, untuk migrasi)
      sheet.getRange(1, 1, 1, s.header.length).setValues([s.header]);
    }
  });
  
  return "Database Berhasil Disiapkan dengan kolom baru!";
}

// 2. Main Entry Point
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistem Absensi Wajah SMK Bina Informatika')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Logika API lainnya tetap dipertahankan
 * Pastikan fungsi penyimpanan (save) menangkap kolom baru ini saat live deployment
 */
