import React, {useContext, useRef} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';

import './style.css';
import List from '../../components/Todos/List';

function Todos() {
  const {user} = useContext(UserContext);
  const todoEl = useRef<HTMLInputElement>(null);
  const dueDateEl = useRef<HTMLInputElement>(null);
  const durationEl = useRef<HTMLInputElement>(null);

  const save = () => {
    if (
      !todoEl ||
      !todoEl.current ||
      !dueDateEl ||
      !dueDateEl.current ||
      !durationEl ||
      !durationEl.current
    ) {
      return;
    }

    const note = todoEl.current.value.trim();
    if (note === '') return;

    const duration = durationEl.current.value
      ? parseInt(durationEl.current.value)
      : '';
    const dueDate = dueDateEl.current.value;
    firebase
      .database()
      .ref('todos/pending')
      .push()
      .set({user, note, duration, dueDate, at: Date()});
    todoEl.current.value = '';
    durationEl.current.value = '';
    dueDateEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  return (
    <>
      <h1>Todos</h1>

      <List />

      <div className='todos-form'>
        <input
          type='text'
          className='todo'
          ref={todoEl}
          onKeyUp={onInputKeyUp}
          placeholder='Add a todo'
        />
        <input
          type='date'
          className='due-date'
          ref={dueDateEl}
          onKeyUp={onInputKeyUp}
          placeholder='Due date'
        />
        <input
          type='number'
          min='0'
          step='1'
          name='test'
          className='duration'
          ref={durationEl}
          onKeyUp={onInputKeyUp}
          placeholder='Estimate (min)'
        />
        <button className='save' onClick={save}>
          Add
        </button>
      </div>
    </>
  );
}

export default Todos;
