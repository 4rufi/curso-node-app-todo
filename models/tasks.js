const Task = require('./task');
class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  makeTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  uploadTaskFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  completeList() {
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}.`.green;
      const { desc, completeIn } = task;
      const state = completeIn ? 'Completado'.green : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listPendingComplete(completed = true) {
    let count = 0;
    this.listArr.forEach((task) => {
      const { desc, completeIn } = task;
      const validate = completed ? 'Completado'.green : 'Pendiente'.red;
      const state = completeIn ? 'Completado'.green : 'Pendiente'.red;

      if (validate === state) {
        count += 1;
        const idx = `${count}.`.green;
        const StateCompleted = completed ? completeIn : state;
        console.log(`${idx} ${desc} :: ${StateCompleted.green}`);
      }
    });
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completeIn) {
        task.completeIn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completeIn = null;
      }
    });
  }
}

module.exports = Tasks;
