import React, {useContext, useRef, useState} from 'react';
import firebase from 'firebase';
import UserContext from 'contexts/UserContext';
import List from 'components/WatchList/List';
import './style.scss';

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

  const onGenreChange = (e: React.FormEvent<HTMLSelectElement>) => {
    let val: string | null = e.currentTarget.value;
    if (val === '0') {
      val = null;
    }
    setSelectedGenre(val);
  };

  return (
    <div className='watch-list'>
      <div className='main-wrapper-outer'>
        <div className='main-wrapper-inner'>
          <h1>Watch list</h1>
          <List />
        </div>
      </div>

      <div className='form-wrapper-outer watch-list-form'>
        <div className='form-wrapper-inner'>
          <input
            type='text'
            className='film'
            ref={filmEl}
            onKeyUp={onInputKeyUp}
            placeholder='Add a film'
          />
          <select className='genre' onChange={onGenreChange}>
            <option value='0'>-- Select a genre --</option>
            <option value='Comedy'>Comedy</option>
            <option value='Animation'>Animation</option>
            <option value='Fantasy'>Fantasy</option>
            <option value='Sci-fi'>Sci-fi</option>
            <option value='Adventure'>Adventure</option>
            <option value='Action'>Action</option>
            <option value='Thriller'>Thriller</option>
            <option value='Drama'>Drama</option>
          </select>
          <button className='save' onClick={save}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchList;
