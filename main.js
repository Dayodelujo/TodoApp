const taskInput = document.getElementById("todocreate-input"),
filters = document.querySelectorAll("span"),
clearAll = document.getElementById("clear-com"),
taskBox = document.querySelector(".todo-list-con");
// const modeSwitcher = document.getElementById("toggler");
// const body = document.querySelector("body");
// const checkBox = document.getElementById("check-box");
// const todoCreateInput = document.getElementById("todocreate-input");
// const control = document.querySelector(".controls")
// const forColor = document.getElementById("for-color");
// const test = document.getElementById("test");
// const count = document.getElementById("count");
// const lastP = document.getElementById("last-p");
// const taskElement = document.getElementById("task");
// const filter = document.getElementById("filter");
// const controlMobile = document.getElementById("control-mobile");


// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                li += `<li id="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <img src="icon-cross.svg" onclick="deleteTask(${id})">
                    </li>`
            }    
        }); 
    }
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}
showTodo("all");

function deleteTask(deleteId) {
    // console.log(deleteId)
    // removing selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearCompleted.addEventListener("click", () => {
    // removing all items of array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTask) {
    // getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild; 
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
         // updating the status of selected task to active
         todos[selectedTask.id].status = "active";
    }
    // saving the update status to local storage
    localStorage.setItem("todo-list", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
       if(!todos) { // if todos isn't existing, pass an empty array to todos
           todos = [];
       }
       taskInput.value = "";
       let taskInfo = {name: userTask, status: "active"};
       todos.push(taskInfo); // adding new task to todos
       localStorage.setItem("todo-list", JSON.stringify(todos));
       showTodo("all");
    }
})

// function toggleMode() {
//     body.classList.toggle("light");
//     modeSwitcher.classList.toggle("light");
//     checkBox.classList.toggle("light");
//     todoCreateInput.classList.toggle("light");
//     test.classList.toggle("light");
//     forColor.classList.toggle("light");
//     lastP.classList.toggle("light");
//     // taskElement.classList.toggle("light");
//     filter.classList.toggle("light");
//     count.classList.toggle("light");
//     clearCompleted.classList.toggle("light");
//     controlMobile.classList.toggle("light");
// }

// modeSwitcher.addEventListener("click", toggleMode);