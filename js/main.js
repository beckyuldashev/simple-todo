const todoInput = document.querySelector('.todo__input');
const todoAddBtn = document.querySelector('.todo__add');
const todoContainer = document.querySelector('.todo__list');
const todoList = [];


function addTask(text) {
  const task = {
    text,
    done: false,
    id: `${Math.random()}`
  };

  todoList.push(task);
}

function deleteTask(id) {
  todoList.forEach(task => {
    if(task.id === id) {
      task.done = true;
    }
  });
}

function renderTask() {
  let html = '';

  todoList.forEach(task => {
    if(!task.done) {
      html += `
        <li class="todo__list-item">
          <p class="todo__list-text">${task.text}</p>
          <button class="todo__list-done" data-id="${task.id}">Сделано</button>
        </li>
      `;
    }
  });

  todoContainer.innerHTML = html;
  todoInput.value = '';
}

function addTaskToList() {
  const inputValue = todoInput.value;
  if (inputValue === '') return;
  addTask(inputValue);
  renderTask();
}


todoAddBtn.addEventListener('click', addTaskToList);

document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    addTaskToList();
  }
});

todoContainer.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName === 'BUTTON' && target.dataset.id) {
    deleteTask(target.dataset.id);
    renderTask();
  }
});