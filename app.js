document.getElementById('fetchUserData').addEventListener('click', function() {
  const userId = 12345; // يمكن تخصيص userId لكل مستخدم

  fetch(`https://your-api-url.com/user/${userId}`) // استبدل الرابط بعنوان API النهائي
    .then(response => response.json())
    .then(userData => {
      const userInfoDiv = document.getElementById('userInfo');
      if (userData) {
        userInfoDiv.innerHTML = `
          <p><strong>UUID:</strong> ${userData.uuid}</p>
          <p><strong>First Name:</strong> ${userData.firstName}</p>
          <p><strong>User ID:</strong> ${userData.userId}</p>
          <p><strong>Points:</strong> ${userData.points}</p>
          <p><strong>Mohtk:</strong> ${userData.mohtk}</p>
          <p><strong>Sex:</strong> ${userData.sex}</p>
          <p><strong>Age:</strong> ${userData.age}</p>
          <p><strong>Referral Link:</strong> ${userData.referralLink}</p>
          <p><strong>Notifications:</strong> ${userData.notifications}</p>
          <p><strong>Ban:</strong> ${userData.ban}</p>
          <p><strong>Save Time:</strong> ${new Date(userData.saveTime).toLocaleString()}</p>
        `;
      } else {
        userInfoDiv.innerHTML = `<p>User data not found</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      document.getElementById('userInfo').innerHTML = `<p>Error loading user data</p>`;
    });
});
