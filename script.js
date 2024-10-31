// webapp/script.js
document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram.WebApp) {
        const telegramWebApp = window.Telegram.WebApp;
        telegramWebApp.ready();
        const userInfoDiv = document.getElementById("user-info");
        const user = telegramWebApp.initDataUnsafe.user;

        if (user) {
            userInfoDiv.innerHTML = `<p><strong>Welcome, ${user.first_name}</strong></p>`;
        } else {
            userInfoDiv.innerHTML = "<p>Could not retrieve user information.</p>";
        }
    }
});

