import h from 'inferno-hyperscript';
import Header from './header';
import List from './list/index';
import Footer from './footer';
import Info from './info';

export default ({ state, trigger }) =>
  h('div', [
    h('section.todoapp', [
      Header({ state, trigger }),
      List({ todos: state.todos, trigger }),
      Footer({ todos: state.todos, trigger })
    ]),
    Info()
  ]);
