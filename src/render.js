import { changeTask, createProjectTask, editProjectTask, lookUp, projectData, removeProject, removeProjectTask, removeTask, setProjectDetails, taskData } from "./update";

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
    const updateProject = document.querySelector('.updateProject');

return {
    miscTaskBtn,
    projectTaskBtn,
    projectBtn,
    newTaskBtn,
    newProjectBtn,
    updateProject
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
    removeAllCards();
    appendCards();
});

//Add project
buttons.projectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectData(inputs.title.value, inputs.description.value);
    removeAllCards();
    appendProjects();
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

const objCard = (task, flag) => {//creates cards with task details from local storage
    let project = createElement('span', 'flag')
    let card = createElement('div', 'card');
    let cardDetails = createElement('div', 'cardDetails')
    let title = createElement('span', 'cardTitle');
    let note = createElement('span', 'cardNote');
    let date = createElement('span', 'cardDate');
    project.textContent = flag
    title.textContent = task.title;
    note.textContent = task.note || task.description;
    date.textContent = task.date;
    project.style.visibility = 'hidden';
        let buttons = createElement('div', 'cardButtons');
        let edit = createElement('button', 'editBtn');
        let remove = createElement('button', 'removeBtn');
        edit.textContent = 'Edit';
        remove.textContent = 'Delete';
        buttons.append(edit, remove)
        cardDetails.append(title, note, date, project)
    card.append(cardDetails, buttons);
    return card
}

const removeAllCards = () => {//removes cards appended to display
    while (display.firstChild) {
        display.removeChild(display.lastChild)
    }
}

const appendCards = () => {//appends task cards
    JSON.parse(localStorage.getItem('tasks'))
    .forEach((item) => {
        display.append(objCard(item, false))
    })
}

const appendProjects = () => {//appends project cards
    JSON.parse(localStorage.getItem('projects'))
    .forEach(item => display.append(objCard(item, true)))
}

document.querySelector('.viewAllProjects').addEventListener('click', () => {//renders all projects
    removeAllCards();
    appendProjects();
    renderProjectToDo();
})
document.querySelector('.viewAllTasks').addEventListener('click', () => {//renders all misc tasks
    removeAllCards();
    appendCards();
    renderProjectToDo();
})

const renderProjectToDo = () => {//adds event listeners to all displayed cards
    const cardTitles = document.querySelectorAll('.cardTitle');
    cardTitles.forEach(card => card.addEventListener('click', (e) => {
        if(e.target.parentElement.children[3].textContent != 'false'){//checks for hidden flag of project (boolean)
        let project = e.target.textContent; //selects the projects title string
        removeAllCards();
        lookUp(project).toDo.forEach(task => display.append(objCard(task))) //looks up project todo array and
                                                                    //renders tasks as cards
    }else return
    }))
}


window.onload = appendCards();
window.onload = renderProjectToDo();