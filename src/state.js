import Freezer from 'freezer-js';

const getTodos = () => {
  const dbTodos = localStorage.getItem('todos');
  console.log(dbTodos);
  if (!dbTodos) return [];
  return JSON.parse(dbTodos);
}


const getState = () => {
  return {
    ui: {
      input: ''
    },
    todos: getTodos()
  };
};


export default new Freezer(getState());
