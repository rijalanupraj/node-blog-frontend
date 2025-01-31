// External Import
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Internal Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyRoutes from './myroutes';
import { getUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='position-relative' style={{ minHeight: '97vh' }}>
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
