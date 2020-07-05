import React, {useContext, useRef, useState, useEffect} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';
import ContentItem from '../../components/ContentItem/ContentItem';
import IContentItem from '../../interfaces/IContentItem';
import './style.css';

const ref = firebase.database().ref('notes');

function Notes() {
  const {user} = useContext(UserContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState<IContentItem[]>([]);

  useEffect(() => {
    const unsubscribe = ref.on('value', (snapshot) => {
      const notesList: IContentItem[] = [];
      snapshot.forEach((doc) => {
        notesList.push({...doc.val(), key: doc.key});
      });
      if (notesList.length !== notes.length) {
        setNotes(notesList.reverse());
      }
    });

    return () => ref.off('value', unsubscribe);
  });

  const save = () => {
    if (!inputEl || !inputEl.current) return;

    const note = inputEl.current.value.trim();
    if (note === '') return;

    ref.push().set({user, note, at: Date()});
    inputEl.current.value = '';
  };

  const remove = (key: string) => {
    ref.child(key).remove();
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  return (
    <>
      <h1>Notes</h1>
      <div className='notes-list'>
        {notes.map((row: IContentItem) => (
          <ContentItem row={row} remove={remove} key={row.at} />
        ))}
      </div>

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
