import React from "react";
import { useComplaintsContext } from '../hooks/useComplaintsContext'
import { useAuthContext } from '../hooks/useAuthContext'
// import Navbar from "./Navbar"; // Assuming Navbar component is in separate file
// import Button from "react-bootstrap/Button"; // Assuming Button component is imported from react-bootstrap

const Complaintdetails = ({ complaint, showAlert, handleCloseAlert, handleLogout }) => {

  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  return (
    <div>
      
      <div className="container mt-5">
        
        {/* Show alert if showAlert is true */}
        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
            <strong>Successfully Submitted!</strong> Your complaint has been successfully submitted.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleCloseAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

      <div className="card mt-3">
        <div className="card-header bg-dark text-white">
          Your Complaint : {formatDate(complaint.createdAt)}
        </div>
        <div className="card-body">
          <h5 className="card-title">Complaint Details</h5>
          <div className="mb-3">
            <strong>Complaint category:</strong> {complaint.category}
          </div>
          <div className="mb-3">
            <strong>Complaint sub-category:</strong> {complaint.sub_category}
          </div>
          <div className="mb-3">
            <strong>Description:</strong> {complaint.description}
          </div>
          <div>
            <strong>Ward no.:</strong> {complaint.ward_no}
          </div>
          <div>
            <strong>Address:</strong> {complaint.location}
          </div>
          <div>
            <strong>Image:</strong> <img src={complaint.image_url}></img>
          </div>
          <div>
            <strong>Complaint Status:</strong> {complaint.status}
          </div>
          <div>
            <strong>Your complaint is assigned to :</strong> {complaint.assignee}
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}

    




export default Complaintdetails