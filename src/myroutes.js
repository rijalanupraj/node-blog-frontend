// External Import
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Internal Import
import PrivateLogin from './helperRoutes/PrivateLogin';
import PrivateRoute from './helperRoutes/PrivateRoute';

// Page Import
import AuthPage from './page/AuthPage';
import HomePage from './page/HomePage';
import SinglePost from './page/SinglePost';
import CreatePost from './page/CreatePost';
import ProfilePage from './page/ProfilePage';
import Timeline from './page/Timeline';
import AllPostPage from './page/AllPostPage';

const MyRoutes = () => {
  const User = useSelector(state => state.Auth);
  return (
    <Routes>
      <Route exact path='' element={<HomePage />} />
      <Route exact path='/posts' element={<AllPostPage />} />
      <Route exact path='/profile/:username' element={<ProfilePage />} />
      <Route exact path='/post/:slug' element={<SinglePost />} />
      <Route exact path='/auth' element={<PrivateLogin auth={User.isAuthenticated} />}>
        <Route exact path='/auth' element={<AuthPage />} />
      </Route>
      <Route exact path='/create' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/create' element={<CreatePost />} />
      </Route>
      <Route exact path='/timeline' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/timeline' element={<Timeline />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
