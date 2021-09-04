// ---
const table = document.querySelector(".dataAdded");
const form = document.querySelector("form");

// --
const addQuestions = (data, id) => {
  let time = data.created_at.toDate();

  let html = `
<tr>
    <th scope="row">${id}</th>
    <td>${data.questions}</td>
    <td>${data.answers}</td>
    <td>${time}</td>
    </tr>
`;
  table.innerHTML += html;
};

// ---
// real time listener

// delete in real time

// add in real time
const unsub = db.collection("Q&A").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    console.log(doc.data());
    if (change.type === "added") {
      addQuestions(doc.data(), doc.id);
    }
  });
});

// ---
// write to DB / create/add 2
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
