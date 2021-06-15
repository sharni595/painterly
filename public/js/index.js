const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', submitTodoForm);

async function submitTodoForm(e) {
  e.preventDefault();

  const todoInput = document.getElementById('todo-form-input');

  if (todoInput.value.trim() === '') {
    return alert('Please enter a value');
  }

  try {
    const apiResponse = await fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ message: todoInput.value })
    });

    if (apiResponse.ok) {
      todoInput.value = '';
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(id) {
  try {
    const apiResponse = await fetch('/api/todos/', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id 
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (apiResponse.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

// event delegation
document.body.addEventListener('click', (e) => {

  if (e.target && e.target.className.includes('todo-delete-btn')) {
    deleteTodo(e.target.dataset.todoId);
  }
});