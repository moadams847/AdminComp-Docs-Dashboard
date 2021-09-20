class DataUiAbout {
  constructor(row) {
    this.row = row;
  }

  render(data, id) {
    if (data.created_at) {
      const when = dateFns.format(data.created_at.toDate(), "DD/MM/YYYY");

      let html = `
      <div data-id="${id}" class="col-md-8">
      <div class="card bg-light">
        <div class="card-body">
          <p class="card-text">
            ${data.about}
          </p>

          <div class="float-end mt-1"><small>${when}</small></div>
        </div>
      </div>
      <a class="btn btn-primary mt-3">Edit About</a>
      </div>
  </div>
  `;
      this.row.innerHTML = html;
    }
  }
}
