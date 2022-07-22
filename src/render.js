import { newTask } from "./tasks";
import { changeTask, createProjectTask, editedProject, editProjectTask, getProject, getProjectDetails, lookUp, newProjectDetails, projectData, pushNewData, removeProject, removeProjectTask, removeTask, replaceObj, showProjectIndex, taskData} from "./update";

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
const tasksModal = document.querySelector('.tasks');
const projectModal = document.querySelector('.projects');

const buttons = (() => {
    const miscTaskBtn = document.getElementById('miscTask');
    const projectTaskBtn = document.getElementById('projectTask');
    const projectBtn = document.querySelector('.submitProject');
    const newTaskBtn = document.querySelector('.newTask');
    const newProjectBtn = document.querySelector('.newProject');
    const updateProject = document.querySelector('.updateProject');
    let newProjectTaskBtn = createElement('button', 'addProjectTask');
        newProjectTaskBtn.textContent = 'New Project Task';

return {
    miscTaskBtn,
    projectTaskBtn,
    projectBtn,
    newTaskBtn,
    newProjectBtn,
    updateProject,
    newProjectTaskBtn
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
    tasksModal.style.display = 'none';
    editMiscTask();

});

//Add project task
buttons.projectTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
})

//Display DOM cards
const display = document.querySelector('.display');

