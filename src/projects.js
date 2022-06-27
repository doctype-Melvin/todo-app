import { addElement } from "./app";
//Add Project Button
let newProjectBtn = document.querySelector('.newProject');

//Form modal and input fields
let projectForm = document.querySelector('.projectForm')
const proForm = document.querySelector('#proForm');
let pTitle = document.querySelector('#pTitle');
let pDescription = document.querySelector('#pDescription');
const addProjectBtn = document.querySelector('.addProject')

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
})

//Prevents reload on submit and closes modal
proForm.addEventListener('submit', (e) => {
    e.preventDefault();
    projectForm.style.display = 'none';
})

const projectList = document.querySelector('.projectList');
let projects = localStorage.getObj('projects');

const makeLI = (title) => {
    const item = document.createElement('li');
    item.textContent = title;
    return {
        item
    }
}

for(let i = 0; i < projects.length; i++) {
    projectList.append(makeLI(projects[i].title))
}

export {closeModal}