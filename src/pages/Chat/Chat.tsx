import React, {useContext, useRef, useState, useEffect} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';
import ContentItem from '../../components/ContentItem/ContentItem';
import IContentItem from '../../interfaces/IContentItem';
import './style.css';

const ref = firebase.database().ref('chat');

function Chat() {
  const {user} = useContext(UserContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const listEl = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<IContentItem[]>([]);

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

  const send = () => {
    if (!inputEl || !inputEl.current) return;

    const message = inputEl.current.value.trim();
    if (message === '') return;

    ref.push().set({user, note: message, at: Date()});
    inputEl.current.value = '';
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    send();
  };

  return (
    <>
      <h1>Chat</h1>
      <div className='messages-list' ref={listEl}>
        {messages.map((row: IContentItem) => (
          <div className={user === row.user ? 'mine' : 'others'} key={row.at}>
            <ContentItem row={row} />
          </div>
        ))}
      </div>

      <div className='chat-form'>
        <input type='text' ref={inputEl} onKeyUp={onInputKeyUp} />
        <button className='save' onClick={send}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;
