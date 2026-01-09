import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../hooks/redux';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return <AppHeaderUI userName={user?.name || ''} />;
};
