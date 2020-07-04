import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

import './style.css';

function Home() {
  const {setUser} = useContext(UserContext);
  const history = useHistory();

  const selectUser = (name: string) => {
    setUser(name);
    window.localStorage.setItem('user', name);
    history.push('/chat');
  };

  const lastUser = window.localStorage.getItem('user');
  const continueAsLastUser = () => {
    if (lastUser) {
      selectUser(lastUser);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {lastUser && (
        <>
          <div className='last-user' onClick={continueAsLastUser}>
            Continue as {lastUser}?
          </div>
          <div className='last-user'>Or</div>
        </>
      )}
      <div className='users'>
        <div onClick={() => selectUser('magica')}>
          <img src='https://via.placeholder.com/200x200' alt='' />
          <h4>Magica</h4>
        </div>
        <div onClick={() => selectUser('vlatko')}>
          <img src='https://via.placeholder.com/200x200' alt='' />
          <h4>Vlatko</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
