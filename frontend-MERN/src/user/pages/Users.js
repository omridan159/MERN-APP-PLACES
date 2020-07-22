import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Omri Dan',
      image: 'https://images.pexels.com/photos/1816606/pexels-photo-1816606.jpeg?cs=srgb&dl=close-up-photo-of-woman-holding-flower-1816606.jpg&fm=jpg',
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
