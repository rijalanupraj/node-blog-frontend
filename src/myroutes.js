// External Import
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page Import
import AuthPage from './page/AuthPage';
import HomePage from './page/HomePage';

const MyRoutes = () => {
  return (
    <Routes>
      <Route exact path='' element={<HomePage />} />
      <Route exact path='/auth' element={<AuthPage />} />
    </Routes>
  );
};

export default MyRoutes;
