// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Leads from './Leads';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/leads" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/leads"
          element={
            <PrivateRoute token={token}>
              <Leads token={token as string} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        {/* Conditionally redirect the catch-all route */}
        <Route path="*" element={<Navigate to={token ? "/leads" : "/login"} />} />
      </Routes>
    </Router>
  );
};

interface PrivateRouteProps {
  children: React.ReactNode;
  token: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, token }) => {
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
