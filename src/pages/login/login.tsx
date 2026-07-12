import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { loginThunk } from '../../slices/slice';
import { useNavigate } from 'react-router-dom';
import { experimental_serverChannel } from '@storybook/addon-onboarding/dist/preset';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((serverError) => {
        if (serverError === 'incorrect email or password') {
          setErrorMsg('Неверный email или пароль, либо поля не заполнены');
        } else {
          setErrorMsg(serverError || 'Произошла ошибка при входе');
        }
      });
  };

  return (
    <LoginUI
      errorText={errorMsg}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
