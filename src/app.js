//Adds methods to local storage to store objects
Storage.prototype.setObj = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObj = function (key) {
    let value = this.getItem(key);
    return value && JSON.parse(value);
}


//Create obj with task properties
const makeTask = (title, description, date, priority, id) => {
    id = Date.now();
    return {
        title,
        description,
        date,
        priority,
        id
    }
}

//Create obj with project properties
const makeProject = (title, description) => {
    let toDo = []
    return {
        title,
        description,
        toDo
    }
}

//Create new task or project element and
//push it to the corresponding local storage slot
function addElement(el, title, description, date, priority, id) {
    if (el == 'task'){
    let newTask = makeTask(title, description, date, priority, id);
    if (localStorage.getItem('tasks') == null) {
        localStorage.setItem('tasks', '[]');
    }
    let oldTasks = localStorage.getObj('tasks');
        oldTasks.push(newTask);
            localStorage.setObj('tasks', oldTasks)
}else if (el == 'project') {
    let newProject = makeProject(title, description);
    if (localStorage.getItem('projects') == null) {
        localStorage.setItem('projects', '[]');
    }
    let oldProjects = localStorage.getObj('projects');
        oldProjects.push(newProject);
            localStorage.setObj('projects', oldProjects)
    }
}
addElement('project', 'Have lunch', 'Eat soup with Sean')