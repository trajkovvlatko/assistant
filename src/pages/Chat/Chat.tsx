import React, {useContext, useRef, useState, useEffect} from 'react';
import firebase from '../../firebase';
import UserContext from '../../contexts/UserContext';
import IContentItem from '../../interfaces/IContentItem';
import './style.css';
import ContentList from '../../components/ContentList/ContentList';

interface ITrigger {
  [key: string]: string;
}

const ref = firebase.database().ref('chat');
const triggers: ITrigger = {
  N: 'notes',
  T: 'todos/pending',
  W: 'watch-list/pending',
  S: 'shopping-list/pending',
};

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

    checkTriggers(message);

    inputEl.current.value = '';
  };

  const checkTriggers = (message: string) => {
    Object.keys(triggers).forEach((trigger) => {
      if (message.startsWith(`${trigger}:`)) {
        const note = message.replace(`${trigger}:`, '').trim();
        const obj = {user, note, at: Date()};
        const bucket = triggers[trigger];
        firebase.database().ref(bucket).push().set(obj);
      }
    });
  };

  const onInputKeyUp = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) return;

    send();
  };

  return (
    <>
      <h1>Chat</h1>
      <div className='messages-list' ref={listEl}>
        <ContentList list={messages} />
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
