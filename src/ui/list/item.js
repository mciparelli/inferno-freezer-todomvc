import R from 'ramda';
import h from 'inferno-hyperscript';
import cx from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default ({ todo, trigger, isEditing }) => {
  const saveOrDestroy = R.pipe(
    R.trim,
    R.ifElse(
      R.isEmpty,
      () => trigger('delete', todo),
      val => trigger('save', val, todo)
    )
  );
  return (
    h('li', {
      className: cx({
        completed: todo.completed,
        editing: isEditing
      }),
      onDidUpdate: liNode => {
        if (!isEditing) return;
        liNode.querySelector('.edit').focus();
      }
    }, [
      h('div.view', [
        h('input.toggle', {
          type: 'checkbox',
          checked: todo.completed,
          onChange: R.pipe(
            R.prop('currentTarget'),
            R.prop('checked'),
            checked => trigger('toggleCompleted', [todo], checked)
          )
        }),
        h('label', {
          ondblClick: () => todo.set('ui', { editText: todo.value })
        }, todo.value),
        h('button.destroy', {
          onClick: () => trigger('delete', todo)
        })
      ]),
      h('input.edit', {
        value: todo.ui ? todo.ui.editText : '',
        onBlur: ev => {
          if (!isEditing) return;
          saveOrDestroy(ev.currentTarget.value);
        },
        onKeyDown: ev => {
          const isEnter = ev.keyCode === ENTER_KEY;
          const isEscape = ev.keyCode === ESCAPE_KEY;
          if (isEnter) {
            saveOrDestroy(ev.currentTarget.value);
            return;
          }
          if (isEscape) {
            todo.set('ui', { editText: '' });
            return;
          }
        }
      })
    ])
  );
};
