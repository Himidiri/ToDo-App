let todoTasks = [];

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  let userInputElement = document.getElementById("userInput");
  let userInput = userInputElement.value;

  if (userInput == "") {
    Swal.fire({
      icon: "warning",
      title: "Empty Input",
      text: "Please enter Your Task.",
    });
    return;
  }

  let taskId = todoTasks.length + 1;

  todoTasks.push({ id: taskId, text: userInput });

  document.getElementById("addTask").innerHTML += `
    <li class="list-group-item mt-3" id="todoTask-${taskId}"> 
        <input class="form-check-input me-1" type="checkbox" id="checkbox-${taskId}"> 
        <label class="form-check-label" for="checkbox-${taskId}">${userInput}</label> 
    </li>`;

  userInputElement.value = "";

  document
    .getElementById(`checkbox-${taskId}`)
    .addEventListener("change", function () {
      taskToDone(taskId);
    });
}

function taskToDone(taskId) {
  let taskElement = document.getElementById(`todoTask-${taskId}`);

  if (taskElement) {
    let taskText = todoTasks.find((task) => task.id === taskId)?.text;

    document.getElementById("task").innerHTML += `
        <li class="list-group-item mt-3">${taskText}</li>`;

    taskElement.remove();

    todoTasks = todoTasks.filter((task) => task.id !== taskId);
  }
}
