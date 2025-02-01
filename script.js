document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const statisticsDiv = document.getElementById('statisticsDiv');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    flatpickr(dueDateInput, {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStatistics();
    }

    function createTaskElement(task){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';
        if (task.completed) li.classList.add('completed');

        const dueDate = new Date(task.dueDate);
        const isOverdue = !task.completed && dueDate < new Date() && task.dueDate !=='';
        li.innerHTML = `
            <div>
                <span class="task-text">${task.text}</span>
                <span class="badge bg-secondary ms-2">${task.category}</span>
                <small class="due-date ${isOverdue ? 'overdue' : ''}">${task.dueDate ? 'Vence: ' + task.dueDate : ''}</small>
            </div>
            <div>
                <button class="btn btn-success btn-sm me-2 complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </div>    
        `;

        li.querySelector('.complete-btn').addEventListener('click', () =>{
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', () =>{
            tasks = tasks.filter(t => t.text !== task.text || t.dueDate !== task.dueDate);
            saveTasks();
            renderTasks();
        });

        return li;
    }

    function addTask() {
        const text = taskInput.value.trim();
        const category = categorySelect.value || 'Uncategorized';
        const dueDate = dueDateInput.value;

        if(text) {
            tasks.push({ text, category, dueDate, completed: false});
            saveTasks();
            taskInput.value = '';
            categorySelect.selectedIndex = 0;
            dueDateInput.value = '';
            renderTasks();
        }
    }

    function renderTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        const filteredTask = tasks.filter(task =>{
            const matchesSearch = task.text.toLowerCase().includes(searchTerm);
            const matchesFilter = 
                filterValue === 'all' ||
                (filterValue === 'active' && !task.completed) || 
                (filterValue === 'completed' && task.completed);
            return matchesSearch && matchesFilter;
        });

        taskList.innerHTML = '';
        filteredTask.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });

        updateStatistics();
    }

    function updateStatistics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;

        statisticsDiv.innerHTML = `
            Total tasks: ${total} | Completed: ${completed} | Active: ${active}
        `;
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addTask();
    });

    searchInput.addEventListener('input', renderTasks);
    filterSelect.addEventListener('change', renderTasks);

    renderTasks();
});document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const statisticsDiv = document.getElementById('statisticsDiv');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    flatpickr(dueDateInput, {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStatistics();
    }

    function createTaskElement(task){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';
        if (task.completed) li.classList.add('completed');

        const dueDate = new Date(task.dueDate);
        const isOverdue = !task.completed && dueDate < new Date() && task.dueDate !=='';
        li.innerHTML = `
            <div>
                <span class="task-text">${task.text}</span>
                <span class="badge bg-secondary ms-2">${task.category}</span>
                <small class="due-date ${isOverdue ? 'overdue' : ''}">${task.dueDate ? 'Vence: ' + task.dueDate : ''}</small>
            </div>
            <div>
                <button class="btn btn-success btn-sm me-2 complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </div>    
        `;

        li.querySelector('.complete-btn').addEventListener('click', () =>{
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', () =>{
            tasks = tasks.filter(t => t.text !== task.text || t.dueDate !== task.dueDate);
            saveTasks();
            renderTasks();
        });

        return li;
    }

    function addTask() {
        const text = taskInput.value.trim();
        const category = categorySelect.value || 'Uncategorized';
        const dueDate = dueDateInput.value;

        if(text) {
            tasks.push({ text, category, dueDate, completed: false});
            saveTasks();
            taskInput.value = '';
            categorySelect.selectedIndex = 0;
            dueDateInput.value = '';
            renderTasks();
        }
    }

    function renderTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        const filteredTask = tasks.filter(task =>{
            const matchesSearch = task.text.toLowerCase().includes(searchTerm);
            const matchesFilter = 
                filterValue === 'all' ||
                (filterValue === 'active' && !task.completed) || 
                (filterValue === 'completed' && task.completed);
            return matchesSearch && matchesFilter;
        });

        taskList.innerHTML = '';
        filteredTask.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });

        updateStatistics();
    }

    function updateStatistics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;

        statisticsDiv.innerHTML = `
            Total tasks: ${total} | Completed: ${completed} | Active: ${active}
        `;
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addTask();
    });

    searchInput.addEventListener('input', renderTasks);
    filterSelect.addEventListener('change', renderTasks);

    renderTasks();
});