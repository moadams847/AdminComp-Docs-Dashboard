// ---
const table = document.querySelector(".dataAdded");
const form = document.querySelector("form");
const editForm = document.querySelector(".editForm");

// ==========================================================================
// --
// upadate ui in real time when data is edited
const addQuestions = (data, id, index) => {
  let time = data.created_at.toDate();

  let html = `
<tr class="records" data-id="${id}" >
    <th scope="row">${id}</th>
    <td>${data.questions}</td>
    <td>${data.answers}</td>
    <td>${time}</td>
    <td class="">
    <i
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      data-bs-whatever="@mdo"
      class="far edit fa-lg fa-edit"
    ></i>
  </td>    <td class=""><i class="fas fa-lg fa-trash delete text-danger"></i></td>
    </tr>
`;
  table.innerHTML += html;
};

// ===========================================================================
// ---
// real time listener

// delete data from ui in real time
const deleteQuestions = (id) => {
  const records = document.querySelectorAll(".records");
  records.forEach((record) => {
    if (record.getAttribute("data-id") === id) {
      record.remove();
    }
  });
};

// retrieve data in real time
db.collection("Q&A")
  .orderBy("created_at", "desc")
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change, index) => {
      const doc = change.doc;
      // console.log(change);
      if (change.type === "added") {
        addQuestions(doc.data(), doc.id, index);
      } else if (change.type === "removed") {
        deleteQuestions(doc.id);
      }
    });
  });
// =====================================================================
// ---
// add data to firestore
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const now = new Date();
  const qna = {
    questions: form.question.value,
    answers: form.answer.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection("Q&A")
    .add(qna)
    .then(() => {
      console.log("questions added");
    })
    .catch((err) => {
      console.log(err);
    });
  form.reset();
});

// =====================================================================
// ---
// delete data from firestore on button click
// or get values of edit

table.addEventListener("click", (e) => {
  // delete from firestore
  if (e.target.classList.contains("delete")) {
    console.log("clicked");
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    console.log(id);
    db.collection("Q&A")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Q&A delete");
      });

    // get form values
  } else if (e.target.classList.contains("edit")) {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    const question =
      e.target.parentElement.parentElement.children[1].textContent;
    const answer = e.target.parentElement.parentElement.children[2].textContent;
    editForm.question.value = question;
    editForm.answer.value = answer;
    editForm.id.value = id;
  }
});

// ==========================================================================
//---
// edit ui
const editQuestion = (data, id) => {
  const records = document.querySelectorAll(".records");
  records.forEach((record) => {
    if (record.getAttribute("data-id") === id) {
      let time = data.created_at.toDate();
      record.children[1].textContent = data.questions;
      record.children[2].textContent = data.answers;
      record.children[3].textContent = time;
    }
  });
};

// ---
// update
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = editForm.id.value;
  const now = new Date();
  const qna = {
    questions: editForm.question.value,
    answers: editForm.answer.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };

  // add update to db
  db.collection("Q&A")
    .doc(id)
    .update(qna)
    .then(() => {
      console.log("question edited");
    })
    .catch((err) => {
      console.log(err);
    });

  // query db by id
  // https://stackoverflow.com/a/47876940
  db.collection("Q&A")
    .doc(id)
    .get()
    .then((snapshot) => {
      // console.log(snapshot.data());
      editQuestion(snapshot.data(), id);
    });
});
// ======================================================================
