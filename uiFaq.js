class DataUi {
  constructor(table) {
    this.table = table;
  }
  clear() {
    this.table.innerHTML = "";
  }

  render(data, id) {
    if (data.created_at) {
      const when = dateFns.format(data.created_at.toDate(), "DD/MM/YYYY");

      let html = `
        <tr data-id="${id}">
        <th scope="row">${id}</th>
        <td class="author">${data.author}</td>
        <td class="date">${when}</td>
        <td class="question">${data.question}</td>
        <td class="answer">${data.answer}</td>
        <td>
          <!-- Button trigger modal -->
    
          <a
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            <i class="fas fa-edit edit"></i>
          </a>
        </td>
        <td><i class="fas fa-trash delete"></i></td>
      </tr>
        
        `;
      this.table.innerHTML += html;
    }
  }

  removeFromDom(id) {
    if (id) {
      const data = Array.from(this.table.children);
      data.forEach((item) => {
        if (item.getAttribute("data-id") === id) {
          item.remove();
        }
      });
    }
  }

  updateDom(data, id) {
    if (id) {
      const dataTable = Array.from(this.table.children);
      dataTable.forEach((item) => {
        if (item.getAttribute("data-id") === id) {
          console.log(item);
          item.children[1].textContent = data.author;
          item.children[3].textContent = data.question;
          item.children[4].textContent = data.answer;
        }
      });
    }
  }
}
