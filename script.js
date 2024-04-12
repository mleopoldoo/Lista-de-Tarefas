// capiturando os elementos do DOM
const form = document.querySelector('.form__container');
const titleTask = form.querySelector('#input_title');
const typeTask = form.querySelector('.form__input--priority');

const tasks = [
  { title: 'Comprar comida para o gato', type: 'Urgente' },
  { title: 'Consertar Computador', type: 'Importante' },
  { title: 'Beber água', type: 'Normal' },
  { title: 'Enviar relatório trimestral', type: 'Importante' },
  { title: 'Fazer exercícios físicos', type: 'Normal' },
  { title: 'Agendar consulta médica', type: 'Urgente' },
  { title: 'Ler pelo menos um capítulo de um livro', type: 'Normal' },
  { title: 'Limpar a despensa', type: 'Importante' },
  { title: 'Pagar a conta de energia', type: 'Urgente' },
  { title: 'Assistir a um documentário interessante', type: 'Normal' },
];

// funcao resposavel por criar elementos DOM
const createElement = (element, classlist) => {
  let elementCreated = document.createElement(element);
  classlist ? elementCreated.classList.add(classlist) : elementCreated;

  return elementCreated;
};

// funcao resposanvel por adicionar o type da task
const addTypeToTask = (typeTask) => {
  const spanElement = createElement('span', 'task-type');

  switch (typeTask) {
    case 'Urgente':
      spanElement.classList.add('span-urgent');
      break;
    case 'Importante':
      spanElement.classList.add('span-important');
      break;
    case 'Normal':
      spanElement.classList.add('span-normal');
  }

  return spanElement;
};

// funcao para criar items da lista
const createTaskItem = ({ title, type }) => {
  const liElement = createElement('li', 'task__item');
  const divElement = createElement('div', 'task-info__container');
  const spanElement = addTypeToTask(type);
  const pElement = createElement('p');
  const btnElement = createElement('button', 'task__button--remove-task');

  pElement.innerText = title;

  divElement.append(spanElement, pElement);
  liElement.append(divElement, btnElement);

  return liElement;
};

// funcao que remove items da lista pelo seu indece
const removeTask = (element, index) => {
  element.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderElements(tasks);
  });
};

// funcao que captura os botoes de deletar tarefa caso exista algum
const loadBtnsRemoveTask = () => {
  if (tasks.length === 0) {
    return;
  }

  const allBtnsRemoveTask = document.querySelectorAll(
    '.task__button--remove-task',
  );

  allBtnsRemoveTask.forEach((element, index) => {
    removeTask(element, index);
  });
};

loadBtnsRemoveTask();

const renderElements = (tasks) => {
  const ul = document.querySelector('.tasks__list');
  ul.innerHTML = '';

  tasks.forEach((element) => {
    ul.appendChild(createTaskItem(element));
  });

  loadBtnsRemoveTask();
};

// escutador de evento para o formulário
// OBS: nao adicionei os eventos pelo HTML pq uso eslint global e nao queria mecher nas regras
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleTaskValue = titleTask.value;
  const typeTaskValue = typeTask.value;

  if (titleTaskValue === '') {
    alert('Adicione um titulo para a tarefa');
    return;
  } else if (typeTaskValue === '') {
    alert('Selecione um tipo para a tarefa');
    return;
  }

  const newTask = { title: titleTaskValue, type: typeTaskValue };

  tasks.push(newTask);

  titleTask.value = '';
  typeTask.value = '';

  renderElements(tasks);
});

renderElements(tasks);
