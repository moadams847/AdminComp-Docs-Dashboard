class Data {
  constructor(typeOfData) {
    this.typeOfData = db.collection(typeOfData);
    this.unsub;
  }

  getData(callback) {
    this.unsub = this.typeOfData
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data(), change.doc.id);
          } else if (change.type === "removed") {
            callback(change.doc.id);
          }
        });
      });
  }

  async addData(question, answer, author) {
    const now = new Date();
    const data = {
      question,
      answer,
      author,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.typeOfData.add(data);
    return response;
  }

  async deleteData(id) {
    const response = await this.typeOfData.doc(id).delete();
    return response;
  }

  async editData(id, question, answer, author) {
    const now = new Date();
    const response = await this.typeOfData.doc(id).update({
      question,
      answer,
      author,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    });
    return response;
  }

  async editDataAbout(about, id) {
    const now = new Date();
    const response = await this.typeOfData.doc(id).update({
      about,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    });
    return response;
  }

  async getSingleRecord(id) {
    const response = await this.typeOfData.doc(id).get();
    return response;
  }
}
