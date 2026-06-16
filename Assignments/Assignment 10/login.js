import { auth, signInWithEmailAndPassword } from "./firebaseConfig.js";
import { redirectUserIfLoggedIn } from "./authGuard.js";

const emailInput = document.querySelector("#email-Inp");
const passwordInput = document.querySelector("#password-Inp");
const emailErrorDiv = document.querySelector(".email-error");
const passwordErrorDiv = document.querySelector(".password-error");
const loginForm = document.querySelector("#login-Form");

redirectUserIfLoggedIn(); // checking auth guard first

// Form Validation
const isFormValid = () => {
  emailErrorDiv.style.visibility = "hidden";
  passwordErrorDiv.style.visibility = "hidden";

  // email validation logic
  if (emailInput.value.length < 1) {
    emailErrorDiv.style.visibility = "visible";
    emailErrorDiv.innerText = "This field is required!";
    emailErrorDiv.style.color = "red";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(emailInput.value)) {
    emailErrorDiv.style.visibility = "visible";
    emailErrorDiv.innerText = "Please enter a valid email address!";
    emailErrorDiv.style.color = "red";
    return false;
  }

  // password validation logic
  if (passwordInput.value.length < 1) {
    passwordErrorDiv.style.visibility = "visible";
    passwordErrorDiv.innerText = "This field is required!";
    passwordErrorDiv.style.color = "red";
    return false;
  }

  if (passwordInput.value.length < 6) {
    passwordErrorDiv.style.visibility = "visible";
    passwordErrorDiv.innerText = "Password should be at least 6 characters!";
    passwordErrorDiv.style.color = "red";
    return false;
  }

  // this true returns when all above checks are passed
  return true;
};

const userLogin = async () => {
  const finalMessage = document.querySelector("#final-message");
  try {
    if (!isFormValid()) {
      console.error(new Error("error in form validation!"));
      return;
    }

    await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value,
    ).then((userCredential) => {
      // Logged in successfully
      const user = userCredential.user;
      window.localStorage.setItem("uid", JSON.stringify(user.uid));

      emailInput.value = "";
      passwordInput.value = "";

      console.log("login successful");
      console.log(user);

      window.location.replace("./dashboard.html");
    });
  } catch (error) {
    console.error("Login failed!", error);

    if (error.code === "auth/invalid-credential") {
      finalMessage.innerText = "Login Failed, Invalid credentials!";
      finalMessage.style.color = "red";
      finalMessage.style.visibility = "visible";

      setTimeout(() => {
        finalMessage.style.visibility = "hidden";
        finalMessage.innerText = "";
      }, 3000);
    }
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  userLogin();
});
