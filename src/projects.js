import { addElement, closeSb, makeTask } from "./app";
import { makeElement } from "./read";
import './tasks'
//Add Project Button
let newProjectBtn = document.querySelector('.newProject');

//Form modal and input fields
let projectForm = document.querySelector('.projectForm')
const proForm = document.querySelector('#proForm');
let pTitle = document.querySelector('#pTitle');
let pDescription = document.querySelector('#pDescription');
const addProjectBtn = document.querySelector('.addProject');

//All list items
let listItems = document.querySelectorAll('.listItem');

//Closes form modal
const closeModal = () => {
    window.onclick = (e) => {
        if (e.target == projectForm) {
    projectForm.style.display = 'none'
        }
    }
}

//Opens Project form modal and calls addElement function with input values
//which are pushed to local storage
newProjectBtn.addEventListener('click', () => {
    projectForm.style.display = 'flex';
    proForm.reset()
    closeModal()
});

//Submits form and creates object
addProjectBtn.addEventListener('click', () => {
    addElement('project', pTitle.value, pDescription.value);
    makeLi();
    itemsListen()
})

//Prevents reload on submit and closes modal
proForm.addEventListener('submit', (e) => {
    e.preventDefault();
    projectForm.style.display = 'none';
})

//Creates list items from projects array
const makeLi = () => {
    let projects = localStorage.getObj('projects');
    if(projects === null) return
    let str = '<ul>';
        projects.forEach(el => str += '<li class="listItem">' + el.title + '</li>');
        str += '</ul>';
return document.getElementById('projects').innerHTML = 'Projects' + str;
}

//Adds listeners to list items (project list)
let currentProject
const itemsListen = () => {
if(localStorage.getObj('projects') === null) return
[...document.querySelectorAll('.listItem')]
.map(item => item.addEventListener('click', (e) => {
    currentProject = e.target.textContent
    lookupTasks(e.target.textContent);
    createTab(e.target.textContent);
    closeSb();
}))
}

//Looks up the clicked projects to do list
const lookupTasks = (input) => {
    if(localStorage.getObj('projects') === null) return
    let obj = localStorage.getObj('projects').filter(item => item.title === input);
    return obj[0].toDo
}

//Render project and tasks 
const createTab = (input) => {
    if (input == undefined) return
   let tabSrc = localStorage.getObj('projects').filter(item => item.title === input);
   let tabTitle = tabSrc[0].title;
   let tabDescr = tabSrc[0].description;
   let tabList = tabSrc[0].toDo
   removeTab()
   document.querySelector('.main').append(makeProjectContainer(tabTitle, tabDescr, tabList))
}

//Remove tabs
const removeTab = () => {
    const main = document.getElementById('main');
    while (main.firstChild) {
        main.removeChild(main.lastChild)
    }
}

//Create container for project title and description
const makeProjectContainer = (pTitle, pDescription, list) => {
    let container = document.createElement('div');
    container.classList.add('proContainer');
        let title = document.createElement('div');
        title.classList.add('proTitle');
        title.textContent = pTitle;
            let description = document.createElement('div');
            description.classList.add('proDescription');
            description.textContent = pDescription;
                let toDoList = makeElement(list);
                    let addBtn = document.createElement('button')
                    addBtn.textContent = 'Add Task';
                    addBtn.addEventListener('click', () => openTaskForm())
                container.append(title, description, addBtn, toDoList);
    return container
}

const taskForm = document.querySelector('.taskForm');
const tForm = document.querySelector('#tForm');
const title = document.querySelector('#tTitle');
const description = document.querySelector('#tDescription');
const date = document.querySelector('#tDate');
const priority = document.querySelectorAll('.radio');
const addTaskBtn = document.querySelector('.addTask');

const openTaskForm = () => {
    taskForm.style.display = 'block';
    tForm.reset();
    window.onclick = (e) => {
        if (e.target == taskForm) {
            taskForm.style.display = 'none'
        }
    }
}

let prio = ''
priority.forEach(opt => opt.addEventListener('change', (e) => prio = (e.target.value)));

//Push new task to project array
//////>>>> Needs to update the array in local storage
addTaskBtn.addEventListener('click', () => pushToDo(currentProject))
const pushToDo = (input, title, description, date, prio) => {
    lookupTasks(input).push(title, description, date, prio)
    console.log(lookupTasks(input))
}

//Adds projects list to sidebar and makes items clickable on page load
(() => {
    makeLi();
    itemsListen();
    createTab()
})()
export {closeModal}