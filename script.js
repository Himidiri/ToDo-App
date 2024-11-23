let todoTasks = [];
let doneTasks = [];

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    let userInputElement = document.getElementById("userInput");
    let userInput = userInputElement.value;

    if (userInput === "") {
        Swal.fire({
            icon: "warning",
            title: "Empty Input",
            text: "Please enter Your Task.",
        });
        return;
    }

    let taskId = todoTasks.length + 1;

    todoTasks.push({ id: taskId, text: userInput, isChecked: false });

    let taskItemHTML = `
    <li class="list-group-item mt-3" id="todoTask-${taskId}"> 
      <input class="form-check-input me-1" type="checkbox" id="checkbox-${taskId}" ${false ? 'checked' : ''}> 
      <label class="form-check-label" for="checkbox-${taskId}">${userInput}</label> 
    </li>`;

    document.getElementById("addTask").insertAdjacentHTML("beforeend", taskItemHTML);

    userInputElement.value = "";

    if (doneTasks.find(task => task.id === taskId && task.isChecked)) {
        document.getElementById("task").insertAdjacentHTML("beforeend", `
      <li class="list-group-item mt-3" id="doneTask-${taskId}">${userInput}</li>
    `);
    }
}

document.getElementById("addTask").addEventListener("change", function (event) {
    if (event.target && event.target.type === "checkbox") {
        let taskId = parseInt(event.target.id.replace('checkbox-', ''));
        let isChecked = event.target.checked;
        handleTaskCheckboxChange(taskId, isChecked);
    }
});

function handleTaskCheckboxChange(taskId, isChecked) {
    let task = todoTasks.find((task) => task.id === taskId);
    task.isChecked = isChecked;

    let taskText = task.text;

    let taskLabel = document.querySelector(`#todoTask-${taskId} .form-check-label`);

    if (isChecked) {
        taskLabel.classList.add("strikethrough");

        document.getElementById("task").insertAdjacentHTML("beforeend", `
      <li class="list-group-item mt-3" id="doneTask-${taskId}">${taskText}</li>
    `);
    } else {
        taskLabel.classList.remove("strikethrough");

        let doneTaskElement = document.getElementById(`doneTask-${taskId}`);
        if (doneTaskElement) {
            doneTaskElement.remove();
        }
    }
}
