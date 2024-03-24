// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

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
    cardDeleteBtn.on('click', handleDeleteTask);
  
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
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskCard = `
            <div class="task-card" id="task-${task.id}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Deadline: ${taskDueDatee}</p>
            </div>
        `;
        $('.task-board').append(taskCard);
    });
}

// Make task cards draggable
$(document).ready(function() {
    renderTaskList();

    $('.task-card').draggable({
        containment: '.task-board',
        cursor: 'move',
        snap: true
    });
});
  
// Todo: create a function to create a task card 
$(".btn-success").click(function(){

  $('#myModal').css('display', 'block')
});


// $(document).on('click', '.btn-success', function() {
//   $('#myModal').css('display', 'block');
// });