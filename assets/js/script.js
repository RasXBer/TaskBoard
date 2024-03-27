// Retrieve tasks and nextId from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = JSON.parse(localStorage.getItem('nextId'));

document.querySelector("#task-form").addEventListener("submit", saveTask)


function saveTask(e) {
  e.preventDefault()
  let task = {}
  task.title = document.querySelector("#task-title").value.trim()
  task.description = document.querySelector("#task-description").value.trim()
  task.dueDate = document.querySelector("#task-deadline").value.trim()
  let date = new Date
  let newId = date.getTime()
  task.id=newId
  console.log(task)
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))
  let taskCard = createTaskCard(task)
  $('.task-board').append(taskCard);
  // $('#formModal').css('display', 'none')
}

function generateTaskId() {
  // if nextId does not exist in localStorage, set it to 1
  if (nextId === null) {
    nextId = 1;
    // otherwise, increment it by 1
  } else {
    nextId++;
  }
  // save nextId to localStorage
  localStorage.setItem('nextId', JSON.stringify(nextId));
  return nextId;
}

function createTaskCard(task) {
  // create card elements
  const taskCard = $('<div>')
    .addClass('card w-75 task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  //cardDeleteBtn.on('click', handleDeleteTask);

  // set card background color based on due date
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // append card elements
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}


// Todo: create a function to render the task list and make cards draggable

// Function to render the task list
function renderTaskList() {


  tasks.forEach(task => {
    let taskCard = createTaskCard(task)
    $('.task-board').append(taskCard);
  });
}

// Make task cards draggable
$(document).ready(function () {
  renderTaskList();

  $('.task-card').draggable({
    cursor: 'move',
    zIndex: 100,
    snap: true
  });

  $(".lane").droppable({
    accept: '.card',
    drop: function(e, ui){
      let droppedTask = ui.draggable;
      let colId = $(this).attr('id');
      let title = droppedTask.find('.card-title').text()
      updateTaskStatus(title, colId)
      $(this).find(".card-body").append(droppedTask)
    }
  })
});

