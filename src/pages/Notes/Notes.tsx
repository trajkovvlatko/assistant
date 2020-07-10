import React, {useContext, useRef} from 'react';
import firebase from 'firebase';
import UserContext from 'contexts/UserContext';
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
    <div className='notes'>
      <div className='main-wrapper-outer'>
        <div className='main-wrapper-inner'>
          <h1>Notes</h1>
          <List />
        </div>
      </div>

      <div className='form-wrapper-outer notes-form'>
        <div className='form-wrapper-inner'>
          <input
            type='text'
            ref={inputEl}
            onKeyUp={onInputKeyUp}
            placeholder='Add a note'
          />
          <button className='save' onClick={save}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;
