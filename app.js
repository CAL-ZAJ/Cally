document.addEventListener('DOMContentLoaded', function() {
  try {
    // التحقق من Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramWebApp = window.Telegram.WebApp;
      
      // جلب initData مباشرة من Telegram Web App
      const initData = telegramWebApp.initData;
      console.log('Raw initData:', initData);

      // تحويل initData إلى كائن URLSearchParams لتحليل البيانات
      const urlParams = new URLSearchParams(initData);
      const userDataString = urlParams.get('user');
      
      if (userDataString) {
        // تحليل بيانات المستخدم من JSON
        const userData = JSON.parse(userDataString);
        console.log('User Data:', userData);
        
        // استخدام بيانات المستخدم
        const userId = userData.id;
        const firstName = userData.first_name;
        const lastName = userData.last_name;
        const username = userData.username;

        // عرض المعلومات في العنصر المحدد (اختياري)
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = `
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Username:</strong> ${username}</p>
        `;
      } else {
        console.warn("User data is not available in initData.");
        alert("User information could not be retrieved.");
      }
    } else {
      console.warn("Telegram WebApp is not available.");
      alert("Please open the app from within Telegram.");
    }
  } catch (error) {
    console.error("An error occurred while parsing user data:", error);
    alert("An error occurred while retrieving user information.");
  }
});
