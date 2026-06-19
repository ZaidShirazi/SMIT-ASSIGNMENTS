import { redirectUserIfLoggedIn } from "./authGuard.js";
import {
  auth,
  createUserWithEmailAndPassword,
  addDoc,
  collection,
  db,
  onAuthStateChanged,
} from "./firebaseConfig.js";

const emailInput = document.querySelector("#emailInp");
const passwordInput = document.querySelector("#passwordInp");
const emailErrorDiv = document.querySelector(".email-error");
const passwordErrorDiv = document.querySelector(".password-error");
const resgisterationForm = document.querySelector("#registerationForm");

// redirectUserIfLoggedIn(); // checking auth guard first
/*
 this auth guard is creating issues in creating user in database so user logged in but cannot get the data because data is not created in data so get data function fails to fetch user data
*/

//Form Validation
const isFormValid = () => {
  emailErrorDiv.style.visibility = "hidden";
  passwordErrorDiv.style.visibility = "hidden";

  // length validation logic
  if (emailInput.value.length < 1) {
    emailErrorDiv.style.visibility = "visible";
    emailErrorDiv.innerText = "This field is required!";
    emailErrorDiv.style.color = "red";
    return false;
  }

  if (passwordInput.value.length < 1) {
    passwordErrorDiv.style.visibility = "visible";
    passwordErrorDiv.innerText = "This field is required!";
    passwordErrorDiv.style.color = "red";
    return false;
  }
  // email validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(emailInput.value)) {
    emailErrorDiv.style.visibility = "visible";
    emailErrorDiv.innerText = "Please enter a valid email address!";
    emailErrorDiv.style.color = "red";
    return false;
  }

  // password validation logic
  if (passwordInput.value.length < 6) {
    passwordErrorDiv.style.visibility = "visible";
    passwordErrorDiv.innerText = "Password should be at least 6 characters.";
    passwordErrorDiv.style.color = "red";
    return false;
  }

  // this true returns when all above checks are passed
  return true;
};

// add user to database
const addUserInDatabase = async (user) => {
  try {
    let userData = {
      uid: user?.uid,
      userName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    };

    await addDoc(collection(db, "Learning-DB"), userData).then(() => {
      console.log("User added in database successfully.");

      // store uid in local storage
      window.localStorage.setItem("uid", JSON.stringify(userData.uid));
    });
  } catch (error) {
    console.error(new Error("Failed to add user in database!"));
    console.error(error);
  }
};

// Create User
const createUser = async () => {
  const finalMessage = document.querySelector("#final-message");

  try {
    if (!isFormValid()) {
      console.error(new Error("Form Validation failed!"));
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value,
    ).then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      addUserInDatabase(user).then(() => {
        emailInput.value = "";
        passwordInput.value = "";

        console.log(user);
        finalMessage.style.visibility = "visible";
        finalMessage.style.color = "lightgreen";
        finalMessage.innerText = "Account created successfully!";

        setTimeout(() => {
          finalMessage.style.visibility = "hidden";
          window.location.replace("./dashboard.html");
        }, 2000);
      });
    });
  } catch (error) {
    console.error("Failed to create user account!", error);

    if (error.code === "auth/email-already-in-use") {
      emailErrorDiv.style.visibility = "visible";
      emailErrorDiv.innerText = "This email address is already registered.";
      emailErrorDiv.style.color = "red";
    }
  }
};

resgisterationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createUser();
});
