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