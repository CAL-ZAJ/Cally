document.addEventListener('DOMContentLoaded', function() {
  // تأكد أن Web App متوفر وأنه يعمل ضمن Telegram
  if (window.Telegram && window.Telegram.WebApp) {
    const telegramWebApp = window.Telegram.WebApp;
    
    // التحقق من وجود initDataUnsafe ومعلومات المستخدم
    if (telegramWebApp.initDataUnsafe && telegramWebApp.initDataUnsafe.user) {
      const userId = telegramWebApp.initDataUnsafe.user.id;
      console.log('User ID:', userId);
      
      // عرض userId في العنصر المحدد (اختياري)
      const userInfoDiv = document.getElementById('userInfo');
      userInfoDiv.innerHTML = `<p><strong>User ID:</strong> ${userId}</p>`;
    } else {
      console.log('User information is not available.');
      alert('User information could not be retrieved. Please ensure the app is opened from within Telegram.');
    }
  } else {
    console.log('Telegram WebApp is not available. Please open the app from within Telegram.');
    alert('Please open the app from within Telegram to access user information.');
  }
});
