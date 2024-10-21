const input = document.querySelector('.header__input');
const headerList = document.querySelectorAll('.header__list');
const button = document.querySelector('.header__btn');
const secButton = document.querySelector('.header__sec__btn');
const noTasks = document.querySelector('.header__this');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

button.addEventListener('click', function () {
	if (input.value.trim() !== '') {
		addTask(input.value.trim(), false);
		input.value = '';
		input.focus();
	}
});

secButton.addEventListener('click', function () {
	headerList.innerHTML = '';
	saveTasksToLocalStorage();
	secButton.disabled = true;
	noTasks.style.display = 'block';
});

function addTask(text, completed) {
	const newTask = document.createElement('li');
	newTask.textContent = text;

	const newCheckbox = document.createElement('input');
	newCheckbox.type = 'checkbox';
	newCheckbox.checked = completed;
	newTask.prepend(newCheckbox);

	newTask.style.textDecoration = completed ? 'line-through' : 'none';

	newCheckbox.addEventListener('change', function () {
		newTask.style.textDecoration = newCheckbox.checked
			? 'line-through'
			: 'none';
		saveTasksToLocalStorage();
	});

	headerList.appendChild(newTask);
	saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
	const tasks = Array.from(headerList.querySelectorAll('li')).map((task) => {
		const text = task.childNodes[1]?.nodeValue.trim();
		const completed = task.querySelector('input').checked;
		return { text, completed };
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
	const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
	tasks.forEach(({ text, completed }) => addTask(text, completed));
	secButton.disabled = tasks.length === 0;
	noTasks.style.display = tasks.length === 0 ? 'block' : 'none';
}
