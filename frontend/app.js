const API_BASE_URL = 'http://localhost:8080/api/tasks';

const columns = document.querySelectorAll('.column');
const modal = document.getElementById('taskModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');

window.onload = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const tasks = await response.json();
    tasks.forEach(renderTask);
  } catch (error) {
    console.error('Failed to load tasks', error);
  }
};

function renderTask(task) {
  const column = document.querySelector(`.column[data-status="${task.status}"] .task-list`);
  if (!column) return;
  const card = document.createElement('div');
  card.className = 'task-card';
  card.draggable = true;
  card.dataset.id = task.id;
  card.innerHTML = `
    <span class="task-no">${task.taskNo || ''}</span>
    <h3>${task.title}</h3>
    <p>${task.description || ''}</p>
  `;
  card.addEventListener('dragstart', handleDragStart);
  column.appendChild(card);
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
  event.currentTarget.classList.add('dragging');
}

columns.forEach((column) => {
  column.addEventListener('dragover', (event) => {
    event.preventDefault();
    column.classList.add('drag-over');
  });

  column.addEventListener('dragleave', () => column.classList.remove('drag-over'));

  column.addEventListener('drop', async (event) => {
    event.preventDefault();
    column.classList.remove('drag-over');
    const taskId = event.dataTransfer.getData('text/plain');
    const taskCard = document.querySelector(`.task-card[data-id="${taskId}"]`);
    if (!taskCard) return;

    const targetList = column.querySelector('.task-list');
    targetList.appendChild(taskCard);

    try {
      await fetch(`${API_BASE_URL}/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: column.dataset.status })
      });
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  });
});

openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const task = await response.json();
    renderTask(task);
    taskForm.reset();
    modal.classList.add('hidden');
  } catch (error) {
    console.error('Failed to create task', error);
  }
});
