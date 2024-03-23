import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const timeDiff = now - new Date(timestamp);
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userUpvotedComplaints, setUserUpvotedComplaints] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.token) {
      fetchComplaints();
      fetchUserUpvotedComplaints();
    }
  }, [user]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('/complaints/all/upvote', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchUserUpvotedComplaints = async () => {
    try {
      const response = await axios.get('/user/upvoted/complaints', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserUpvotedComplaints(response.data);
    } catch (error) {
      console.error('Error fetching user upvoted complaints:', error);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const response = await axios.post(`/complaints/${id}/upvote`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      // Update local state to reflect the upvote
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) => {
          if (complaint._id === id) {
            // Assuming response.data contains updated complaint data including upvotes count
            return { ...complaint, upvotes: response.data.upvotes };
          }
          return complaint;
        })
      );
  
      // Update userUpvotedComplaints state to include the upvoted complaint ID
      setUserUpvotedComplaints((prevUserUpvotedComplaints) => [
        ...prevUserUpvotedComplaints,
        id,
      ]);
    } catch (error) {
      console.error('Error upvoting complaint:', error);
      alert('already complaint upvoted');
    }
  };
  
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">Complaints</h1>
        <h3>If you find the complaint relevant, click UPVOTE </h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="complaints-list">
          {filteredComplaints.map((complaint) => (
            <div className="complaint card mb-3" key={complaint._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={complaint.image_url} alt="Complaint" className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{complaint.category}</h5>
                    <p className="card-text">{complaint.description}</p>
                    <p className="card-text">Address : {complaint.location}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted {formatTimeAgo(complaint.createdAt)}
                      </small>
                    </p>

                    <div className="voting">
                    <button 
                      className={`btn ${
                        userUpvotedComplaints.includes(complaint._id)
                          ? 'btn-success disabled'
                          : 'btn-outline-success'
                      }`}
                      onClick={() => complaint && handleUpvote(complaint._id)} // Add conditional check
                      disabled={userUpvotedComplaints.includes(complaint._id)}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} /> {/* Add the icon */}
                    </button>


                    <span className='mx-2'>{complaint.upvotes.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsList;
