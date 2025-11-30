import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cateogry from './components/categories';
import Products from './components/products/products';
import Home from './components/home/home';
import { Box } from '@mui/material';
import Login from './components/login/login';
import ProtectedRoute from './components/protected';

function App() {
  return (
    <div style={{overflowX: 'clip'}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>

        } />
        <Route path="/categories" element={
          <ProtectedRoute>
            <Cateogry />
          </ProtectedRoute>

        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>

        } />
      </Routes>
    </div>
  );
}

export default App;
