// dom queries----------------------------------------------------------------
const tableOutPut = document.querySelector(".tableOutPut");
const addForm = document.querySelector(".addForm");
const EditForm = document.querySelector(".EditForm");
// dom events-----------------------------------------------------------------
// add data
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = addForm.question.value.trim();
  const answer = addForm.answer.value.trim();
  const author = addForm.author.value.trim();
  data
    .addData(question, answer, author)
    .then(() => {
      addForm.reset();
      console.log("data added");
    })
    .catch((e) => {
      console.log(e);
    });
});

// delete and edit data
tableOutPut.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    data
      .deleteData(id)
      .then(() => {
        console.log("data delete");
      })
      .catch((e) => {
        console.log(e);
      });
  } else if (e.target.classList.contains("edit")) {
    const id =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      );

    const elements =
      e.target.parentElement.parentElement.parentElement.children;

    const author = elements[1].textContent;
    const question = elements[3].textContent;
    const answer = elements[4].textContent;

    EditForm.author.value = author;
    EditForm.question.value = question;
    EditForm.answer.value = answer;
    EditForm.dataId.value = id;
  }
});

// edit data submit event
EditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = EditForm.author.value;
  const question = EditForm.question.value;
  const answer = EditForm.answer.value;
  const id = EditForm.dataId.value;

  data
    .editData(id, question, answer, author)
    .then((id) => {
      console.log("data edited");
      return data.querySingleRecord(id);
    })
    .then((data) => {
      console.log(data.doc.data());
    })
    .catch((e) => {
      console.log(e);
    });
});

// class instances----------------------------------------------------------
const data = new Data("FAQ");
const dataUi = new DataUi(tableOutPut);

// class methods-------------------------------------------------------------
data.getData((id) => dataUi.removeFromDom(id));
data.getData((data, id) => dataUi.render(data, id));
