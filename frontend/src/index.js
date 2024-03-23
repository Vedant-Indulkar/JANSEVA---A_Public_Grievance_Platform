import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ComplaintsContextProvider } from './context/ComplaintsContext';
import { AuthContextProvider } from './context/AuthContext';

// const googleTranslateElementInit = () => {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       autoDisplay: false,
//       pageLanguageOption: 'en'
//     },
//     "google_translate_element"
//   );
// };

// const addGoogleTranslateScript = () => {
//   const script = document.createElement("script");
//   script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//   script.async = true;
//   document.body.appendChild(script);
// };

// addGoogleTranslateScript();

// window.googleTranslateElementInit = googleTranslateElementInit;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ComplaintsContextProvider>
        <App />
      </ComplaintsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
