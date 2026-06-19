import { redirectUserIfLoggedOut } from "./authGuard.js";
import {
  auth,
  collection,
  db,
  deleteDoc,
  deleteUser,
  doc,
  getDocs,
  onAuthStateChanged,
  signOut,
  query,
  where,
} from "./firebaseConfig.js";

const signOutBtn = document.querySelector("#signout-btn");
const deleteAccBtn = document.querySelector("#deleteAcc-btn");

let currentUserData = null;
let userId = null;

redirectUserIfLoggedOut(); // authGuard check

// 01. get uid from local storage
const getUidFromLocalStorage = () => {
  userId = JSON.parse(window.localStorage.getItem("uid"));
  console.log("uid is :", userId);
};
getUidFromLocalStorage();

// 04. delete user request from database
let deleteUserFromDatabase = async () => {
  try {
    await deleteDoc(doc(db, "Learning-DB", currentUserData.id));
    console.log("User deleted successfully from database.");
  } catch (error) {
    console.error(new Error("Failed to delete user from database!"));
    console.error(error);
  }
};

// Complete User Account Request
let deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;

    // Deleted User From Database Request
    await deleteUserFromDatabase();

    // 05. Delete User From Authentication Request
    await deleteUser(user).then(() => {

      console.log("User deleted from database successfully");
      console.log("User deleted from authentication successfully");
      
      // Remove uid and redirect User to Register page 
      window.localStorage.removeItem("uid");
      window.location.replace("./index.html");
    });

    // *** BELOW COMMENTED CODE IS NOT WORKING BECAUSE USER DELETD FROM AUTHENTICATION FIRST THEN FROM DATABASE AND FOR SOME REASON FIREBASE STOPS THE DELETION OF USER FROM DATABASE *** //

    // SIR SE POOCHNA HAI IS KA

    // await deleteUser(user).then(() => {
    //   // delete user from authenication
    //   console.log("user deleted from authentication successfully.");

    //   deleteUserFromDatabase().then(() => {
    //     console.log("user deleted from database successfully.");

    //     window.localStorage.removeItem("uid");
    //     window.location.replace("./index.html");
    //   });
    // });
  } catch (error) {
    console.error(new Error("Delete Account Request Failed!"));
    console.error(error);
  }
};

// 02. Get User from Database using uid
let getUserFromDatabase = async () => {
  try {
    const q = query(collection(db, "Learning-DB"), where("uid", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, doc.data());

      currentUserData = { // storing fetched User data in an object
        id: doc.id,
        ...doc.data(),
      };
    });
  } catch (error) {
    console.error(new Error("Request Failed to get user from database!"));
    console.error(error);
  }
};

getUserFromDatabase().then(() => {
  // greetingUser is h1 tag
  const greetingUser = document.querySelector("#greeting-user");

  console.log("Got User from database successfully.");
  console.log(currentUserData);

  // in case User data not found/fetched 
  if(!currentUserData){
    greetingUser.innerText = "Hello User";
    return;
  }

  // getting username from fetched email
  const splittedEmail = currentUserData.email.split("@");
  const emailBeforeAt = splittedEmail[0];
  const userName = emailBeforeAt[0].slice(0,1).toUpperCase() + emailBeforeAt.slice(1);

  greetingUser.innerText = `Hello ${userName}`;
  
});

// Event listener
deleteAccBtn.addEventListener("click", () => {
  deleteUserAccount();
});

// 03. signOut User Request
let userSignOut = async () => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Signed out successfully.");

      window.location.replace("./login.html");
      window.localStorage.removeItem("uid");
    })
    .catch((error) => {
      console.error(new Error("Sign out request failed!"));
      console.log(error);
    });
};

// Event listener
signOutBtn.addEventListener("click", () => userSignOut());
