import React from 'react';

interface UserContextInterface {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = React.createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
});

export default UserContext;
