async function fetchUserId() {
  try {
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
        throw new Error('User information is not available.');
      }
    } else {
      throw new Error('Telegram WebApp is not available. Please open the app from within Telegram.');
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fetchUserId);
