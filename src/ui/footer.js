import h from 'inferno-hyperscript';

const pluralizeWord = (word, count) => {
  if (count === 1) return word;
  return `${word}s`;
};

export default ({ todos, trigger }) => {
  if (todos.length === 0) return undefined;
  const renderClearCompleted = () => {
    const completedCount = todos.map(todo => todo.completed).reduce((prev, next) => prev + next, 0);
    if (completedCount === 0) return undefined;
    return h('button.clear-completed', {
      onClick: () => trigger('clearCompleted')
    }, 'Clear completed');
  };

  return (
    h('footer.footer', [
      h('span.todo-count', [
        h('strong', todos.length),
        ` ${pluralizeWord('item', todos.length)} left`
      ]),
      h('ul.filters', [
        h('li', [
          h('a.selected', {
            href: '#/'
          }, 'All')
        ]),
        h('li', [
          h('a', {
            href: '#/active'
          }, 'Active')
        ]),
        h('li', [
          h('a', {
            href: '#/completed'
          }, 'Completed')
        ])
      ]),
      renderClearCompleted()
    ])
  );
};
