import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectors } from '@selectors';

export const AppHeader: FC = () => {
  const user = useSelector(selectors.user.getUser);

  return <AppHeaderUI userName={user?.name} />;
};
