import './app'
/////This module reads misc tasks from task array in local storage and 
////renders tasks to the main div

//Fn takes obj and creates array of task details
const splitObj = (obj) => {
    let result = [];
    result.push([obj.title, obj.description, obj.date, obj.priority])
    return result
}

//applies splitObj fn to each task in the local storage
const groupTasks = () => {
    if(localStorage.getObj('tasks') !== null)
    return localStorage.getObj('tasks').map(task => splitObj(task))
}

//Create DOM elements
 
const makeElement = ([title, description, date, priority]) => {
    let container = document.createElement('div');
    container.classList.add('tContainer');
        let taskTitle = document.createElement('div');
        taskTitle.classList.add('title');
        taskTitle.textContent = title;
            let taskDescription = document.createElement('div');
            taskDescription.classList.add('description');
            taskDescription.textContent = description;
                let taskDate = document.createElement('div');
                taskDate.classList.add('date');
                taskDate.textContent = date;
                    let taskPriority = document.createElement('div');
                    taskPriority.classList.add('priority');
                    taskPriority.textContent = priority;
                    container.append(taskTitle, taskDescription, taskDate, taskPriority);
    return container
}

//Loop over the group tasks array and create container for each array (task)
const appendTasks = () => {//Bad: Creates duplicates with each call
(groupTasks() !== undefined) ? 
groupTasks().map(array => document.querySelector('.main').append(makeElement(...array))) :
console.log('waiting for tasks');
}

const removeDivs = () => {
    const main = document.getElementById('main');
    while (main.firstChild) {
        main.removeChild(main.lastChild)
    }
}

export {appendTasks, removeDivs, makeElement, splitObj, groupTasks}