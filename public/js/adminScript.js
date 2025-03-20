document.addEventListener('DOMContentLoaded', () => {
    const showUsersBtn = document.getElementById('show-users');
    const showTasksBtn = document.getElementById('show-tasks');
    const closeButton = document.getElementById('close-btn');
    const dataContainer = document.getElementById('data-container');
    const mainContent = document.getElementById('main-content');

    closeButton.addEventListener('click', () => {
        dataContainer.style.display = 'none';
    });

    showUsersBtn.addEventListener('click', async () => {
        mainContent.setAttribute('data-type', 'users');
        await getUsers();
    });

    showTasksBtn.addEventListener('click', async () => {
        mainContent.setAttribute('data-type', 'tasks'); 
        mainContent.style.display = 'block';
        await getTasks(); 
    });

});

async function getUsers () {
    const res = await fetch('/admin/users');
    const userData = await res.json();
    console.log(userData);
    document.getElementById('data-container').style.display = 'flex';
    renderTable('users', userData);
}

async function getTasks () {
    const res = await fetch('/admin/tasks');
    const taskData = await res.json();
    console.log(taskData);
    document.getElementById('data-container').style.display = 'flex';
    renderTable('tasks', taskData);
}

function renderTable(type, data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    let headerHTML = '';
    let bodyHTML = '';

    if (type === 'users') {
        headerHTML = `
            <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
        `;
        bodyHTML = data
            .map(
                (user, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `
            )
            .join('');
    } 
    else if (type === 'tasks') {
        headerHTML = `
            <tr>
                <th>Sl. No</th>
                <th>Task Title</th>
                <th>Task Description</th>
                <th>Created By</th>
            </tr>
        `;
        bodyHTML = data
            .map(
                (task, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${task.taskTitle}</td>
                <td>${task.description}</td>
                <td>${task.userId ? task.userId.name : 'Unknown'}</td>
            </tr>
        `
            )
            .join('');
    }

    tableHeader.innerHTML = headerHTML;
    tableBody.innerHTML = bodyHTML;
}
