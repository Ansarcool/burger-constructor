import { ConstructorPage, Register } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppHeader, FeedInfo, IngredientDetails, Modal } from '@components';
import { getIngredientsThunk } from '../../slices/ingredientsSlice';
import { AppDispatch } from '../../services/store';
import { getUserThunk } from '../../slices/slice';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  if (accessToken === 'undefined') {
    accessToken = null;
  }

  if (refreshToken === 'undefined') {
    refreshToken = null;
  }
  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);
  useEffect(() => {
    if (accessToken) {
      dispatch(getUserThunk(accessToken));
    }
  }, [dispatch]);

  function handleCloseModal() {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/orders/all' element={<FeedInfo />} />
        {!accessToken && !refreshToken && (
          <>
            <Route
              path='/profile'
              element={<Navigate to='/profile/register' replace />}
            />
            <Route path='/profile/register' element={<Register />} />
          </>
        )}
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
        </Routes>
      )}
    </div>
  );
};

export default App;
