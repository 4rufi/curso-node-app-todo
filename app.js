require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showListChecklist,
} = require('./helpers/inquirer');
const { saveFile, readFile } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const taskFile = readFile();
  if (taskFile) tasks.uploadTaskFromArray(taskFile);
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await readInput('Descripción');
        tasks.makeTask(desc);
        break;
      case '2':
        tasks.completeList();
        break;
      case '3':
        tasks.listPendingComplete();
        break;
      case '4':
        tasks.listPendingComplete(false);
        break;
      case '5':
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case '6':
        const id = await deleteTaskList(tasks.listArr);
        if (id !== '0') {
          const confirmOk = await confirm('Esta seguro??');
          if (confirmOk) tasks.deleteTask(id);
        }

        break;
    }

    saveFile(tasks.listArr);
    if (opt !== '0') await pause();
  } while (opt !== '0');
};

main();
