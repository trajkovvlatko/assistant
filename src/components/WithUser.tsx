import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function WithUser(props: {children: React.ReactNode}) {
  const {user} = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    history.push('/');
    return <></>;
  }

  return <>{props.children}</>;
}

export default WithUser;
