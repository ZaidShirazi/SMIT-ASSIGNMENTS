import { auth, onAuthStateChanged } from "./firebaseConfig.js";

export function redirectUserIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user

      // redirecting the user to dashboard if found
      window.location.replace("./dashboard.html");
      //...
    }
  });
}

export function redirectUserIfLoggedOut() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user

      // redirecting to signup page if user is not found
      window.location.replace("./index.html");
      //...
    }
  });
}
