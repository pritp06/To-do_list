// Select elements
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Apply theme 
themesavedTheme = localStorage.getItem('savedTheme');
savedTheme ? changeTheme(savedTheme) : changeTheme('standard');

// Add a new to-do
function addToDo(event) {
    event.preventDefault(); // Prevent page reload

    if (toDoInput.value === '') {
        alert("You must write something!");
        return;
    }

    // Create to-do 
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    savelocal(toDoInput.value); // Save to local storage

    // Add check and delete buttons
    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
    toDoInput.value = ''; // Clear input field
}

// Handle delete and check buttons
function deletecheck(event) {
    const item = event.target;

    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', () => item.parentElement.remove());
    }

    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

// Save to-do to local storage
function savelocal(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load saved to-dos
function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

    todos.forEach(todo => {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);
    });
}

// Remove to-do from local storage
function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Change theme
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;
    document.body.className = color;
    
    color === 'darker' ? document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        todo.className = todo.classList.contains('completed') ? `todo ${color}-todo completed` : `todo ${color}-todo`;
    });

    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) button.className = `check-btn ${color}-button`;
        else if (button.classList.contains('delete-btn')) button.className = `delete-btn ${color}-button`;
        else if (button.classList.contains('todo-btn')) button.className = `todo-btn ${color}-button`;
    });
}
