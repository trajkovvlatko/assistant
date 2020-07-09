import React, {useState, useRef, useEffect} from 'react';
import firebase from '../../firebase';
import ContentList from 'components/Shared/ContentList/ContentList';
import IContentItem from 'interfaces/IContentItem';

const ref = firebase.database().ref('chat');

function List() {
  const [messages, setMessages] = useState<IContentItem[]>([]);
  const listEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = ref
      .orderByKey()
      .limitToLast(20)
      .on('value', (snapshot) => {
        const messagesList: IContentItem[] = [];
        snapshot.forEach((doc) => {
          messagesList.push({...doc.val(), key: doc.key});
        });
        const oldKeys = JSON.stringify(messages.map((m) => m.key).sort());
        const newKeys = JSON.stringify(messagesList.map((m) => m.key).sort());
        if (oldKeys !== newKeys) {
          setMessages(messagesList);
        }
        if (listEl && listEl.current) {
          listEl.current.scrollTop = listEl.current.scrollHeight;
        }
      });

    return () => ref.off('value', unsubscribe);
  });

  return (
    <div className='messages-list' ref={listEl}>
      <ContentList list={messages} />
    </div>
  );
}

export default List;
