import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './App.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Store
import { useAuthStore } from './stores/authStore';

function App() {
  const { token, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              token ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/map"
            element={
              token ? (
                <Layout>
                  <MapView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/analysis"
            element={
              token ? (
                <Layout>
                  <Analysis />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              token ? (
                <Layout>
                  <Profile />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
