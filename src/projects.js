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
addProjectBtn.addEventListener('click', () => addElement('project', pTitle.value, pDescription.value))


proForm.addEventListener('submit', (e) => {
    e.preventDefault();
    projectForm.style.display = 'none'
})

//Next: create miscellaneous tasks in local storage

export {closeModal}