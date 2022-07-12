import { changeTask, createProjectTask, editProjectTask, projectData, removeProject, removeProjectTask, removeTask, setProjectDetails, taskData } from "./update";

//DOM rendering
taskData //Calls storage fn for the tasks array and creates new task obj
changeTask 
removeTask

projectData //Calls storage fn for the projects array and creates new project obj
createProjectTask
removeProjectTask
editProjectTask
setProjectDetails
removeProject
//Setup
const tasksModal = document.querySelector('tasks');
const projectModal = document.querySelector('projects');

const buttons = (() => {
    const miscTaskBtn = document.getElementById('miscTask');
    const projectTaskBtn = document.getElementById('projectTask');
    const projectBtn = document.querySelector('.submitProject');
    const newTaskBtn = document.querySelector('.newTask');
    const newProjectBtn = document.querySelector('.newProject');

return {
    miscTaskBtn,
    projectTaskBtn,
    projectBtn,
    newTaskBtn,
    newProjectBtn
}
})()

const inputs = (() => {
    const task = document.querySelector('.task');
    const note = document.querySelector('.note');
    const date = document.querySelector('.date');
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');

return {
    task,
    note,
    date,
    title,
    description
}
})()

//Storage access buttons
//Add misc task
buttons.miscTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskData(inputs.task.value, inputs.note.value, inputs.date.value);
    removeAllCards()
    appendCards()
});

//Add project
buttons.newProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectData(inputs.title.value, inputs.description.value);
});

//Add project task
buttons.projectTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
})

//Display DOM cards
const display = document.querySelector('.display');

const createElement = (html, selector) => {//Helper fn to create dom elements
    let element = document.createElement(html);
    element.classList.add(selector);
    return element;
}

const taskCard = (task) => {//creates cards with task details from local storage
    let card = createElement('div', 'card');
    let title = createElement('span', 'cardTitle');
    let note = createElement('span', 'cardNote');
    let date = createElement('span', 'cardDate');
    title.textContent = task.title;
    note.textContent = task.note;
    date.textContent = task.date;
        let buttons = createElement('div', 'cardButtons');
        let edit = createElement('button', 'editBtn');
        let remove = createElement('button', 'removeBtn');
        edit.textContent = 'Edit';
        remove.textContent = 'Delete';
        buttons.append(edit, remove)
    card.append(title, note, date, buttons);
    return card
}

const removeAllCards = () => {
    while (display.firstChild) {
        display.removeChild(display.lastChild)
    }
}

let tasksArray = JSON.parse(localStorage.getItem('tasks'));
const appendCards = () => {
    JSON.parse(localStorage.getItem('tasks'))
    .forEach((item) => {
        display.append(taskCard(item))
    })
}
window.onload = appendCards()
