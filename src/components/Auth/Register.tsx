import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';
import './style.scss';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const history = useHistory();

  if (process.env.REACT_APP_DISABLE_REGISTRATIONS) {
    return <></>;
  }

  const register = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('All fields are mandatory.');
      return;
    }

    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (userCredentials.user) {
        await userCredentials.user.updateProfile({displayName: name});
        history.push('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='home'>
      <div className='auth'>
        <h1>Register</h1>
        <div>
          {error && <div className='error'>{error}</div>}

          <form>
            <input
              type='text'
              name='name'
              value={name}
              placeholder='Name'
              onChange={onChange}
            />
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
            <span>
              <Link to='/'>Login</Link>
            </span>
            <button onClick={register}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
