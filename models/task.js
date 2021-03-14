const { v4: uuidV4 } = require('uuid');
class Task {
  id = '';
  desc = '';
  completeIn = null;

  constructor(desc) {
    this.id = uuidV4();
    this.desc = desc;
    this.completeIn = null;
  }
}

module.exports = Task;
