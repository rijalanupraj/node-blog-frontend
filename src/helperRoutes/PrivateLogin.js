// External Import
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLogin = ({ auth }) => {
  return auth ? <Navigate to='/' /> : <Outlet />;
};

export default PrivateLogin;
