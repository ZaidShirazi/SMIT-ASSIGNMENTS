import { auth, createUserWithEmailAndPassword } from "./firebaseConfig.js";

const emailInput = document.querySelector("#emailInp");
const passwordInput = document.querySelector("#passwordInp");
const smallDiv = document.querySelector("small");
const resgisterationForm = document.querySelector("#registerationForm");

// 1. Form Validation
const isFormValid = () => {
  const specialCharacters = [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
  ];

  if (emailInput.value.length < 1 || passwordInput.value.length < 1) {
    console.error(new Error("All fields are required!"));
    return false;
  }
  const userEmail = emailInput.value.toLowerCase();
  const userEmail_LastIndex = emailInput.value.length - 1;

  let atFound = false;
  let dotFound = false;
  let hasSpace = false;

  let atCount = 0;
  let atIndex = null;
  let dotIndex = null;

  for (let i = 0; i < userEmail.length; i++) {
    if (userEmail[i] === "@") {
      atCount++;
      atFound = true;
      atIndex = i;
    }

    if (userEmail[i] === ".") {
      dotFound = true;
      dotIndex = i;
    }

    if (userEmail[i] === " ") {
      hasSpace = true;
    }
  }
  // password validation
  let specialCharacterFound = false;
  const password = passwordInput.value;

  for (let i = 0; i < specialCharacters.length; i++) {
    for (let j = 0; j < password.length; j++) {
      if (specialCharacters[i] === password[j]) {
        specialCharacterFound = true;
        break;
      }
    }
    if (specialCharacterFound) {
      break;
    }
  }

  if (
    atCount === 1 &&
    atFound === true &&
    dotFound === true &&
    hasSpace === false &&
    atIndex > 0 &&
    dotIndex !== null &&
    dotIndex > atIndex + 1 &&
    userEmail_LastIndex >= dotIndex + 2 &&
    password.length > 5 &&
    specialCharacterFound === true
  ) {
    return true;
  } else {
    return false;
  }
};

// 2. Create User
const createUser = async () => {
  try {
    smallDiv.innerText = "";
    if (!isFormValid()) {
      smallDiv.innerText = "Invalid email or password!";
      smallDiv.style.color = "red";
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value,
    ).then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      smallDiv.innerText = "Account created successfully.";
      smallDiv.style.color = "green";

      emailInput.value = "";
      passwordInput.value = "";

      console.log(user);
    });
  } catch (error) {
    console.error("Failed to create user account!", error);
  }
};

resgisterationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createUser();
});
