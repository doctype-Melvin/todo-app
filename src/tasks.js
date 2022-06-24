import { addElement } from "./app";
import { closeModal } from "./projects";

//Add task button
let newTaskBtn = document.querySelector('.newTask');

const taskForm = document.querySelector('.taskForm');
const tForm = document.querySelector('#tForm');
const title = document.querySelector('#tTitle');
const description = document.querySelector('#tDescription');
const date = document.querySelector('#tDate');
const priority = document.querySelector('.radio');
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

addTaskBtn.addEventListener('click', () => {
    addElement('task', title.value, description.value, date.value)
})

tForm.addEventListener('submit', (e) => {
    e.preventDefault();
    taskForm.style.display = 'none'
})