//Here are functions that are shared between both sections of the local storage

//IIFE checks if storage items exist
//if not creates them
export const createStorage = (() => {
    if((localStorage.getItem('tasks') == null) &&
        (localStorage.getItem('projects') == null)){
        localStorage.setItem('tasks', '[]');
        localStorage.setItem('projects', '[]');
        }else if((localStorage.getItem('tasks') != null) &&
            (localStorage.getItem('projects') == null)){
            localStorage.setItem('projects', '[]');
                }else if ((localStorage.getItem('projects') != null) &&
                (localStorage.getItem('tasks') == null)){
                    localStorage.setItem('tasks', '[]')
                }
})()

//Adds new obj to the selected storage section
export const addToStorage = (location, data) => {
    if(location == 'tasks'){
        let array = JSON.parse(localStorage.getItem('tasks'));
        let newData = data;
        array.push(newData);
        localStorage.setItem('tasks', JSON.stringify(array));
    }else if(location == 'projects'){
        let array = JSON.parse(localStorage.getItem('projects'));
        let newData = data;
        array.push(newData);
        localStorage.setItem('projects', JSON.stringify(array));
    }
}