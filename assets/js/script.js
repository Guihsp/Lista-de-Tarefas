const inputTask = document.querySelector(`#input-task`);
const btnAddTask = document.querySelector(`#btn-add`);
const taskList = document.querySelector(`#task-list`);

function createLi() {
    const li = document.createElement(`li`);
    return li;
}

inputTask.addEventListener(`keypress`, function (e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function cleanInput() {
    inputTask.value = ``;
    inputTask.focus();
}

function createDeleteButton(li) {
    const deleteButton = document.createElement(`button`);
    deleteButton.innerText = `Apagar`;
    deleteButton.setAttribute(`class`, `btn-delete`);
    deleteButton.setAttribute(`title`, `Delete task button`);
    li.appendChild(deleteButton);
}

document.addEventListener(`click`, function (event) {
    const element = event.target;

    if (element.classList.contains(`btn-delete`)) {
        element.parentElement.remove();
        saveTask()
    }
})

function createTask(textInput) {
    const li = createLi();
    li.innerHTML = textInput;
    taskList.appendChild(li);
    cleanInput();
    createDeleteButton(li);
    saveTask();
}

function saveTask() {
    const liTasks = taskList.querySelectorAll(`li`);
    const taskItens = [];

    for (const task of liTasks) {
        let textTask = task.innerText;
        textTask = textTask.replace(`Apagar`, ``);
        taskItens.push(textTask);
    }

    const taskJSON = JSON.stringify(taskItens);
    localStorage.setItem(`tasks`, taskJSON);
}

btnAddTask.addEventListener(`click`, function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

function addSaveTask() {
    const task = localStorage.getItem(`tasks`);
    const taskList = JSON.parse(task);

    for (let task of taskList) {
        createTask(task);
    }
}
addSaveTask();
