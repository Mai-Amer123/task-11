const taskForm = document.querySelector("#taskForm");
const taskNameInput = document.querySelector("#taskName");
const taskDescriptionInput = document.querySelector("#taskDescription");
const tasksTable = document.querySelector("#tasksTable");
const emptyMessage = document.querySelector("#emptyMessage");

const updateDialog = document.querySelector("#updateDialog");
const updateForm = document.querySelector("#updateForm");
const updateNameInput = document.querySelector("#updateName");
const updateDescriptionInput = document.querySelector("#updateDescription");
const cancelUpdateButton = document.querySelector("#cancelUpdate");

let tasks = [
    {
        taskName: "task 1",
        taskDesc: "Have breakfast",
        taskStatus: false
    },
    {
        taskName: "task 2",
        taskDesc: "Study",
        taskStatus: true
    },
    {
        taskName: "task 3",
        taskDesc: "Watch a Movie",
        taskStatus: true
    }
];
let taskIndex = null;

// Display Tasks
function displayTasks() {
    tasksTable.innerHTML = "";
    tasks.forEach(function (task, index) {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${task.taskName}</td>
        <td>${task.taskDesc}</td>
        <td>
            <button class="${task.taskStatus ? 'status-btn status-done' : 'status-btn status-created'}" onclick="changeStatus(${index})">
                ${task.taskStatus ? "Done" : "Created"}
            </button>
        </td>
        <td>
            <button class="update-btn" onclick="openUpdate(${index})">Update</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </td>
    `;

        tasksTable.appendChild(row);
    });

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

}

// Add Task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = taskNameInput.value.trim();
    let desc = taskDescriptionInput.value.trim();

    if (name === "" || desc === "") {
        return;
    }

    tasks.push({
        taskName: name,
        taskDesc: desc,
        taskStatus: false
    });

    taskForm.reset();
    displayTasks();


});

// Change Status
function changeStatus(index) {
    tasks[index].taskStatus = !tasks[index].taskStatus;
    displayTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Open Update
function openUpdate(index) {
    taskIndex = index;


    updateNameInput.value = tasks[index].taskName;
    updateDescriptionInput.value = tasks[index].taskDesc;

    updateDialog.showModal();


}

// Save Update
updateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = updateNameInput.value.trim();
    let desc = updateDescriptionInput.value.trim();

    if (name === "" || desc === "") {
        return;
    }

    tasks[taskIndex].taskName = name;
    tasks[taskIndex].taskDesc = desc;

    updateDialog.close();
    taskIndex = null;

    displayTasks();


});

// Cancel Update
cancelUpdateButton.addEventListener("click", function () {
    updateDialog.close();
    taskIndex = null;
});

displayTasks();
