const input = document.querySelector('.header__input');
const headerList = document.querySelector('.header__list');
const headerItems = document.querySelector('.header__item');
const button = document.querySelector('.header__btn');
const secButton = document.querySelector('.header__sec__btn');
const noTasks = document.querySelector('.header__this');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
updateTaskState();
button.addEventListener('click',function(){
if(input.value !==''){
const newTask = document.createElement('li');
const taskValue = input.value.trim();
newTask.textContent = taskValue;
const newCheckbox = document.createElement('input');
newCheckbox.type = 'checkbox';
newCheckbox.disabled = false;
newTask.prepend(newCheckbox);
newCheckbox.addEventListener('change',function(){
    if(newCheckbox.checked){
        newTask.style.textDecoration = 'line-through';
    }else{
        newTask.style.textDecoration = 'none';
    }
})
headerList.appendChild(newTask);
input.value = '';
input.focus();
    }
})
function saveTasksToLocalStorage() {
    const tasks = [];
    headerList.querySelectorAll('li').forEach(task => {
        const taskText = task.textContent;
        const isChecked = task.querySelector('input').checked;
        tasks.push({ text: taskText, completed: isChecked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}
secButton.disabled = false;
noTasks.style.display = 'none'
secButton.addEventListener('click', function(){
    headerList.innerHTML = '';
    secButton.disabled = true;
    noTasks.style.display = 'block'
})
