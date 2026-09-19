(function (root) {
  const COOKIE_NAME = 'todo_list';

  function addTask(tasks, text) {
    if (typeof text !== 'string') return tasks.slice();
    const task = text.trim();
    return task ? [task, ...tasks] : tasks.slice();
  }

  function parseTasks(cookieValue) {
    try {
      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      return Array.isArray(parsed)
        ? parsed.filter((task) => typeof task === 'string' && task.trim())
            .map((task) => task.trim())
        : [];
    } catch {
      return [];
    }
  }

  function removeTask(tasks, index) {
    return tasks.filter((_, taskIndex) => taskIndex !== index);
  }

  function serializeTasks(tasks) {
    return encodeURIComponent(JSON.stringify(tasks));
  }

  root.addTask = addTask;
  root.parseTasks = parseTasks;
  root.removeTask = removeTask;
  root.serializeTasks = serializeTasks;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addTask, parseTasks, removeTask, serializeTasks };
  }

  if (typeof document === 'undefined') return;

  const list = document.getElementById('ft_list');
  const newTaskButton = document.getElementById('new-task');
  const savedCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  let tasks = savedCookie ? parseTasks(savedCookie.slice(COOKIE_NAME.length + 1)) : [];

  function saveTasks() {
    document.cookie = `${COOKIE_NAME}=${serializeTasks(tasks)}; max-age=31536000; path=/`;
  }

  function render() {
    list.replaceChildren();
    tasks.forEach((task, index) => {
      const item = document.createElement('div');
      item.textContent = task;
      item.tabIndex = 0;
      item.addEventListener('click', () => {
        if (confirm('Remove this to-do item?')) {
          tasks = removeTask(tasks, index);
          saveTasks();
          render();
        }
      });
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') item.click();
      });
      list.append(item);
    });
  }

  newTaskButton.addEventListener('click', () => {
    tasks = addTask(tasks, prompt('New to-do:'));
    saveTasks();
    render();
  });

  render();
}(globalThis));
