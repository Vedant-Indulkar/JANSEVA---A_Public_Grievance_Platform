import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from './hooks/useAuthContext';
// import LanguageSwitcher from '../src/pages/LanguageSwitcher'; 
import Home from './components/Home';
import AboutUs from './pages/AboutUs';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login';
import Complaintform from './pages/Complaintform';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import ComplaintsList from './pages/upvotepg';




function App() {
  const { user } = useAuthContext();

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();

    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      const scripts = document.getElementsByTagName("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i] && scripts[i].getAttribute("src") != null && scripts[i].getAttribute("src").includes("translate.google.com")) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
      }
      delete window.googleTranslateElementInit;
    };
  }, []);


  return (
    <div>
     
      <BrowserRouter>
        <Routes>
          <Route actual path="/" element={<Home />} />
          <Route actual path="/AboutUs" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Complaintform" element={user ? <Complaintform /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/complaintform'></Navigate>} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/complaintform'></Navigate>} />
          <Route actual path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
