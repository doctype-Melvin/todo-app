import { addElement } from "./app";
import { closeModal } from "./projects";

//Add task button
let newTaskBtn = document.querySelector('.newTask');

const taskForm = document.querySelector('.taskForm');
const tForm = document.querySelector('#tForm');
const title = document.querySelector('#tTitle');
const description = document.querySelector('#tDescription');
const date = document.querySelector('#tDate');
const priority = document.querySelectorAll('.radio');
const addTaskBtn = document.querySelector('.addTask');


newTaskBtn.addEventListener('click', () => {
    taskForm.style.display = 'flex';
    tForm.reset();
    window.onclick = (e) => {
        if (e.target == taskForm) {
            taskForm.style.display = 'none'
        }
    }
});

//Sets the selected priority
let prio = ''
priority.forEach(opt => opt.addEventListener('change', (e) => prio = (e.target.value)));

//Submits form and creates object
addTaskBtn.addEventListener('click', () => addElement('task', title.value, description.value, date.value, prio))

//Prevents reload on submit and closes modal
tForm.addEventListener('submit', (e) => {
    e.preventDefault();
    taskForm.style.display = 'none'
})