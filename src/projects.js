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
    makeLi()
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
    let str = '<ul class="listItem">';
        projects.forEach(el => str += '<li>' + el.title + '</li>');
        str += '</ul>';
return document.getElementById('projects').innerHTML = 'Projects' + str;
}
//Adds projects list to sidebar on page load
window.onload = makeLi()
export {closeModal}