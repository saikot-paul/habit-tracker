import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MainContent from './pages/MainContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="maincontent/*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
