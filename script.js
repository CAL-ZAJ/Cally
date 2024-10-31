document.addEventListener('DOMContentLoaded', async function() {
    if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

        // طلب التوكن من الخادم لبدء الجلسة
        try {
            const response = await fetch('http://localhost:3000/generate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) throw new Error('Failed to generate token.');

            const { token } = await response.json();

            // إرسال الطلبات باستخدام التوكن
            const userResponse = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok) throw new Error('Failed to load user data.');

            const userData = await userResponse.json();
            // عرض بيانات المستخدم
            const userInfoDiv = document.getElementById('userInfo');
            userInfoDiv.innerHTML = `<p><strong>User ID:</strong> ${userData.userId}</p>
                                      <p><strong>First Name:</strong> ${userData.firstName}</p>
                                      <p><strong>Points:</strong> ${userData.points}</p>`;
        } catch (error) {
            console.error(error.message);
        }
    } else {
        console.log("User information is not available.");
    }
});
