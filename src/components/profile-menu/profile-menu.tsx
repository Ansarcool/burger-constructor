import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logout } from '../../slices/slice';
import { AppDispatch} from '../../services/store';
import { useDispatch } from 'react-redux';
export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
      dispatch(logout())
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
