// Profile.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Complaintdetails from "../components/Complaintdetails";
import Navbar from '../components/Navbar';

const Profile = () => {
  const { complaints, dispatch } = useComplaintsContext();
  const { user } = useAuthContext();
  const [filteredComplaints, setFilteredComplaints] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch("http://localhost:4000/complaints/all", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_COMPLAINTS', payload: json });
        setFilteredComplaints(json);
      }
    };

    if (user) {
      fetchComplaints();
    }
  }, [dispatch, user]);

  const handleFilter = (status) => {
    if (status === 'all') {
      setFilteredComplaints(complaints);
    } else {
      const filtered = complaints.filter(complaint => complaint.status === status);
      setFilteredComplaints(filtered);
    }
    setStatusFilter(status);
  };

  const handlePostToChatApp = (complaint) => {
    // Assuming you have a function to post complaints to the chat app's API
    // Replace `postComplaintToChatApp` with the actual function to post complaints
    // Include necessary data such as complaint details and user information
    //  (complaint);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Welcome to the Dashboard</h2>
          {/* Filter buttons */}
          <div>
            <button className={`btn btn-outline-primary me-2 ${statusFilter === 'all' && 'active'}`} onClick={() => handleFilter('all')}>All</button>
            <button className={`btn btn-outline-primary me-2 ${statusFilter === 'pending' && 'active'}`} onClick={() => handleFilter('pending')}>Pending</button>
            <button className={`btn btn-outline-primary me-2 ${statusFilter === 'completed' && 'active'}`} onClick={() => handleFilter('completed')}>Completed</button>
          </div>
        </div>
        <div className="complaintlist">
          <div className="complaints">
            {filteredComplaints && filteredComplaints.map((complaint) => (
              <div key={complaint._id}>
                <Complaintdetails complaint={complaint} />
                <button className="btn btn-dark mt-2" onClick={() => handlePostToChatApp(complaint)}>Post to Chat App</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
