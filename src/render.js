import { changeTask, createProjectTask, editedProject, editProjectTask, getProject, getProjectDetails, lookUp, newProjectDetails, projectData, removeProject, removeProjectTask, removeTask, replaceObj, showProjectIndex, taskData} from "./update";

//DOM rendering
taskData //Calls storage fn for the tasks array and creates new task obj
changeTask 
removeTask

projectData //Calls storage fn for the projects array and creates new project obj
createProjectTask
removeProjectTask
editProjectTask
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

//Create cards -- Card Factory
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
function refreshProjects(){
    removeAllCards();
    appendProjects();
    renderProjectToDo();
    test()
}
document.querySelector('.viewAllProjects').addEventListener('click', () => {//renders all projects
    refreshProjects();
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

//Open project edit modal
const openProjectModalEdit = () => {
    document.querySelector('.projects').style.display = 'block';
    document.querySelector('.submitProject').style.display = 'none';
    document.querySelector('.updateProject').style.display = 'inline-block';
    document.querySelector('.form').reset();
    closeModal()
}

//Open add new project modal
const openProjectModal = () => {
    document.querySelector('.projects').style.display = 'block';
    document.querySelector('.updateProject').style.display = 'none';
    document.querySelector('.submitProject').style.display = 'inline-block'
    document.querySelector('.submitProject').addEventListener('click', () => {
        document.querySelector('.projects').style.display = 'none';
    })
}

const closeModal = () => {
    window.onclick = (e) => {
    let modal = document.querySelector('.projects') || document.querySelector('.tasks')
    if(e.target == modal) {
        modal.style.display = 'none';
    }
}
}
//Delete project button

//Edit project details

//Create new obj from form input
//Find old obj index
//replace old obj with new obj
//When aborting, reset data to old state
let trueArray = [];
function test(){
    const updateProjectBtn = document.querySelector('.updateProject');
        const editBtns = document.querySelectorAll('.editBtn');
            editBtns.forEach(btn => btn.addEventListener('click', (e) => {
                let projectName = defineCard(e);
                let data = JSON.parse(localStorage.getItem('projects'));
                let obj = data.filter(item => item.title == projectName);
                let index = data.findIndex(obj => obj.title == projectName)
                console.log(projectName, data, obj[0], index)
                openProjectModalEdit();
                //trueArray.push(projectName)
                updateProjectBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let newObj = {}
                    newObj.title = inputs.title.value;
                    newObj.description = inputs.description.value;
                    newObj.toDo = obj.toDo
                    data.splice(index, 1, newObj);
                    localStorage.setItem('projects', JSON.stringify(data))
                    refreshProjects();
                    document.querySelector('.projects').style.display = 'none'
    })
}))
}

function newProjectObj(){
    let newObj = {};
    newObj.title = inputs.title.value;
    newObj.description = inputs.description.value;
    return newObj
}

function defineCard(e){
    let project = e.target.parentElement.parentElement.children[0].children[0].textContent;
    return project
}

buttons.newProjectBtn.addEventListener('click', () => {
    openProjectModal();
    closeModal();
    document.querySelector('.form').reset()
})


//Button passes form to local storage
buttons.projectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectData(inputs.title.value, inputs.description.value);
    refreshProjects();
    closeModal();
});

window.onload = appendCards();
window.onload = renderProjectToDo();