function createElement(html, selector){//Helper fn to create dom elements
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
    project.style.display = 'none';
        let buttons = createElement('div', 'cardButtons');
        let edit = createElement('button', 'editBtn');
        let remove = createElement('button', 'removeBtn');
        //let done = createElement('button', 'doneBtn')
        edit.textContent = 'Edit';
        //done.textContent = 'Done';
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
function refreshProjects(){//Reloads all cards
    removeAllCards();
    appendProjects();
    renderProjectToDo();
    editProject();
}

//Sidebar control
function openSidebar() {
    document.querySelector('.sidebar').style.width = '200px';
    document.querySelector('.display').style.marginLeft = '200px';
}

function closeSidebar() {
    document.querySelector('.sidebar').style.width = '0';
    document.querySelector('.display').style.marginLeft = '0';
}
document.querySelector('.menu').addEventListener('click', () => {
    openSidebar()
})
document.querySelector('.closeBtn').addEventListener('click', () => {
    closeSidebar()
})

//Buttons to toggle view in GUI (All projects, all misc tasks)
document.querySelector('.viewAllProjects').addEventListener('click', () => {//renders all projects
    refreshProjects();
    buttons.newProjectBtn.style.display = 'inline';
    buttons.newTaskBtn.style.display = 'inline';
    buttons.newProjectTaskBtn.style.display = 'none';
})

document.querySelector('.viewAllTasks').addEventListener('click', () => {//renders all misc tasks
    removeAllCards();
    appendCards();
    renderProjectToDo();
    editMiscTask()

})

//Makes card title clickable and shows the project's to do list
//Enables adding new project task
const renderProjectToDo = () => {
    const cardTitles = document.querySelectorAll('.cardTitle');
    cardTitles.forEach(card => card.addEventListener('click', (e) => {//adds event listeners to all displayed cards
        if(e.target.parentElement.children[3].textContent != 'false'){//checks for hidden flag of project (boolean)
        let project = e.target.textContent; //selects the projects title string
        removeAllCards();
        lookUp(project).toDo.forEach(task => display.append(objCard(task))) //looks up project todo array and renders tasks as cards
            buttons.newProjectBtn.style.display = 'none'; //Hide new project button
            buttons.newTaskBtn.style.display = 'none'; //Hide new misc task button
            buttons.newProjectTaskBtn.style.display = 'inline' //Show new project task button
                document.querySelector('.buttons').append(buttons.newProjectTaskBtn);
                editProTask(project);
                deleteProTask(project);
                
                buttons.newProjectTaskBtn.addEventListener('click', () => {
                        let projects = JSON.parse(localStorage.getItem('projects'));
                        let index = projects.findIndex(item => item.title == project);
                        let target = projects[index];
                        let array = lookUp(project).toDo;
                        
                        openTaskModal('newProjectTask');
                        buttons.projectTaskBtn.addEventListener('click', () => {//Button click passes new data to local storage
                            let task = newTask(inputs.task.value, inputs.note.value, inputs.date.value);
                            array.push(task);
                            target.toDo = array;
                            projects.splice(index, 1, target);
                            localStorage.setItem('projects', JSON.stringify(projects));
                            tasksModal.style.display = 'none';
                            removeAllCards();
                            lookUp(project).toDo.forEach(task => display.append(objCard(task)));
                            editProTask(project);
                            deleteProTask(project);
                        })
                    })
    }else return
    }))
}

//Edits project tasks
function editProTask(input){//Edit the projects to do array items (tasks)
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach(button => button.addEventListener('click', (e) => {//Adds clicker to edit btns on task cards
        let taskName = e.target.parentElement.parentElement.children[0].children[0].textContent;
        let project = lookUp(input);
        let array = project.toDo;
        let index = array.findIndex(item => item.title == taskName)
        openTaskModal('editProjectTask');
        document.querySelector('.updateProjectTask').addEventListener('click', (e) => {//Update button
            e.preventDefault()
            let task = newTask(inputs.task.value, inputs.note.value, inputs.date.value);
            array.splice(index, 1, task);
            project.toDo = array;
            let oldData = JSON.parse(localStorage.getItem('projects'));
            let projectIndex = oldData.findIndex(item => item.title == input);
            oldData.splice(projectIndex, 1, project);
            localStorage.setItem('projects', JSON.stringify(oldData));
            tasksModal.style.display = 'none';
                            removeAllCards();
                            lookUp(input).toDo.forEach(task => display.append(objCard(task)));
                            editProTask(input);
                            deleteProTask(input);
        })
    }))
}

//Deletes project tasks
function deleteProTask(input){
    const deleteBtns = document.querySelectorAll('.removeBtn');
    deleteBtns.forEach(btn => btn.addEventListener('click', (e) => {
        let taskName = e.target.parentElement.parentElement.children[0].children[0].textContent;
        let project = lookUp(input);
        let array = project.toDo;
        let index = array.findIndex(item => item.title == taskName);
        array.splice(index, 1);
        project.toDo = array;
        console.log(array)
        let oldData = JSON.parse(localStorage.getItem('projects'));
        let projectIndex = oldData.findIndex(item => item.title == input);
        oldData.splice(projectIndex, 1, project);
        localStorage.setItem('projects', JSON.stringify(oldData));
        removeAllCards();
        lookUp(input).toDo.forEach(task => display.append(objCard(task)));
        editProTask(input)
        deleteProTask(input)
        e.preventDefault();
    }))
}

//Button opens task modal
const addNewTask = document.querySelector('.newTask');
addNewTask.addEventListener('click', (e) => {
    e.preventDefault();
    openTaskModal();
})

//Edits and deletes misc tasks
function editMiscTask(){
    let editBtns = document.querySelectorAll('.editBtn');
    let deleteBtn = document.querySelectorAll('.removeBtn');
    editBtns.forEach(btn => btn.addEventListener('click', (e) => {
        let title = e.target.parentElement.parentElement.children[0].children[0].textContent;
        let array = JSON.parse(localStorage.getItem('tasks'));
        let index = array.findIndex(item => item.title == title);
        openTaskModal('updateTask');
        document.querySelector('.updateTask').addEventListener('click', (e) => {
            e.preventDefault();
            let newObj = {};
            newObj.title = inputs.task.value;
            newObj.note = inputs.note.value;
            newObj.date =  inputs.date.value;
            console.log(newObj)
            array.splice(index, 1, newObj);
            localStorage.setItem('tasks', JSON.stringify(array));
            removeAllCards();
            appendCards();
            editMiscTask();
            tasksModal.style.display = 'none';
        })
        
    }))
    deleteBtn.forEach(btn => btn.addEventListener('click', (e) => {
        let title = e.target.parentElement.parentElement.children[0].children[0].textContent;
        let array = JSON.parse(localStorage.getItem('tasks'));
        let index = array.findIndex(item => item.title == title);
        array.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(array));
        removeAllCards();
        appendCards();
        editMiscTask();
    }))
}

