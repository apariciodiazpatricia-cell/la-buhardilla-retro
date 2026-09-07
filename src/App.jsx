import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { Home } from './pages/Home';
import { Vendors } from './pages/Vendors';
import { History } from './pages/History';
import { Products } from './pages/Products';
import { Users } from './pages/Users';


function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/history" element={<History />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;