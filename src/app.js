import icon from './icons8-menü-30.png';

import { appendTasks, makeElement } from './read';

/////Clear Storage Button
document.getElementById('clearBtn').addEventListener('click', () => localStorage.clear())

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

//Render localStorage on load
const renderStorage = (() => {
    if(localStorage.length > 0){
        appendTasks()
    }
})()

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
}else if (el !== 'tasks' && el !== 'projects' || el == ''){
    console.log(el);
   
}
}

//Add burger menu icon
const burgerIcon = new Image();
burgerIcon.src = icon;
document.querySelector('.openSb').append(burgerIcon);

//Open sidebar
const openSidebar = document.querySelector('.openSb');
function openSb(){
    document.querySelector('.sidebar').style.width = '100vw';
    document.querySelector('.main').style.marginLeft = '100vw';
}
openSidebar.addEventListener('click', () => openSb());

//Close sidebar
const closeSidebar = document.querySelector('.closeBtn');
function closeSb(){
    document.querySelector('.sidebar').style.width = '0';
    document.querySelector('.main').style.marginLeft = '0'
}
closeSidebar.addEventListener('click', () => closeSb());


//Local storage is split up into [projects] and [tasks] (top level arrays)
//New projects will be pushed to the [projects] (new tasks outside of a project go into [tasks] respectively)
//Since it's an array, all array-methods are available
//To update the top level arrays, first use the getObj method to access the desired array
//Second use the setObj method to update the given array with the modified array 

//To update the nested [toDo], first store the current storage data in a variable
//The variable now holds the array
//Access the array item's [toDo] and add the desired task (by index or push())
//Reset the local storage [projects] via setObj method

const updateProjectTask = (i, title, description, date, priority, id) => {
let oldProjectData = localStorage.getObj('projects');
let newProjectTask = makeTask(title, description, date, priority, id);
oldProjectData[i].toDo.push(newProjectTask);
localStorage.setObj('projects', oldProjectData)
}

const updateTasks = (title, description, date, priority, id) => {
    let oldTasksData = localStorage.getObj('tasks');
    let newTasksData = makeTask(title, description, date, priority, id);
    oldTasksData.push(newTasksData);
    localStorage.setObj('tasks', oldTasksData)

}

export {
    makeProject, 
    makeTask, 
    updateTasks, 
    updateProjectTask, 
    addElement, 
    openSb, 
    closeSb
}