import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import firebase from 'firebase';
import './style.scss';

function Sidebar() {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
  const defaultPathName = history.location.pathname;
  const [active, setActive] = useState<string>(
    defaultPathName !== '/' ? defaultPathName : '/chat'
  );

  if (!user) return <></>;

  const logout = async () => {
    if (window.confirm('Logout?')) {
      try {
        await firebase.auth().signOut();
        setUser(null);
        history.push('/');
      } catch (e) {
        alert('Error during logout');
      }
    }
  };

  const checkActive = (pathName: string): string => {
    if (active === pathName) {
      return 'active';
    } else {
      return '';
    }
  };

  return (
    <>
      <ul className='main-menu'>
        <li>
          <Link
            to='/chat'
            className={checkActive('/chat')}
            onClick={() => setActive('/chat')}
          >
            Chat
          </Link>
        </li>
        <li>
          <Link
            to='/notes'
            className={checkActive('/notes')}
            onClick={() => setActive('/notes')}
          >
            Notes
          </Link>
        </li>
        <li>
          <Link
            to='/todos'
            className={checkActive('/todos')}
            onClick={() => setActive('/todos')}
          >
            Todos
          </Link>
        </li>
        <li>
          <Link
            to='/shopping-list'
            className={checkActive('/shopping-list')}
            onClick={() => setActive('/shopping-list')}
          >
            Shopping list
          </Link>
        </li>
        <li>
          <Link
            to='/watch-list'
            className={checkActive('/watch-list')}
            onClick={() => setActive('/watch-list')}
          >
            Watch list
          </Link>
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

      <div className='bottom'>
        <ul>
          <li>
            <h2>{user}</h2>
          </li>
          <li className='logout' onClick={logout}>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
