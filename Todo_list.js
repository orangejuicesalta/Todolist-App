
//Selectors
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const todayDate = document.getElementById("today-date");
const tasksCount = document.getElementById("task-left");

let todolist = new ToDoList();

let now = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
todayDate.innerText = now;

addTask.addEventListener("click", function () {
  let task = document.createElement("div");
  task.classList.add("task");

  //add the creation and completetion time
  let time = document.createElement("div");
  time.classList.add("task-time-container");

  let createdTime = document.createElement("li");
  createdTime.classList.add("created-time");
  time.appendChild(createdTime);

  let completedTime = document.createElement("li");
  completedTime.classList.add("completed-time");
  time.appendChild(completedTime);

  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;

  let completeButton = document.createElement("button");
  completeButton.innerHTML = "&#10004;";
  completeButton.setAttribute('onclick', `completeTask(event)`);
  completeButton.classList.add("complete-task");  
  

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#10006;";
  deleteButton.setAttribute("onclick", `removeTask(event)`);
  deleteButton.classList.add("delete-task");

  let elements = [time,li,completeButton, deleteButton];
  for(let element of elements) task.appendChild(element);


  if (inputTask.value === "" || inputTask.value === " ") {
    alert("Please Enter a task");
  } else {
    taskContainer.appendChild(task); //task created
    let item = todolist.add(inputTask.value); //task obj returned
    task.setAttribute("id", `${item.id}`); //it has unique id added
    createdTime.innerText = `Created: ${item.createdAt}`;
  }

  inputTask.value = "";
  tasksRemained(todolist);
});

tasksRemained(todolist);


let dom = new DOM();

function removeTask(event) {
  let id = dom.findParentId(event.target);
  let targetElement = dom.getParentElementbyId(id);
  targetElement.remove();
  todolist.remove(id);
  tasksRemained(todolist);
}

function completeTask(event) {
  let id = dom.findParentId(event.target);
  let targetParentElement = dom.getParentElementbyId(id);
  let task = todolist.findIndexById(Number(id));
  dom.completeToggle(task, targetParentElement);
}

function tasksRemained(todolist) {
  let amount = todolist.items.length;
  if (amount === 1 || amount === 0) tasksCount.innerText = `${amount} task`;
  if (amount > 1) tasksCount.innerText = `${amount} tasks`;
  return amount;
}