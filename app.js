document.addEventListener('DOMContentLoaded', function() {
  if (window.Telegram && window.Telegram.WebApp) {
    console.log("Telegram WebApp موجود.");
    console.log("بيانات initDataUnsafe:", window.Telegram.WebApp.initDataUnsafe);

    if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      console.log("User ID:", userId);
    } else {
      console.warn("User information is not available in initDataUnsafe.");
      alert("User information could not be retrieved.");
    }
  } else {
    console.warn("Telegram WebApp غير متوفر.");
    alert("Please open the app from within Telegram to access user information.");
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // تأكد من توفر Web App داخل Telegram
  if (window.Telegram && window.Telegram.WebApp) {
    const telegramWebApp = window.Telegram.WebApp;

    // التحقق من وجود بيانات المستخدم في initDataUnsafe
    if (telegramWebApp.initDataUnsafe && telegramWebApp.initDataUnsafe.user) {
      const userInfo = {
        query_id: telegramWebApp.initDataUnsafe.query_id || "N/A",
        user: {
          id: telegramWebApp.initDataUnsafe.user.id,
          first_name: telegramWebApp.initDataUnsafe.user.first_name || "N/A",
          last_name: telegramWebApp.initDataUnsafe.user.last_name || "N/A",
          username: telegramWebApp.initDataUnsafe.user.username || "N/A",
          language_code: telegramWebApp.initDataUnsafe.user.language_code || "N/A",
          allows_write_to_pm: telegramWebApp.initDataUnsafe.user.allows_write_to_pm || false,
        },
        auth_date: telegramWebApp.initDataUnsafe.auth_date || "N/A",
        hash: telegramWebApp.initDataUnsafe.hash || "N/A"
      };

      // عرض المعلومات في العنصر المحدد
      const userInfoDiv = document.getElementById('userInfo');
      userInfoDiv.innerHTML = `
        <p><strong>Query ID:</strong> ${userInfo.query_id}</p>
        <p><strong>User ID:</strong> ${userInfo.user.id}</p>
        <p><strong>First Name:</strong> ${userInfo.user.first_name}</p>
        <p><strong>Last Name:</strong> ${userInfo.user.last_name}</p>
        <p><strong>Username:</strong> ${userInfo.user.username}</p>
        <p><strong>Language Code:</strong> ${userInfo.user.language_code}</p>
        <p><strong>Allows Write to PM:</strong> ${userInfo.user.allows_write_to_pm}</p>
        <p><strong>Auth Date:</strong> ${userInfo.auth_date}</p>
        <p><strong>Hash:</strong> ${userInfo.hash}</p>
      `;
    } else {
      console.log('User information is not available.');
      alert('User information could not be retrieved. Please ensure the app is opened from within Telegram.');
    }
  } else {
    console.log('Telegram WebApp is not available. Please open the app from within Telegram.');
    alert('Please open the app from within Telegram to access user information.');
  }
});
