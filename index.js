// ---
const table = document.querySelector(".dataAdded");
const form = document.querySelector("form");
// --
const addQuestions = (data, id, index) => {
  let time = data.created_at.toDate();

  let html = `
<tr class="records" data-id="${id}" >
    <th scope="row">${id}</th>
    <td>${data.questions}</td>
    <td>${data.answers}</td>
    <td>${time}</td>
    <td class=""><i class="far fa-lg fa-edit edit text-dark"></i></td>
    <td class=""><i class="fas fa-lg fa-trash delete text-danger"></i></td>
    </tr>
`;
  table.innerHTML += html;
};

// ---
// real time listener

// delete in real time
const deleteQuestions = (id) => {
  const records = document.querySelectorAll(".records");
  records.forEach((record) => {
    if (record.getAttribute("data-id") === id) {
      record.remove();
    }
  });
};

// retrieve data in real time
const unsub = db.collection("Q&A").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change, index) => {
    const doc = change.doc;
    // console.log(doc.data());
    if (change.type === "added") {
      addQuestions(doc.data(), doc.id, index);
    } else if (change.type === "removed") {
      deleteQuestions(doc.id);
    }
  });
});

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

// delete data from firestore on button click
table.addEventListener("click", (e) => {
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
  }
});
