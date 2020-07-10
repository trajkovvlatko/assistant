import React, {useContext, useRef} from 'react';
import firebase from 'firebase';
import UserContext from 'contexts/UserContext';
import './style.scss';
import List from 'components/Chat/List';

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
    <div className='chat'>
      <div className='main-wrapper-outer'>
        <div className='main-wrapper-inner'>
          <h1>Chat</h1>
          <List />
        </div>
      </div>

      <div className='form-wrapper-outer chat-form'>
        <div className='form-wrapper-inner'>
          <input
            type='text'
            ref={inputEl}
            onKeyUp={onInputKeyUp}
            placeholder='Message'
          />
          <button className='save' onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
