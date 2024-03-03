//import Complaintdetails from "../components/Complaintdetails";
import { useEffect,  handleLogout } from "react";
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useAuthContext } from "../hooks/useAuthContext"
import Complaintdetails from "../components/Complaintdetails";
import Navbar from '../components/Navbar'

const Profile = () => {
   const {complaints, dispatch}= useComplaintsContext()

  // const [complaints, setComplaints] = useState(null);

  const {user} = useAuthContext()

  
  useEffect(() => {
      const fetchComplaints = async () => {
      const response = await fetch("/complaints/all" , {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      })
      const json = await response.json();

      if (response.ok) {
        // setComplaints(json);
        dispatch({type: 'SET_COMPLAINTS', payload: json})
      }
    };

    if (user) {
      fetchComplaints()
    }
  }, [dispatch, user]);

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
          <h2>Welcome to the Dashboard</h2>
          
        </div>
    <div className="complaintlist">
      
      <div className="complaints">
        {complaints && complaints.map((complaint) => (
           <Complaintdetails key={complaint._id} complaint={complaint} />
          ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
