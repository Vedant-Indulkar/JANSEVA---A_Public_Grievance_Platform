import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './components/Home';
import Profile from './pages/Profile';
import Complaintform from './pages/Complaintform';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path= "/" element={ <Home/>} />
        <Route path="/profile" element={<Profile /> } />
      
        <Route path="/Complaintform" element={user ? <Complaintform/> : <Navigate to='/login' /> }/>
        <Route path= "/login" element={!user ? <Login/> : <Navigate to='/complaintform'></Navigate>} />
        <Route path= "/signup" element={ !user ? <Signup/> : <Navigate to='/complaintform'></Navigate> } />
       
        {/* <Route actualpath= "Complaintdetails" element={<Complaintdetails/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
