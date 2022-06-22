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
    let toDo = [];
    return {
        title,
        description,
        toDo
    }
}

//Create new task or project element and
//push it to the corresponding local storage slot
function addElement(el, title, description, date, priority, id) {
    //New Task 
    if (el == 'task'){
    let newTask = makeTask(title, description, date, priority, id); 
    if (localStorage.getItem('tasks') == null) { //No tasks array in local storage?
        localStorage.setItem('tasks', '[]'); //create tasks array in local storage
    }
    let oldTasks = localStorage.getObj('tasks'); //Take old array
        oldTasks.push(newTask); //and push new task
            localStorage.setObj('tasks', oldTasks) //set the updated array in local storage
    //New Project
}else if (el == 'project') {
    let newProject = makeProject(title, description);
    if (localStorage.getItem('projects') == null) { //No tasks array in local storage?
        localStorage.setItem('projects', '[]'); //create projects array in local storage
    }
    let oldProjects = localStorage.getObj('projects'); //Take old array
        oldProjects.push(newProject); //and push new task
            localStorage.setObj('projects', oldProjects) //set the updated array in local storage
    }
}

function addProjectTask(title, description, date, priority, id){
    let oldTasks = JSON.parse(localStorage.getItem('projects'))[0].toDo;
    let newTask = makeTask(title, description, date, priority, id);
    oldTasks.push(newTask);
}

//addProjectTask('Bookstore', 'return book', 'today', 'high')