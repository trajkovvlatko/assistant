import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function WithUser(props: {children: React.ReactNode}) {
  const {user} = useContext(UserContext);
  if (!user) {
    return (
      <>
        <Link to='/'>No user. Click here to select one.</Link>
      </>
    );
  }
  return <>{props.children}</>;
}

export default WithUser;
