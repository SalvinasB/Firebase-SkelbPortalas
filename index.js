import { app } from "./firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const database = getDatabase(app);
const auth = getAuth();

const menuRegBtn = document.getElementById("menu-reg");
const menuLogBtn = document.getElementById("menu-log");
const menuSignOutBtn = document.getElementById("signout-button");

const regContainer = document.getElementById("reg-container");
const logContainer = document.getElementById("log-container");

const regEmailInput = document.getElementById("register-email");
const regPasswordInput = document.getElementById("register-password");
const registerButton = document.getElementById("register-button");

const logEmailInput = document.getElementById("login-email");
const logPasswordInput = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");

const panel = document.createElement("img");
const infoSection = document.getElementById("info");

menuRegBtn.addEventListener("click", () => {
  regContainer.style.display = "block";
  logContainer.style.display = "none";
});

menuLogBtn.addEventListener("click", () => {
  logContainer.style.display = "block";
  regContainer.style.display = "none";
});

const authorizationFunc = (user) => {
  if (user) {
    const uid = user.uid;

    get(child(ref(database), "users/" + uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersFromDB = snapshot.val();
          const userRole = usersFromDB.role;

          if (userRole === "admin") {
            console.log("Tu valdai visa svetaine");
            panel.src =
              "https://images.squarespace-cdn.com/content/v1/5cb0a84934c4e2eb7d8169ec/1626360426664-LFTXLIFF86GD0Z7VFTI1/Admin+Panel.png";
            panel.alt = `${userRole} panel image`;
            infoSection.appendChild(panel);
            menuRegBtn.style.display = "none";
            menuLogBtn.style.display = "none";
            menuSignOutBtn.style.display = "block";
          } else {
            console.log("Esi tik akmenlelis ant zemeles");
            panel.src =
              "https://ps.w.org/simple-user-listing/assets/icon-256x256.png?rev=3061308";
            panel.alt = `${userRole} panel image`;
            infoSection.appendChild(panel);
            menuRegBtn.style.display = "none";
            menuLogBtn.style.display = "none";
            menuSignOutBtn.style.display = "block";
          }
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Vartotajas neprisijunges");
  }
};

// registracija
registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(regEmailInput.value, regPasswordInput.value);

  const email = regEmailInput.value;
  const password = regPasswordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const loginTime = new Date();

      set(ref(database, "users/" + user.uid), {
        email: email,
        role: "simple",
        timestamp: `${loginTime}`,
      })
        .then(() => {
          console.log("Vartotojo duomenys issaugoti");
          onAuthStateChanged(auth, authorizationFunc);
          regContainer.style.display = "none";
        })
        .catch((err) => {
          console.log("Klaida saugant duomenis", err);
        });
      email.value = "";
      password.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

// prisijungimas
loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const email = logEmailInput.value.trim();
  const password = logPasswordInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const loginTime = new Date();

      update(ref(database, "users/" + user.uid), {
        timestamp: `${loginTime}`,
      });
      logContainer.style.display = "none";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
onAuthStateChanged(auth, authorizationFunc);
//Atsijungimas

menuSignOutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      // Sign-out successful.

      panel.remove();
      menuRegBtn.style.display = "initial";
      menuLogBtn.style.display = "initial";
      menuSignOutBtn.style.display = "none";
    })
    .catch((error) => {
      // An error happened.
    });
});

