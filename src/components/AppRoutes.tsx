import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

import { ConstructorPage } from '../pages/constructor-page';
import { Feed } from '../pages/feed';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { ForgotPassword } from '../pages/forgot-password';
import { ResetPassword } from '../pages/reset-password';
import { Profile } from '../pages/profile';
import { ProfileOrders } from '../pages/profile-orders';
import { NotFound404 } from '../pages/not-fount-404';

import { Modal } from '../components/modal';
import { OrderInfo } from '../components/order-info';
import { IngredientDetails } from '../components/ingredient-details';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const background =
    location.state && (location.state as { background?: Location }).background;
  const navigate = useNavigate();

  const closeModal = () => navigate(-1);

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Order' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
