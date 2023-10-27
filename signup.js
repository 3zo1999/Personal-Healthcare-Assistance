function showLoginForm() {
    var loginForm = document.getElementById("loginForm");
    var loginButton = document.getElementById("loginButton");

    loginForm.style.display = "block";
    loginButton.style.display = "none";
}

function showSignupForm() {
    var signupForm = document.getElementById("signupForm");
    var signupButton = document.getElementById("signupButton");

    signupForm.style.display = "block";
    signupButton.style.display = "none";
}