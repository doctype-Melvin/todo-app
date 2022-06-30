import './app'

// (function getButtons(){
//     const editBtns = document.querySelectorAll('.editBtn');
// const deleteBtns = document.querySelectorAll('.deleteBtn');
// editBtns.forEach(btn => btn.addEventListener('click', () => console.log('Edit Edit Edit')));
// deleteBtns.forEach(btn => btn.addEventListener('click', () => console.log('Delete Delete Delete')));
// console.log(editBtns, deleteBtns)
// })()

const data = (() => {
    let projects = JSON.parse(localStorage.getItem('projects'));
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    return {
        projects,
        tasks
    }
})()
