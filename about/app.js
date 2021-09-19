// dom queries
const tableOutPut = document.querySelector(".tableOutPut");

// class instances
const data = new Data("FAQ");
const dataUi = new DataUi(tableOutPut);

data.getData((data, id) => {
  dataUi.render(data, id);
});
