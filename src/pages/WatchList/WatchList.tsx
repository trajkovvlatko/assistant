import React, {useContext, useRef, useState} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';

import './style.css';
import List from '../../components/WatchList/List';

const db = firebase.database();
const pendingRef = db.ref('watch-list/pending');

function WatchList() {
  const {user} = useContext(UserContext);
  const filmEl = useRef<HTMLInputElement>(null);
  const [selectedGenre, setSelectedGenre] = useState<null | string>(null);

  const save = () => {
    if (!filmEl || !filmEl.current) {
      return;
    }

    const note = filmEl.current.value.trim();
    if (note === '') return;

    pendingRef.push().set({user, note, genre: selectedGenre, at: Date()});
    filmEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  return (
    <>
      <h1>Watch list</h1>

      <List />

      <div className='watch-list-form'>
        <input
          type='text'
          className='film'
          ref={filmEl}
          onKeyUp={onInputKeyUp}
          placeholder='Add a film'
        />
        <select
          className='genre'
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option>-- Select a genre --</option>
          <option>Comedy</option>
          <option>Animation</option>
          <option>Fantasy</option>
          <option>Sci-fi</option>
          <option>Adventure</option>
          <option>Action</option>
          <option>Thriller</option>
          <option>Drama</option>
        </select>
        <button className='save' onClick={save}>
          Add
        </button>
      </div>
    </>
  );
}

export default WatchList;
