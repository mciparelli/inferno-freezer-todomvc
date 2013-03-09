import R from 'ramda';
import h from 'inferno-hyperscript';
import Item from './item';

export default ({ todos, trigger }) => {
  if (todos.length === 0) return undefined;
  const completed = todos.map(todo => todo.completed).reduce((prev, next) => prev + next, 0);
  const shouldCheckAllCompleted = completed === todos.length;
  return (
    h('section.main', [
      h('input.toggle-all', {
        type: 'checkbox',
        checked: shouldCheckAllCompleted,
        onChange: R.pipe(
          R.prop('currentTarget'),
          R.prop('checked'),
          R.curryN(3, trigger)('toggleCompleted', todos)
        )
      }),
      h('label', {
        for: 'toggle-all'
      }, 'Mark all as complete'),
      h('ul.todo-list', todos.map(todo =>
        Item({ todo, trigger, isEditing: todo.ui && todo.ui.editText !== '' })
      ))
    ])
  );
};
