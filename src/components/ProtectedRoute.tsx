import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const { isLoggedIn, isAuthChecked } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <p style={{ textAlign: 'center', marginTop: '40px' }}>Загрузка...</p>
    );
  }

  if (onlyUnAuth && isLoggedIn) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
