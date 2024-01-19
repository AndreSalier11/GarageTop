function intToFloat(num, decPlaces) { 
    return num.toFixed(decPlaces); 
}
function loadLoginInfo(username, password) {
    const loginInfo = `${username}:${password}`;
    document.cookie = `login=${loginInfo}`;
}

function checkLogin(username, password) {
    // Retrieve cookies
    const cookies = document.cookie.split(';');

    // Loop through cookies
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Check if cookie contains login information
        if (cookie.startsWith('login=')) {
            const loginInfo = cookie.split('=')[1];

            // Check if login matches the provided username and password
            if (loginInfo === `${username}:${password}`) {
                return true; // Login is correct
            }
        }
    }

    return false; // Login is incorrect
}
