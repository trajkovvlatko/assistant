import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import './style.scss';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const {setUser} = useContext(UserContext);
  const history = useHistory();

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (userCredentials.user?.displayName) {
        setUser(userCredentials.user.displayName);
        history.push('/chat');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <div>
        {error && <div className='error'>{error}</div>}

        <form>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onChange}
          />
          {!process.env.REACT_APP_DISABLE_REGISTRATIONS && (
            <span>
              <Link to='/register'>Register</Link>
            </span>
          )}
          <button onClick={login}>Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
