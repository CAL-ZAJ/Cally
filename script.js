document.addEventListener('DOMContentLoaded', async function() {
    const errorMessageDiv = document.getElementById('error-message'); // العنصر الخاص بالأخطاء
    const loadingScreen = document.getElementById('loading-screen'); // شاشة التحميل
    const contentDiv = document.getElementById('content'); // المحتوى الرئيسي
    const userInfoDiv = document.getElementById('user-info'); // عنصر معلومات المستخدم

    errorMessageDiv.innerHTML = ''; // إعادة تعيين أي رسائل خطأ سابقة
    loadingScreen.style.display = 'block'; // إظهار شاشة التحميل

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
            userInfoDiv.innerHTML = `<p><strong>User ID:</strong> ${userData.userId}</p>
                                     <p><strong>First Name:</strong> ${userData.firstName}</p>
                                     <p><strong>Points:</strong> ${userData.points}</p>`;

            // إخفاء شاشة التحميل وعرض المحتوى
            loadingScreen.style.display = 'none';
            contentDiv.style.display = 'block';
        } catch (error) {
            // طباعة الخطأ في أعلى الصفحة
            errorMessageDiv.innerHTML = error.message; // عرض الرسالة في عنصر الأخطاء
            console.error(error.message); // طباعة الخطأ في وحدة التحكم
            loadingScreen.style.display = 'none'; // إخفاء شاشة التحميل
        }
    } else {
        errorMessageDiv.innerHTML = "معلومات المستخدم غير متاحة."; // عرض رسالة إذا لم تتوفر المعلومات
        console.log("User information is not available.");
        loadingScreen.style.display = 'none'; // إخفاء شاشة التحميل
    }
});
