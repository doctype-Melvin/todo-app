//Projects local storage
export const newProject = (a, b) => {
    let projectData = {};
    projectData['title'] = a;
    projectData['description'] = b;
    projectData['toDo'] = [];
    return projectData
} 