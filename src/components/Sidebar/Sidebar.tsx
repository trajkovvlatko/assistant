import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import firebase from 'firebase';
import './style.scss';

function Sidebar() {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  if (!user) return <></>;

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      history.push('/');
    } catch (e) {
      alert('Error during logout');
    }
  };

  const checkActive = (pathname: string): string => {
    if (history.location.pathname === pathname) {
      return 'active';
    } else {
      return '';
    }
  };

  return (
    <>
      <ul className='main-menu'>
        <li>
          <Link to='/chat' className={checkActive('/chat')}>
            Chat
          </Link>
        </li>
        <li>
          <Link to='/notes' className={checkActive('/notes')}>
            Notes
          </Link>
        </li>
        <li>
          <Link to='/todos' className={checkActive('/todos')}>
            Todos
          </Link>
        </li>
        <li>
          <Link to='/shopping-list' className={checkActive('/shopping-list')}>
            Shopping list
          </Link>
        </li>
        <li>
          <Link to='/watch-list' className={checkActive('/watch-list')}>
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
