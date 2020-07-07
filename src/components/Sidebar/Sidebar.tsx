import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './style.css';

import UserContext from '../../contexts/UserContext';

function Sidebar() {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  if (!user) return <></>;

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  };

  return (
    <div>
      <h2>{user}</h2>

      <br />

      <ul>
        <li>
          <Link to='/chat'>Chat</Link>
        </li>
        <li>
          <Link to='/notes'>Notes</Link>
        </li>
        <li>
          <Link to='/todos'>Todos</Link>
        </li>
        <li>
          <Link to='/shopping-list'>Shopping list</Link>
        </li>
        <li>
          <Link to='/watch-list'>Watch list</Link>
        </li>
        <li>
          <div className='logout' onClick={logout}>
            Logout
          </div>
        </li>
      </ul>
      <hr />

      <div className='chat-options'>
        <h4>Chat options</h4>
        <ul>
          <li>
            Add a note: <b>N:</b>
          </li>
          <li>
            Add a todo: <b>T:</b>
          </li>
          <li>
            Add to watch list: <b>W:</b>
          </li>
          <li>
            Add to shopping list: <b>S:</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
