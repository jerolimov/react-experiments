import React, { FormEvent, useRef } from 'react';
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { authRecoilState } from '../hooks/auth';

export default function Login() {
  const form = useRef();
  const [authState, setAuthState] = useRecoilState(authRecoilState);

  const doLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthState((current) => ({
      ...current,
      loggedIn: true,
      username: 'asd',
    }))
  }

  return (
    <>
      <h1>Recoil Example - Login</h1>

      <form onSubmit={doLogin}>
        <label>
          <input type="" name="username" />
        </label>
      </form>
    </>
  );
}
