import React, {useContext, useRef} from 'react';
import firebase from 'firebase';
import UserContext from 'contexts/UserContext';
import {isValidUrl} from 'helpers/main';
import List from 'components/ShoppingList/List';
import './style.css';

function ShoppingList() {
  const {user} = useContext(UserContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const linkEl = useRef<HTMLInputElement>(null);

  const save = () => {
    if (!inputEl || !inputEl.current || !linkEl || !linkEl.current) return;

    const note = inputEl.current.value.trim();
    if (note === '') return;

    const link = linkEl.current.value.trim();
    if (link !== '' && !isValidUrl(link)) return;

    firebase
      .database()
      .ref('shopping-list/pending')
      .push()
      .set({user, note, link, at: Date()});
    inputEl.current.value = '';
    linkEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  return (
    <>
      <h1>Shopping list</h1>

      <List />

      <div className='shopping-list-form'>
        <input
          type='text'
          ref={inputEl}
          onKeyUp={onInputKeyUp}
          placeholder='Add an item'
        />
        <input
          type='url'
          ref={linkEl}
          onKeyUp={onInputKeyUp}
          placeholder='Add a link'
        />
        <button className='save' onClick={save}>
          Add
        </button>
      </div>
    </>
  );
}

export default ShoppingList;
