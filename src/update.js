//Edit and delete data in local storage

import { addToStorage } from "./app";
import { newProject } from "./projects";
import { newTask} from "./tasks";

//Tasks
const taskData = (a, b, c) => {//Calls storage fn for the tasks array and creates new task obj
    addToStorage('tasks', (newTask(a, b, c)))
};

//Projects
const projectData = (a, b,) => {//Calls storage fn for the projects array and creates new project obj
    addToStorage('projects', (newProject(a, b)))
};
