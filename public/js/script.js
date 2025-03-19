document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const formContainer = document.getElementById('task-form-container');
    const closeFormBtn = document.getElementById('close-form-btn');
    const taskForm = document.querySelector(".form-container");


    const isLoggedIn = document.body.dataset.userLoggedIn === "true";

    addTaskBtn.addEventListener("click", () => {
        if (!isLoggedIn) {
            window.location.href = "/login";
            return;
        }
        else {
            formContainer.style.display = "flex";
        }
    });

    closeFormBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    if (taskForm) {
        taskForm.addEventListener("submit", (event) => addTask(taskForm, event));
    }    
});

async function addTask(taskForm, e) {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const data = Object.fromEntries(formData.entries());

    try {
        await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        location.reload();
    }
    catch (error) {
        console.error("Error submitting form:", error);
    }
}

async function updateTaskStatus(taskId) {
    try {
        await fetch(`/tasks/update/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "completed" }),
        });

        location.reload();
    } 
    catch (error) {
        console.error(`Error updating task status: ${error}`);
    }
}

async function deleteTask(taskId) {
    try {
        await fetch(`/tasks/${taskId}`, { method: "DELETE" });
        location.reload();
    } 
    catch (error) {
        console.error("Error deleting task:", error);
    }
}