import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { selectors } from '@selectors';
import { useSelector } from '../../services/store';

type Props = {
  onlyUnAuth?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children }: Props) => {
  const user = useSelector(selectors.user.getUser);
  const isAuthChecked = useSelector(selectors.user.getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // console.log('Авторизированный пользователь, но не авторизован');
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // if (onlyUnAuth && user) {
  // onlyUnAuth &&
  //   console.log(
  //     'Неавторизированный пользователь, авторизован или не авторизован'
  //   );
  // !onlyUnAuth && console.log('Авторизированный пользователь, авторизован');
  // const { from } = location.state ?? { from: { pathname: '/' } };
  // return <Navigate to={from} />;
  // }

  return children || <Outlet />;
};
