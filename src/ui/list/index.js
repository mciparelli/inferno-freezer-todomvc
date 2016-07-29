import R from 'ramda';
import h from 'inferno-hyperscript';
import Item from './item';

const shouldCheckAllCompleted = (todos, filter) => {
  if (filter === 'completed') return true;
  if (filter !== undefined) return false;
  return todos.filter(todo => todo.completed).length === todos.length;
};

const filterTodos = (todos, filter) => {
  if (filter === undefined) return todos;
  return todos.filter(todo => {
    const passesCompleted = filter === 'completed' && todo.completed;
    const passesActive = filter === 'active' && todo.completed === false;
    return passesCompleted || passesActive;
  });
};

export default ({ todos, filter, trigger }) => {
  if (todos.length === 0) return undefined;
  const filteredTodos = filterTodos(todos, filter);
  return (
    h('section.main', [
      h('input.toggle-all', {
        type: 'checkbox',
        checked: shouldCheckAllCompleted(filteredTodos, filter),
        onChange: R.pipe(
          R.prop('currentTarget'),
          R.prop('checked'),
          R.curryN(3, trigger)('toggleCompleted', filteredTodos)
        )
      }),
      h('label', {
        for: 'toggle-all'
      }, 'Mark all as complete'),
      h('ul.todo-list', filteredTodos.map(todo =>
        Item({ todo, trigger, isEditing: todo.ui && todo.ui.editText !== '' })
      ))
    ])
  );
};
