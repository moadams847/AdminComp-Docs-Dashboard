// ---
// console.log(storageRef);
const textForm = document.querySelector(".textForm");
const filesRef = storageRef.child("AminComp-Docs-Files/");
console.log(filesRef);

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
