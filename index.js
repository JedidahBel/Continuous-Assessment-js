 // Task class
 class Task {
    constructor(describe) {
        this.describe = describe;
        this.isCompleted = false;
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
}

// TodoList class
class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(describe) {
        const newTask = new Task(describe);
        this.tasks.push(newTask);
        this.renderTasks();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].toggleCompletion();
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';  // Bootstrap list styling
            
            // Wrap task describe in a span for separate styling
            const taskDescription = document.createElement('span');
            taskDescription.textContent = task.describe;
            if (task.isCompleted) {
                taskDescription.classList.add('completed');
            }

            listItem.appendChild(taskDescription); // Add task describe to list item

            // Toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'btn btn-success btn-sm me-2';  // Bootstrap success button
            toggleButton.textContent = task.isCompleted ? 'Undo' : 'Complete';
            toggleButton.onclick = () => this.toggleTaskCompletion(index);
            listItem.appendChild(toggleButton);

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-danger btn-sm';  // Bootstrap danger button
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => this.removeTask(index);
            listItem.appendChild(removeButton);

            taskList.appendChild(listItem);
        });
    }
}

// Create a new TodoList
const todoList = new TodoList();

// Function to add a task from input field
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        todoList.addTask(taskDescription);
        taskInput.value = '';  // Clear input field after adding
    } else {
        alert("Please enter a task describe.");
    }
}