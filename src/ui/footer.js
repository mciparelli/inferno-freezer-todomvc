import h from 'inferno-hyperscript';
import cx from 'classnames';

const pluralizeWord = (word, count) => {
  if (count === 1) return word;
  return `${word}s`;
};

const renderClearCompleted = (todos, props) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  if (completedCount === 0) return undefined;
  return h('button.clear-completed', props, 'Clear completed');
};

const renderCount = todos =>  {
  const activeCount = todos.filter(todo => todo.completed === false).length;
  return h('span.todo-count', [
    h('strong', activeCount),
    ` ${pluralizeWord('item', activeCount)} left`
  ]);
};

export default ({ todos, filter, trigger }) => {
  if (todos.length === 0) return undefined;
  return (
    h('footer.footer', [
      renderCount(todos),
      h('ul.filters', [
        h('li', [
          h('a', {
            className: cx({
              selected: filter === undefined
            }),
            href: '#/'
          }, 'All')
        ]),
        h('li', [
          h('a', {
            className: cx({
              selected: filter === 'active'
            }),
            href: '#/active'
          }, 'Active')
        ]),
        h('li', [
          h('a', {
            className: cx({
              selected: filter === 'completed'
            }),
            href: '#/completed'
          }, 'Completed')
        ])
      ]),
      renderClearCompleted(todos, {
        onClick: () => trigger('clearCompleted')
      })
    ])
  );
};
