//Edit and delete data in local storage

import { addToStorage } from "./app";
import { newProject } from "./projects";
import { newTask} from "./tasks";

////////      Tasks
//Add new data to storage location tasks
const taskData = (a, b, c) => {//Calls storage fn for the tasks array and creates new task obj
    addToStorage('tasks', (newTask(a, b, c)))
};


///////       Projects
//Add new data to storage location projects
const projectData = (a, b,) => {//Calls storage fn for the projects array and creates new project obj
    addToStorage('projects', (newProject(a, b)))
};

// projectData('New Project', '123')

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
// createProjectTask('Kill toddlers', 'With silence', 'Today', 'New Project')

/////////  Remove task from project obj array
//Remove array element at index i
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
//removeProjectTask(0, 'New Project')


////////  Edit project tasks
const getTask = (string, i) => {
    let toDo = lookUp(string).toDo[i];
   return toDo
}

const newValues = (task, note, date) => {
    let newTask = task;
    let newNote = note;
    let newDate = date;
    return {
        newTask,
        newNote,
        newDate
    }
}

const editTask = (string, i, newData) => {
    let oldData = getTask(string, i);
    
    (oldData.title =! '' && newData.newTask == '') 
    ? oldData.title = oldData.title 
    : oldData.title = newData.newTask;
    
    (oldData.note =! '' && newData.newNote == '') 
    ? oldData.note = oldData.note 
    : oldData.note = newData.newNote;

    (oldData.date =! '' && newData.newDate == '') 
    ? oldData.date = oldData.date 
    : oldData.date = newData.newDate;
    
    console.log(oldData)
}



console.log(editTask('New Project', 0, newValues('Have food', 'For thought', 'Today')))