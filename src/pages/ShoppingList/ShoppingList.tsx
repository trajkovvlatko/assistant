import React, {useContext, useRef, useState, useEffect} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';
import ContentItem from '../../components/ContentItem/ContentItem';
import IContentItem from '../../interfaces/IContentItem';
import './style.css';

const db = firebase.database();
const pendingRef = db.ref('shopping-list/pending');
const completedRef = db.ref('shopping-list/completed');

function ShoppingList() {
  const {user} = useContext(UserContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const [completed, setCompleted] = useState<IContentItem[]>([]);
  const [pending, setPending] = useState<IContentItem[]>([]);

  useEffect(() => {
    const unsubscribePending = pendingRef.on('value', (snapshot) => {
      const pendingList: IContentItem[] = [];
      snapshot.forEach((doc) => {
        pendingList.push({...doc.val(), key: doc.key});
      });
      if (pendingList.length !== pending.length) {
        setPending(pendingList.reverse());
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
    if (!inputEl || !inputEl.current) return;

    const note = inputEl.current.value.trim();
    if (note === '') return;

    pendingRef.push().set({user, note, at: Date()});
    inputEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    save();
  };

  const toggle = async (bucket: string, key: string) => {
    try {
      let from: firebase.database.Reference;
      let to: firebase.database.Reference;
      console.log(typeof pendingRef);
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
      <h1>Shopping list</h1>

      <div className='shopping-lists'>
        <b>Pending</b>
        <div className='pending-list'>
          {pending.map((row: IContentItem) => (
            <ContentItem
              row={row}
              key={row.at}
              toggle={{cb: toggle, bucket: 'pending'}}
            />
          ))}
        </div>

        <b>Completed</b>
        <div className='completed-list'>
          {completed.map((row: IContentItem) => (
            <ContentItem
              row={row}
              key={row.at}
              toggle={{cb: toggle, bucket: 'completed'}}
            />
          ))}
        </div>
      </div>

      <div className='shopping-list-form'>
        <input type='text' ref={inputEl} onKeyUp={onInputKeyUp} />
        <button className='save' onClick={save}>
          Add
        </button>
      </div>
    </>
  );
}

export default ShoppingList;
