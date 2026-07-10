import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { resetPasswordThunk } from '../../slices/resetPassword';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPasswordThunk({ newPassword: password, token }))
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        setError(err);
        console.log(`Ошибка сброса пароля: ${err}`);
      });
  };

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
