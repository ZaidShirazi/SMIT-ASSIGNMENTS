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

redirectUserIfLoggedOut();

// get uid from local storage
const getUidFromLocalStorage = () => {
  userId = JSON.parse(window.localStorage.getItem("uid"));
  console.log("uid = >", userId);
};
getUidFromLocalStorage();

// delete user request from database
let deleteUserFromDatabase = async () => {
  try {
    await deleteDoc(doc(db, "Learning-DB", currentUserData.id));
    console.log("User deleted successfully from database.");
  } catch (error) {
    console.error(new Error("Failed to delete user from database!"));
    console.error(error);
  }
};

// delete user account request
let deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;

    await deleteUser(user).then(() => {
      // delete user from authenication
      console.log("user deleted from authentication successfully.");
      deleteUserFromDatabase().then(() => {
        window.localStorage.removeItem("uid");
        window.location.replace("./index.html");
      });
    });
  } catch (error) {
    console.error(new Error("Delete Account Request Failed!"));
    console.error(error);
  }
};

// get user from database using uid
let getUserFromDatabase = async () => {
  try {
    const q = query(collection(db, "Learning-DB"), where("uid", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id, doc.data());
      currentUserData = {
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
  console.log("Got User from database successfully.");
  console.log(currentUserData);
});

deleteAccBtn.addEventListener("click", () => {
  deleteUserAccount();
});

// sign out user
let userSignOut = async () => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("success on sign out");
      window.location.replace("./login.html");
      window.localStorage.removeItem("uid");
    })
    .catch((error) => {
      // An error happened.
      console.error(new Error("signout request failed!"));
      console.log(error);
    });
};

signOutBtn.addEventListener("click", () => userSignOut());
