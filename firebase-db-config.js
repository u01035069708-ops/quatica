// firebase-db-config.js
// Cấu hình Firebase cho dự án Website Bán Cá Cảnh Aquatica

const firebaseConfig = {
  apiKey: "AIzaSyBnefhG8Nd-B0mF0AGkP77W5vvGbe9UIOY",
  authDomain: "aquatica-fishshop.firebaseapp.com",
  projectId: "aquatica-fishshop",
  storageBucket: "aquatica-fishshop.firebasestorage.app",
  messagingSenderId: "235329971452",
  appId: "1:235329971452:web:c2a8498b6d7dbfdb146379"
};

// Kiểm tra xem người dùng đã cấu hình Firebase thực sự hay chưa
function checkFirebaseConfigured() {
  return (
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID_HERE"
  );
}

// Xuất cấu hình và hàm kiểm tra ra phạm vi toàn cục (global window)
window.firebaseConfig = firebaseConfig;
window.isFirebaseConfigured = checkFirebaseConfigured();
window.firebaseApp = null;
window.firestoreDb = null;
window.firebaseAuth = null;
window.googleAuthProvider = null;
window.facebookAuthProvider = null;
