import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cateogry from './components/categories';
import Products from './components/products/products';
import Home from './components/home/home';
import { Box } from '@mui/material';
import Login from './components/login/login';
import ProtectedRoute from './components/protected';
import Register from './components/users/register';
import Users from './components/users/user';

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{overflowX: 'clip'}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {userData && userData.role === '1' && <Route path="/register" element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          } 
        />}
        
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
        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>

        } />
      </Routes>
    </div>
  );
}

export default App;
