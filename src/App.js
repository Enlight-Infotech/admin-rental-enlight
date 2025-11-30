import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Products from './components/products/products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />

    </Routes>
  );
}

export default App;
