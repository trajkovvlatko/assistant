import React from 'react';
import firebase from 'firebase';

function WithUser(props: {children: React.ReactNode}) {
  const user = firebase.auth().currentUser;

  if (!user) {
    return <></>;
  }

  return <>{props.children}</>;
}

export default WithUser;
