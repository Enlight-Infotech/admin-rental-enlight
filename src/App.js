import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cateogry from './components/categories';
import Products from './components/products/products';
import Home from './components/home/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Cateogry />} />
      <Route path="/products" element={<Products />} />

    </Routes>
  );
}

export default App;
