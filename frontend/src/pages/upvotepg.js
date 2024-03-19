import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

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

const Complaint = ({ complaint, onUpvote }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { user } = useAuthContext()

  const handleUpvote = async () => {
    try {
      const response = await fetch("/complaints/upvote", {
        method: "POST",
        body: JSON.stringify({ postId: complaint._id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    
      const json = await response.json();
      console.log(json);
    
      if (!hasUpvoted) {
        setHasUpvoted(true);
      }
    } catch (error) {
      console.error('Error upvoting complaint:', error);
    }
  };
  
  
  return (
    <div className="complaint card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={complaint.image_url} alt="Complaint" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{complaint.category}</h5>
            <p className="card-text">{complaint.description}</p>
            <p className="card-text"><small className="text-muted">Posted {formatTimeAgo(complaint.createdAt)}</small></p>
            <div className="voting">
              <button className={`btn ${hasUpvoted ? 'btn-success disabled' : 'btn-outline-success'}`} onClick={ () => handleUpvote()} disabled={hasUpvoted}>Upvote</button>
              <span>{(complaint.upvotes).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('/complaints/admin/all');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await axios.post(`/complaints/${id}/upvote`);
      // Update local state to reflect the upvote
      setComplaints(prevComplaints => prevComplaints.map(complaint => {
        if (complaint.id === id) {
          return { ...complaint, upvotes: complaint.upvotes + 1 };
        }
        return complaint;
      }));
    } catch (error) {
      console.error('Error upvoting complaint:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

    <Navbar />
    <div className="container mt-4">
      <h1 className="mb-4">Complaints</h1>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Search by category" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div className="complaints-list">
        {filteredComplaints.map(complaint => (
          <Complaint
            key={complaint.id}
            complaint={complaint}
            onUpvote={handleUpvote}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ComplaintsList;
