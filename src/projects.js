//Creates new obj with project data
export const newProject = (a, b) => {
    let projectData = {};
    projectData['title'] = a;
    projectData['description'] = b;
    projectData['toDo'] = [];
    return projectData
} 