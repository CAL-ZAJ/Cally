document.addEventListener('DOMContentLoaded', async function() {
    const errorMessageDiv = document.getElementById('error-message');
    
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

            if (!response.ok) throw new Error('فشل في توليد التوكن.');

            const { token } = await response.json();

            // إرسال الطلبات باستخدام التوكن
            const userResponse = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok) throw new Error('فشل في تحميل بيانات المستخدم.');

            const userData = await userResponse.json();
            // عرض بيانات المستخدم
            const userInfoDiv = document.getElementById('user-info');
            userInfoDiv.innerHTML = `<p><strong>معرف المستخدم:</strong> ${userData.userId}</p>
                                      <p><strong>الاسم الأول:</strong> ${userData.firstName}</p>
                                      <p><strong>النقاط:</strong> ${userData.points}</p>`;

            // إخفاء شاشة التحميل
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('content').style.display = 'block';

        } catch (error) {
            // عرض رسالة الخطأ
            errorMessageDiv.innerText = error.message;
            errorMessageDiv.style.display = 'block'; // إظهار رسالة الخطأ

            // إخفاء شاشة التحميل
            document.getElementById('loading-screen').style.display = 'none';
        }
    } else {
        console.log("معلومات المستخدم غير متاحة.");
    }
});
