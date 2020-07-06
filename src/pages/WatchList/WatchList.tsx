import React, {useContext, useRef, useState, useEffect} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';
import IContentItem from '../../interfaces/IContentItem';

import './style.css';
import ContentList from '../../components/ContentList/ContentList';

const db = firebase.database();
const pendingRef = db.ref('watch-list/pending');
const completedRef = db.ref('watch-list/completed');

function WatchList() {
  const {user} = useContext(UserContext);
  const filmEl = useRef<HTMLInputElement>(null);
  const [completed, setCompleted] = useState<IContentItem[]>([]);
  const [pending, setPending] = useState<IContentItem[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<null | string>(null);

  useEffect(() => {
    const unsubscribePending = pendingRef.on('value', (snapshot) => {
      const pendingList: IContentItem[] = [];
      snapshot.forEach((doc) => {
        pendingList.push({...doc.val(), key: doc.key});
      });
      if (pendingList.length !== pending.length) {
        setPending(pendingList);
      }
    });

    const unsubscribeCompleted = completedRef
      .orderByKey()
      .limitToLast(5)
      .on('value', (snapshot) => {
        const completedList: IContentItem[] = [];
        snapshot.forEach((doc) => {
          completedList.push({...doc.val(), key: doc.key});
        });
        const oldKeys = JSON.stringify(completed.map((m) => m.key).sort());
        const newKeys = JSON.stringify(completedList.map((m) => m.key).sort());
        if (oldKeys !== newKeys) {
          setCompleted(completedList.reverse());
        }
      });

    return () => {
      pendingRef.off('value', unsubscribePending);
      completedRef.off('value', unsubscribeCompleted);
    };
  });

  const save = () => {
    console.log('save');
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

  const toggle = async (bucket: string, key: string) => {
    try {
      let from: firebase.database.Reference;
      let to: firebase.database.Reference;
      if (bucket === 'pending') {
        from = pendingRef;
        to = completedRef;
      } else if (bucket === 'completed') {
        from = completedRef;
        to = pendingRef;
      } else {
        console.error('Invalid bucket name.');
        return;
      }
      const snap = await from.child(key).once('value');
      const val = {...snap.val()};
      to.push().set(val);
      from.child(key).remove();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Watch list</h1>

      <div className='watch-lists'>
        <b>Pending</b>
        <ContentList list={pending} toggle={{cb: toggle, bucket: 'pending'}} />

        <b>Completed</b>
        <ContentList
          list={completed}
          toggle={{cb: toggle, bucket: 'completed'}}
        />
      </div>

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
