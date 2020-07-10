import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import ContentList from 'components/Shared/ContentList/ContentList';
import IContentItem from 'interfaces/IContentItem';

const ref = firebase.database().ref('notes');

function List() {
  const [notes, setNotes] = useState<IContentItem[]>([]);

  const remove = (key: string) => {
    ref.child(key).remove();
  };

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

  return (
    <div className='list'>
      <ContentList list={notes} remove={remove} />
    </div>
  );
}

export default List;
