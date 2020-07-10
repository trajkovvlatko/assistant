import React, {useContext, useRef} from 'react';
import firebase from 'firebase';
import UserContext from 'contexts/UserContext';
import './style.scss';
import List from 'components/Notes/List';

const ref = firebase.database().ref('notes');

function Notes() {
  const {user} = useContext(UserContext);
  const inputEl = useRef<HTMLInputElement>(null);

  const save = () => {
    if (!inputEl || !inputEl.current) return;

    const note = inputEl.current.value.trim();
    if (note === '') return;

    ref.push().set({user, note, at: Date()});
    inputEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  return (
    <>
      <h1>Notes</h1>

      <List />

      <div className='notes-form'>
        <input type='text' ref={inputEl} onKeyUp={onInputKeyUp} />
        <button className='save' onClick={save}>
          Save
        </button>
      </div>
    </>
  );
}

export default Notes;
