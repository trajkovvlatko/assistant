import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import UserContext from 'contexts/UserContext';

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
    <div>
      <h1>Login</h1>
      <div>
        {error && <div>{error}</div>}

        <form>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
          />
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onChange}
          />
          <button onClick={login}>Login</button>
        </form>

        {!process.env.REACT_APP_DISABLE_REGISTRATIONS && (
          <p>
            <Link to='/register'>Register</Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default Login;
