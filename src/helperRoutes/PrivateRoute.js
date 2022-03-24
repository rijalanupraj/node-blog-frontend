// External Import
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to='/auth' />;
};

export default PrivateRoute;
