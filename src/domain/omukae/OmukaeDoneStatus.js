class OmukaeDoneStatus {
  #value;

  constructor(doneNumber) {
    this.#value = doneNumber > 0;
  }

  isDone() {
    return this.#value;
  }
}

module.exports = OmukaeDoneStatus;
