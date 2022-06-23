let newTaskBtn = document.querySelector('.newTask');
let newProjectBtn = document.querySelector('.newProject');

newTaskBtn.addEventListener('click', (e) => console.log(e.target.id));
newProjectBtn.addEventListener('click', (e) => console.log(e.target.id));