import h from 'inferno-hyperscript';

export default () =>
  h('footer.info', [
    h('p', 'Double-click to edit a todo'),
    h('p', [
      'Created by ',
      h('a', {
        href: 'http://github.com/mciparelli'
      }, 'Martín Ciparelli')
    ]),
    h('p', [
      'Part of ',
      h('a', {
        href: 'http://todomvc.com'
      }, 'TodoMVC')
    ])
  ]);
