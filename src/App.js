// External Import
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyRoutes from './myroutes';
import { getUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();
  const User = useSelector(state => state.Auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, User.isAuthenticated]);

  return (
    <BrowserRouter>
      <div className='position-relative' style={{ minHeight: '80vh' }}>
        <div style={{ paddingBottom: '2.5rem' }}>
          <Navbar />
          <MyRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
