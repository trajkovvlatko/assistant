import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import IContentItem from 'interfaces/IContentItem';
import ContentList from 'components/Shared/ContentList/ContentList';

const db = firebase.database();
const pendingRef = db.ref('watch-list/pending');
const completedRef = db.ref('watch-list/completed');

function List() {
  const [completed, setCompleted] = useState<IContentItem[]>([]);
  const [pending, setPending] = useState<IContentItem[]>([]);

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
    <div className='watch-lists'>
      <b>Pending</b>
      <ContentList list={pending} toggle={{cb: toggle, bucket: 'pending'}} />

      <b>Completed</b>
      <ContentList
        list={completed}
        toggle={{cb: toggle, bucket: 'completed'}}
      />
    </div>
  );
}

export default List;
