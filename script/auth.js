// setup ui
const loggedIn = document.querySelectorAll(".loggedIn");
const loggedOut = document.querySelectorAll(".loggedOut");
const modalBody = document.querySelector("#modalAc");
const setupUI = (user) => {
  if (user) {
    // account info
    const html = `
    <div class="lead">Logged in as ${user.email}</div>
    `;
    modalBody.innerHTML = html;

    // toggle ui elements
    loggedIn.forEach((item) => {
      item.classList.remove("d-none");
    });
    loggedOut.forEach((item) => {
      item.classList.add("d-none");
    });
  } else {
    //   hide account info
    modalBody.innerHTML = ``;

    //   toggle ui elements
    loggedIn.forEach((item) => {
      item.classList.add("d-none");
    });
    loggedOut.forEach((item) => {
      item.classList.remove("d-none");
    });
  }
};

// auth
// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged In:", user);
    setupUI(user);
  } else {
    console.log("user logged Out");
    setupUI(user);
  }
});

// signup
const AddUserForm = document.querySelector(".AddUserForm");
AddUserForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user infor
  const email = AddUserForm["singnUpemail"].value;
  const password = AddUserForm["singnUppassword"].value;

  // sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      AddUserForm.reset();
      AddUserForm.querySelector(".error").innerHTML = "";
    })
    .catch((e) => {
      AddUserForm.querySelector(".error").innerHTML = e.message;
    });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user signed out");
  });
});

// login
const logginForm = document.querySelector(".logginForm");
logginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = logginForm["loginEmail"].value;
  const password = logginForm["loginPassword"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      logginForm.reset();
      logginForm.querySelector(".error").innerHTML = "";
    })
    .catch((e) => {
      logginForm.querySelector(".error").innerHTML = e.message;
    });
});
