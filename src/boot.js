/* global document localStorage */
import { render } from 'inferno-dom';
import Reactions from './reactions';
import State from './state';
import Router from './router';
import App from './ui/index';

Reactions(State);

const run = () => {
  if (module.hot) {
    module.hot.accept();
  }
  const state = State.get();
  const todosToSave = state.todos.map(todo => Object.assign({}, todo, { ui: undefined }));
  localStorage.setItem('todos', JSON.stringify(todosToSave));
  render(App({
    state,
    trigger: State.trigger
  }), document.body);
};

State.on('update', run);

Router(State).init();
run();
