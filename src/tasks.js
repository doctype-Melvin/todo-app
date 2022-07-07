//Creates new obj with task data
export const newTask = (a, b, c) => {
    let taskData = {};
    taskData['title'] = a;
    taskData['note'] = b;
    taskData['date'] = c;
    return taskData;
}