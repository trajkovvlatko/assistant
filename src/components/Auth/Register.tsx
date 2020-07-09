import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useHistory} from 'react-router-dom';

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
    <div>
      <h1>Register</h1>
      <div>
        {error && <div>{error}</div>}

        <form>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Name'
            onChange={onChange}
          />
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
          <button onClick={register}>Register</button>
        </form>
        <p>
          <Link to='/'>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
