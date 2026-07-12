import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { registerThunk } from '../../slices/slice';
import { useNavigate } from 'react-router-dom';
import { experimental_serverChannel } from '@storybook/addon-onboarding/dist/preset';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortMsg, setError] = useState('');
  const navigate = useNavigate();
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
    )
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((serverError) => {
        if (serverError === 'Internal server error') {
          setError('Заполните все поля корректно');
        } else if (serverError === 'Email already exists') {
          setError('Пользователь с таким E-mail уже зарегистрирован');
        } else {
          setError(serverError || 'Произошла ошибка при регистрации');
        }
      });
  };

  return (
    <RegisterUI
      errorText={errortMsg}
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
