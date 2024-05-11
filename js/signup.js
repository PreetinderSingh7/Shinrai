import { loadPage } from "../utils/loadpage.js";
import { createUser } from "./localstorage.js";

const signupForm = document.getElementById("signup-form");
const username = document.querySelector('#signup-form [name="user_name"]');
const email = document.querySelector('#signup-form [name="user_email"]');
const password = document.querySelector('#signup-form [name="user_password"]');
const re_password = document.querySelector('#signup-form [name="user_re_password"]');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!username.value || !email.value || !password.value || !re_password.value) {
        alert('please fill all the fields');
        return;
    }
    if (password.value !== re_password.value) {
        alert("password mismatch");
        return;
    }
    const isCreated = createUser(username.value, email.value, password.value);
    if(!isCreated) {
        alert('user already exists');
        return;
    }
    alert('user created successfully');
    setTimeout(() => loadPage('#'));
    return;
})