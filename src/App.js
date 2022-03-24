// External Import
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyRoutes from './myroutes';
function App() {
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
