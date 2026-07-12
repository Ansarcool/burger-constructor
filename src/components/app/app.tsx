import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  Modal,
  OrderInfo,
  OrdersList,
  ProfileMenu
} from '@components';
import { getIngredientsThunk } from '../../slices/ingredientsSlice';
import { AppDispatch, RootState } from '../../services/store';
import { getUserThunk } from '../../slices/slice';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { OrderDetail } from '../order-detail/order-detail';
import { resetOrder } from '../../slices/createOrderSlice';
import { TOrder } from '@utils-types';
import { TNewOrderResponse } from '@api';
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  const createdOrder = useSelector((state: RootState) => state.createOrder);
  const user = useSelector((state: RootState) => state.auth.user);
  const password = useSelector((state: RootState) => state.password);
  if (accessToken === 'undefined') {
    accessToken = null;
  }

  if (refreshToken === 'undefined') {
    refreshToken = null;
  }
  useEffect(() => {
    dispatch(getIngredientsThunk());
    if (accessToken && accessToken !== 'undefined') {
      dispatch(getUserThunk(accessToken));
    }
  }, []);
  function handleCloseOrderModal() {
    dispatch(resetOrder());
  }
  function handleCloseModal() {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {createdOrder.success && (
        <Modal title={'ЗАКАЗ'} onClose={handleCloseOrderModal}>
          <OrderDetail />
        </Modal>
      )}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/profile'
          element={user ? <ProfileMenu /> : <Navigate to='/login' replace />}
        />
        <Route
          path='/profile/orders'
          element={user ? <ProfileOrders /> : <Navigate to='/login' replace />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to='/' replace /> : <Register />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/' replace /> : <Login />}
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/reset-password'
          element={
            localStorage.getItem('resetPassword') === 'true' ? (
              <ResetPassword />
            ) : (
              <Navigate to='/forgot-password' replace />
            )
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
