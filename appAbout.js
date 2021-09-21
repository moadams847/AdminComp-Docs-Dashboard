// dom queries
const row = document.querySelector(".renderData");
const aboutForm = document.querySelector(".aboutForm");

// dom events
row.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    aboutForm.classList.remove("d-none");
    const id = e.target.parentElement.getAttribute("data-id");
    const textFromCard =
      e.target.parentElement.children[0].children[0].children[0].textContent.trim();
    aboutForm.about.value = textFromCard;
    aboutForm.idFromData.value = id;
    aboutForm.idFromData.value.trim();
  }
});

aboutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  aboutForm.classList.add("d-none");
  const about = aboutForm.about.value;
  const id = aboutForm.idFromData.value;

  data
    .editDataAbout(about, id)
    .then(() => {
      console.log("About edited");
      const idFromForm = aboutForm.idFromData.value;
      aboutForm.reset();
      return data.getSingleRecord(idFromForm);
    })
    .then((data) => {
      console.log(data.data(), data.id);
      dataUiAbout.render(data.data(), data.id);
      console.log("UI updated");
    })
    .catch((e) => {
      console.log(e);
    });
});

// class instances
const data = new Data("About");
const dataUiAbout = new DataUiAbout(row);

// class methods
data.getData((data, id) => dataUiAbout.render(data, id));
