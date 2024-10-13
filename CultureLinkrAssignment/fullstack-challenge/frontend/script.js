document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Fetch and display tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5678/tasks');
            const tasks = await response.json();
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="${task.completed ? 'completed' : ''}">${task.name}</span> <!-- Use 'name' -->
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                    <button onclick="editTask('${task._id}', '${task.name}')">Edit</button> <!-- Use 'name' -->
                    <button onclick="toggleComplete('${task._id}', ${!task.completed})">
                        ${task.completed ? 'Incomplete' : 'Complete'}
                    </button>
                `;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Add task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newTask = {
            name: taskInput.value, 
        };

        try {
            const response = await fetch('http://localhost:5678/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                taskInput.value = '';
                fetchTasks(); // Refresh the task list
            } else {
                console.error('Error adding task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Delete task
    window.deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5678/tasks/${id}`, {
                method: 'DELETE',
            });
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Edit task
    window.editTask = async (id, name) => { 
        const newName = prompt('Edit task name:', name); 
        if (newName) {
            try {
                await fetch(`http://localhost:5678/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newName }), 
                });
                fetchTasks(); // Refresh the task list
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    // Toggle task completion
    window.toggleComplete = async (id, completed) => {
        try {
            await fetch(`http://localhost:5678/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    // Initial fetch of tasks to display all tasks
    fetchTasks();
});