//Open task modal
function openTaskModal(input){
    if (input == 'editProjectTask') {
        tasksModal.style.display = 'block';
        document.querySelector('.updateProjectTask').style.display = 'inline';
        document.getElementById('miscTask').style.display = 'none';
        document.querySelector('.updateTask').style.display = 'none';
        document.getElementById('projectTask').style.display = 'none'
        document.querySelector('.form').reset();
    closeModal()
    }else if (input == 'newProjectTask') {
        tasksModal.style.display = 'block';
        document.querySelector('.updateProjectTask').style.display = 'none';
        document.getElementById('miscTask').style.display = 'none';
        document.querySelector('.updateTask').style.display = 'none';
        document.getElementById('projectTask').style.display = 'inline'
        document.querySelector('.form').reset();
        closeModal()
    }else if (input == 'updateTask') {
    tasksModal.style.display = 'block';
    document.querySelector('.updateTask').style.display = 'inline'
    document.getElementById('miscTask').style.display = 'none';
    document.querySelector('.updateProjectTask').style.display = 'none';
    document.getElementById('projectTask').style.display = 'none'
    document.querySelector('.form').reset()
    closeModal()
    }else {
    tasksModal.style.display = 'block';
    document.getElementById('miscTask').style.display = 'inline';
    document.querySelector('.updateTask').style.display = 'none';
    document.querySelector('.updateProjectTask').style.display = 'none';
    document.getElementById('projectTask').style.display = 'none'
    document.querySelector('.form').reset()
    closeModal()
}
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
    document.querySelector('.form').reset()
    document.querySelector('.submitProject').addEventListener('click', () => {
        document.querySelector('.projects').style.display = 'none';
    })
}

const closeModal = () => {
    window.onclick = (e) => {
    if(e.target == tasksModal || e.target == projectModal) {
        e.target.style.display = 'none';
    }
}
}
//Edit project details and remove project form GUI and local storage
function editProject(){
    const updateProjectBtn = document.querySelector('.updateProject');
    const deleteBtns = document.querySelectorAll('.removeBtn');
        const editBtns = document.querySelectorAll('.editBtn');
        let data = JSON.parse(localStorage.getItem('projects'));
            editBtns.forEach(btn => btn.addEventListener('click', (e) => {
                let projectName = defineCard(e); //Gets project title
                let obj = data.filter(item => item.title == projectName); 
                let index = data.findIndex(obj => obj.title == projectName);
                openProjectModalEdit();
                updateProjectBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let newObj = newProjectObj()
                    newObj.toDo = obj[0].toDo;
                    data.splice(index, 1, newObj);
                    localStorage.setItem('projects', JSON.stringify(data))
                    refreshProjects();
                    document.querySelector('.projects').style.display = 'none';
    })
}
))
deleteBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    let projectName = defineCard(e);
    let index = data.findIndex(obj => obj.title == projectName);
    removeProject(index)
    refreshProjects();
}))
}

function newProjectObj(){
    let newObj = {};
    newObj.title = inputs.title.value;
    newObj.description = inputs.description.value;
    return newObj
}

function defineCard(e){//Returns project title string
    let project = e.target.parentElement.parentElement.children[0].children[0].textContent;
    return project
}

buttons.newProjectBtn.addEventListener('click', () => {
    openProjectModal();
    closeModal();
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
window.onload = editMiscTask();