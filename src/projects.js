import { newTask } from "./tasks";

//Creates new obj with project data
export const newProject = (a, b) => {
    let projectData = {};
    projectData['title'] = a;
    projectData['description'] = b;
    projectData['toDo'] = [];
    return projectData
}

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

// replaceObj(pushNewData(newTask('Clean Up', 'Swipe floors', 'today'), 'New Project'), 'New Project')