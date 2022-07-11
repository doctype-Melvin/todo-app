//Edit and delete data in local storage

import { addToStorage } from "./app";
import { newProject } from "./projects";
import { newTask} from "./tasks";

////////      Tasks
//Add new data to storage location tasks
//a = task, b = note, c = date
const taskData = (a, b, c) => {//Calls storage fn for the tasks array and creates new task obj
    addToStorage('tasks', (newTask(a, b, c)))
};


///////       Projects
//Add new data to storage location projects
// a = title, b = description
const projectData = (a, b,) => {//Calls storage fn for the projects array and creates new project obj
    addToStorage('projects', (newProject(a, b)))
};

// projectData('New Project', '123')
// projectData('Example Project', 'Abc')

//**PROJECT TASKS manipulation**
////////  Create task in project toDo array
//Look up obj in projects array
const lookUp = (string) => {
    let projectsData = JSON.parse(localStorage.getItem('projects'));
    let obj = projectsData.filter(item => item.title == string)[0];
    return obj
}

//Update the obj array
const pushNewData = (data, string) => {
    let newData = data;
    let oldObj = lookUp(string);
    let objArr = oldObj.toDo;
    objArr.push(newData)
    let newObj = oldObj
    return newObj
}

//Update the obj in projects array
//Fn creates new task, pushes the task to the obj array & replaces the project obj in the parent projects array
const replaceObj = (newData, string) => {
    let index = JSON.parse(localStorage.getItem('projects')).indexOf(lookUp(string));
    let newObj = newData;
    let oldData = JSON.parse(localStorage.getItem('projects'))
    oldData.splice(index, 1, newObj);
    localStorage.setItem('projects', JSON.stringify(oldData))
}

//Creates new task and updates the projects obj
const createProjectTask = (title, note, date, string) => {
    let task = newTask(title, note, date);
    return replaceObj(pushNewData(task, string), string)
}

//createProjectTask('Training', 'Upper', 'today', 'New Project')

/////////  Remove task from project obj array
//Remove/Replace array element at index i
const updateArray = (data, i) => {
    let array = data;
    array.splice(i, 1);
    return array
}

//Update the obj toDo array
const updateObj = (data, string) => {
    let oldData = lookUp(string);
    let newArray = data;
    oldData.toDo = newArray;
    return oldData //Array after removing item
}

//Fn takes index and project title as arguments
//Grabs the projects toDo list, removes the desired index item,
//and updates the toDo list
const removeProjectTask = (i, string) => {
    let toDo = lookUp(string).toDo
    return replaceObj(updateObj(updateArray(toDo, i), string), 'New Project')
}
//removeProjectTask(1, 'New Project')


////////  Edit project tasks
const getTask = (string, i) => {//Returns project task from index i
    let task = lookUp(string).toDo[i];
   return task
}

const newValues = (task, note, date) => {//Creates new task obj
    let newTask = task;
    let newNote = note;
    let newDate = date;
    return {
        newTask,
        newNote,
        newDate
    }
}

const editTask = (string, i, newData) => {//updates task values
    let oldData = getTask(string, i);

    (newData.newTask == '') ?
    oldData.title : oldData.title = newData.newTask;
    
    (newData.newNote == '') ?
    oldData.note = oldData.note : oldData.note = newData.newNote;
    
    (newData.newDate == '') ?
    oldData.date = oldData.date : oldData.date = newData.newDate;
    
    return oldData
}

 const replaceTask = (string, i, newData) => {//replaces the task in project's task array
    //updates the project's toDo array
    //replaces the new project obj
    let projectToDo = lookUp(string)['toDo'];
    projectToDo.splice(i, 1, newData);
    let projectObj = lookUp(string);
    projectObj['toDo'] = projectToDo;
    replaceObj(projectObj, string)
    return projectObj
}

const editProjectTask = (string, i, task, note, date) => {
    return replaceTask(string, i , editTask(string, i, newValues(task, note, date)))
}
// console.log(replaceTask('New Project', 0, editTask('New Project', 0, newValues('Make lunch', 'Rice & Beans', 'today'))))


//**PROJECT details manipulation**
const getProjectDetails = (string) => {//Returns the projects obj
    return lookUp(string)
}

const newProjectDetails = (a, b, oldData) => {//Checks for new project details and replaces the old obj
    let oldTitle = oldData.title;
    (a == '') ? oldData.title : oldData.title = a;
    (b == '') ? oldData.description : oldData.description = b;
    let newDetails = oldData
    return replaceObj(newDetails, oldTitle)
}

const setProjectDetails = (string, a, b) => {
return newProjectDetails(a, b, getProjectDetails(string));
}

// setProjectDetails('Old Project', 'Project Example', '123');

const removeProject = (i) => {
    let oldData = JSON.parse(localStorage.getItem('projects'));
    oldData.splice(i, 1);
    return localStorage.setItem('projects', JSON.stringify(oldData))
}
