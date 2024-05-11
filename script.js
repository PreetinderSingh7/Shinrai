const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");

    signupButton.addEventListener("click", function () {
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(user));
        alert("Account created successfully!");
    });

    loginButton.addEventListener("click", function () {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        const userString = localStorage.getItem(email);

        if (!userString) {
            alert("User does not exist.");
            return;
        }

        const user = JSON.parse(userString);

        if (user.password !== password) {
            alert("Wrong password.");
            return;
        }

        alert("Login successful! Redirecting...");
        window.location.href = "pass.html"; // Redirect to pass.html after successful login
    });
});

