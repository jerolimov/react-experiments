import React from 'react';
import { useAuthValue } from '../hooks/auth';

export default function Home() {
  const authValue = useAuthValue();

  return (
    <>
      <h1>Recoil Example - Home</h1>

      {authValue.loggedIn ? 'Logged In' : 'Not logged In'}<br/><br/>
      
      Username: {authValue.username}
    </>
  );
}
