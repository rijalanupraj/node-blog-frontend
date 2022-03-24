import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <div className='position-relative' style={{ minHeight: '80vh' }}>
      <div style={{ paddingBottom: '2.5rem' }}>
        <Navbar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
