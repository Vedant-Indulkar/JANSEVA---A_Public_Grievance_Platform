import React from 'react'; // Import React
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from './hooks/useAuthContext';

// import CardGroup from 'react-bootstrap/CardGroup';
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




function App() {
  const { user } = useAuthContext()
  return (
   <div>
    
    {/* <Navbar/>
    <Carousels/>
    <Footer/> */}

    <BrowserRouter>
    <Routes>

    <Route  actual path="/"element={<Home/>}/>
    <Route actual path="/AboutUs" element={<AboutUs/>}/>
    <Route path="/profile" element={<Profile /> } />
      
      <Route path="/Complaintform" element={user ? <Complaintform/> : <Navigate to='/login' /> }/>
      <Route path= "/login" element={!user ? <Login/> : <Navigate to='/complaintform'></Navigate>} />
      <Route path= "/signup" element={ !user ? <Signup/> : <Navigate to='/complaintform'></Navigate> } />
      <Route actual path="/admin" element={<AdminPage/>}/>

     

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
