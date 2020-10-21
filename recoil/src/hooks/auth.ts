import { atom, useRecoilState, useRecoilValue } from 'recoil';

export const authRecoilState = atom({
  key: 'auth',
  default: {
    loggedIn: false,
    username: '',
  },
});

export const useAuthState = () => useRecoilState(authRecoilState);
export const useAuthValue = () => useRecoilValue(authRecoilState);

export const useAuth = () => {
  const [authState, setAuthState] = useAuthState();
  const logout = () => setAuthState({ loggedIn: false, username: '' });

  return {
    ...authState,
    logout,
  };
}
