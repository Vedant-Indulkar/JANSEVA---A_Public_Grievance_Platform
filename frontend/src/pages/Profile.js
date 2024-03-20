// Profile.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Complaintdetails from "../components/Complaintdetails";
import Navbar from '../components/Navbar';
import { Button, ButtonGroup } from 'react-bootstrap';

const Profile = () => {
  const { complaints, dispatch } = useComplaintsContext();
  const { user } = useAuthContext();
  const [filteredComplaints, setFilteredComplaints] = useState(null);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState('ALL');
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

  useEffect(() => {
    // Filter complaints based on the selected status filter
    if (complaints) {
      let filtered = complaints;
      if (complaintStatusFilter !== 'ALL') {
        filtered = complaints.filter(complaint => complaint.status === complaintStatusFilter);
      }
      setFilteredComplaints(filtered);
    }
  }, [complaints, complaintStatusFilter]);

  const handleFilter = (status) => {
    setComplaintStatusFilter(status);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Welcome to the Dashboard</h2>
          {/* Filter buttons */}
          <ButtonGroup>
            <Button
              variant={complaintStatusFilter !== 'ALL' ? 'outlined' : 'primary'}
              onClick={() => handleFilter('ALL')}
            >
              All
            </Button>
            <Button
              variant={complaintStatusFilter !== 'PENDING' ? 'outlined' : 'primary'}
              onClick={() => handleFilter('PENDING')}
            >
              Pending
            </Button>
            <Button
              variant={complaintStatusFilter !== 'IN PROGRESS' ? 'outlined' : 'primary'}
              onClick={() => handleFilter('IN PROGRESS')}
            >
              In Progress
            </Button>
            <Button
              variant={complaintStatusFilter !== 'COMPLETED' ? 'outlined' : 'primary'}
              onClick={() => handleFilter('COMPLETED')}
            >
              Completed
            </Button>
          </ButtonGroup>
        </div>
        <div className="complaintlist">
          <div className="complaints">
            {filteredComplaints && filteredComplaints.map((complaint) => (
              <div key={complaint._id}>
                <Complaintdetails complaint={complaint} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
