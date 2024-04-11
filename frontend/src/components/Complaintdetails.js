import React from "react";
import { useComplaintsContext } from '../hooks/useComplaintsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Complaintdetails = ({ complaint, showAlert, handleCloseAlert, handleLogout }) => {

  const { dispatch } = useComplaintsContext()
  const { user } = useAuthContext()

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateTimeString).toLocaleString('en-US', options);
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
            Your Complaint : {formatDateTime(complaint.createdAt)}
          </div>
          <div className="card-body">
            <h3 className="card-title"><strong> <u> Complaint Details </u></strong></h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Complaint category:</strong> {complaint.category}
                </div>
                <div className="mb-3">
                  <strong>Complaint sub-category:</strong> {complaint.sub_category}
                </div>
                <div className="mb-3">
                  <strong>Description:</strong> {complaint.description}
                </div>
                <div className="mb-3">
                  <strong>Ward no.:</strong> {complaint.ward_no}
                </div>
                <div className="mb-3">
                  <strong>Address:</strong> {complaint.address}
                </div>
                <div className="mb-3">
                  <strong>Complaint Status:</strong> {complaint.status}
                </div>
                <div className="mb-3">
                  <strong>Your complaint is assigned to :</strong> {complaint.assignee}
                </div>
              </div>
              <div className="col-md-6 text-right">
                <strong>Image:</strong> <img src={complaint.image_url} alt="Complaint Image" style={{maxWidth: "100%", maxHeight: "200px"}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Complaintdetails;
