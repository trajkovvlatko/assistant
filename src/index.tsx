import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

import Chat from 'pages/Chat/Chat';
import Notes from 'pages/Notes/Notes';
import Todos from 'pages/Todos/Todos';
import ShoppingList from 'pages/ShoppingList/ShoppingList';
import WatchList from 'pages/WatchList/WatchList';
import Sidebar from 'components/Sidebar/Sidebar';
import UserContext from 'contexts/UserContext';
import WithUser from 'components/WithUser';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import './index.scss';

const App: React.FC = () => {
  const [user, setUser] = useState<null | string>('');

  firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
      setUser(u.displayName);
    }
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <div className='container'>
            <Sidebar />
            <div className='main'>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                {user && (
                  <WithUser>
                    <Route path='/chat' exact component={Chat} />
                    <Route path='/notes' exact component={Notes} />
                    <Route path='/todos' exact component={Todos} />
                    <Route
                      path='/shopping-list'
                      exact
                      component={ShoppingList}
                    />
                    <Route path='/watch-list' exact component={WatchList} />
                  </WithUser>
                )}
              </Switch>
            </div>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
