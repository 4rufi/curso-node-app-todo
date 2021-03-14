const inquirer = require('inquirer');
require('colors');

const askOpt = [
  {
    type: 'list',
    name: 'opt',
    message: 'Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1'.green}. Crear Tarea`,
      },
      {
        value: '2',
        name: `${'2'.green}. Listar Tareas`,
      },
      {
        value: '3',
        name: `${'3'.green}. Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4'.green}. Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5'.green}. Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6'.green}. Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0'.green}. Salir`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log('========================'.green);
  console.log(' Seleccione una Opcion  '.white);
  console.log('========================\n'.green);

  const { opt } = await inquirer.prompt(askOpt);
  return opt;
};

const pause = async () => {
  question = [
    {
      type: 'input',
      name: 'inputOpt',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) return 'Por favor ingrese una opción';
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const deleteTaskList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0'.green + ' Cancelar',
  });
  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completeIn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  confirm,
  deleteTaskList,
  inquirerMenu,
  pause,
  readInput,
  showListChecklist,
};
