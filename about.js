// ---
const cardContent = document.querySelector(".cardContent");
const aboutForm = document.querySelector(".aboutForm");

// ---
const updateUi = (data, id, index) => {
  let time = data.created_at.toDate();

  let html = `  
  <div data-id="${id}" class="holdCardBtn">
  <div class="card bg-light">
  <div class="card-body">
    <p class="card-text lead mb-1">
     ${data.about}
    </p>
    <small class="float-end time">create on: ${time}</small>
  </div>
</div>
<!--  -->
<div class="mt-3">
<button class="btn btn-primary edit">Edit</button>
</div>
</div>
`;
  cardContent.innerHTML += html;
};

// ---
const editAbout = (data, id) => {
  let timeFromDB = data.created_at.toDate();

  let aboutIntUI = document.querySelector(".holdCardBtn");
  if (aboutIntUI.getAttribute("data-id") === id) {
    const cardText = document.querySelector(".card-text");
    const time = document.querySelector(".time");
    cardText.textContent = data.about;
    timeFromDB = `create on: ${timeFromDB}`;
    time.textContent = timeFromDB;
  }
};

// ---
// retrieve data in real time
db.collection("About")
  .orderBy("created_at", "desc")
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change, index) => {
      const doc = change.doc;
      // console.log(change);
      if (change.type === "added") {
        updateUi(doc.data(), doc.id, index);
        console.log(doc.data(), doc.id);
      } else if (change.type === "modified") {
        editAbout(doc.data(), doc.id);
      }
    });
  });

// ---
cardContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const text =
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
        .firstElementChild.textContent;

    aboutForm.about.value = text.trim();
  }
});

// ---
aboutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const aboutInListener = document.querySelector(".holdCardBtn");
  const id = aboutInListener.getAttribute("data-id");
  const now = new Date();

  const about = {
    about: aboutForm.about.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };

  if (about.about) {
    // console.log(about);

    // add update to db
    db.collection("About")
      .doc(id)
      .update(about)
      .then(() => {
        console.log("question edited");
      })
      .catch((err) => {
        console.log(err);
      });

    //
    aboutForm.reset();
  }
});
