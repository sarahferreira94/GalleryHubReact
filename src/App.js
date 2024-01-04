import { useEffect, useState } from 'react';
import './App.css';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/sign';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const PrivateRoute = ({ element }) => {
    return user ? (
      <div>
        <HeaderComponent />
        {element}
        <FooterComponent />
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  const PublicRoute = ({ element }) => {
    return !user ? element : <Navigate to="/home" />;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ loggedIn: true, token });
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<PublicRoute element={<Login onLogin={handleLogin} />} />} />
          <Route path="/sign"  element={<PublicRoute element={<SignUp onLogin={handleLogin} />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home user={user} />} />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;