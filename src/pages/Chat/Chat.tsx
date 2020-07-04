import React, {useContext} from 'react';
import UserContext from '../../contexts/UserContext';

function Chat() {
  const {user} = useContext(UserContext);

  return (
    <div>
      <h1>Chat</h1>
      {user}
    </div>
  );
}

export default Chat;
