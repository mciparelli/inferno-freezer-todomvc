/* global localStorage */
import Freezer from 'freezer-js';

const getTodos = () => {
  const dbTodos = localStorage.getItem('todos');
  if (!dbTodos) return [];
  return JSON.parse(dbTodos);
};


const getState = () => ({
  ui: {
    input: ''
  },
  todos: getTodos()
});


export default new Freezer(getState());
