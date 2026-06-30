import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { registerThunk } from '../../slices/slice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('USER:' + userName, email, password);
    dispatch(
      registerThunk({
        name: userName,
        email: email,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
