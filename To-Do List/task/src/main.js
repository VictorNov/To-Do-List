const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("input-task");
const todoList = document.getElementById("task-list");

let taskList = getFromLocalStorage();

todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    addTask(todoInput.value);
});

document.getElementById("add-task-button").addEventListener("click", () => addTask(todoInput.value));

function addTask(item) {
    if (item !== '') {
        const task = {
            id: Date.now(),
            name: item,
            completed: false
        };

        taskList.push(task);
        addToLocalStorage(taskList);

        todoInput.value = '';
    }
}

function renderTasks(tasks) {
    todoList.innerHTML = '';

    tasks.forEach(function(item){
        const checked = item.completed ? "checked" : null;

        const li = document.createElement("li");
        li.setAttribute("class", "task flex-row");
        li.setAttribute("data-key", item.id);

        if (checked === "checked") {
            li.classList.add("complete");
        }

        li.innerHTML = `
        <input class="flex-start check" type="checkbox" name="task-list" ${checked}>
        <span class="task flex-stretch">${item.name}</span>
        <button class="delete-btn flex-end"><img alt="delete" src="x-button.png" class="delete-btn icon"></button>
        `;

        todoList.append(li);
    });
}

function addToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}

function toggle(id) {
    taskList.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(taskList);
}

function delTask(id) {
    taskList.forEach(function (item, n) {
        if (item.id == id) {
            taskList.splice(n, 1);
        }
    });
    addToLocalStorage(taskList);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem("tasks");
    if (reference) {
        const tasks = JSON.parse(reference);
        renderTasks(tasks);
        return tasks;
    } else {
        return [];
    }
}

todoList.addEventListener("click", function (event) {
   if (event.target.type === "checkbox") {
       toggle(event.target.parentElement.getAttribute("data-key"));
   }

   if (event.target.classList.contains("delete-btn")) {
       delTask(event.target.parentElement.parentElement.getAttribute("data-key"));
   }
});