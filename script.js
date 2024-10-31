document.addEventListener('DOMContentLoaded', async function () {
    // استخراج userId من الرابط
    const userId = new URLSearchParams(window.location.search).get("user_id");
    if (!userId) {
        alert("User ID not found");
        return;
    }

    // طلب بيانات المستخدم باستخدام userId
    try {
        const response = await fetch(`/user/${userId}`);  // افترض أن لديك مسار API لاسترجاع البيانات
        const userData = await response.json();

        // عرض بيانات المستخدم
        document.getElementById('user-info').innerHTML = `
            <p><strong>UUID:</strong> ${userData.uuid}</p>
            <p><strong>First Name:</strong> ${userData.firstName}</p>
            <p><strong>User ID:</strong> ${userData.userId}</p>
            <p><strong>Points:</strong> ${userData.points}</p>
        `;

        // إخفاء شاشة التحميل وإظهار المحتوى
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } catch (error) {
        console.error("Error loading user data:", error);
        alert("Failed to load user data.");
    }
});
