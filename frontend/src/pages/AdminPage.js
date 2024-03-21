import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/complaints/admin/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (response.ok) {
          setComplaints(json);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus, response) => {
    try {
      const response = await fetch(`/complaints/${complaintId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus, response: response }),
      });
      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === complaintId
              ? { ...complaint, status: newStatus, response: response }
              : complaint
          )
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const showFullDescription = (description) => {
    alert(description);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const renderComplaintsByCategory = () => {
    return (
      <>
        {selectedCategory && (
          <tr className="table-active">
            <td colSpan="8">
              <strong>{selectedCategory} Complaints</strong>
            </td>
          </tr>
        )}
        {complaints
          .filter((complaint) =>
            complaint.category.toLowerCase().includes(selectedCategory.toLowerCase())
          )
          .map((complaint, index) => (
            <tr key={complaint.id}>
              <td>{index + 1}</td>
              <td>{"C"+(index+1)}</td>
              <td>{complaint.priority}</td>
              <td>{complaint.category}</td>
              <td>{complaint.sub_category}</td>
              <td>{complaint.user_id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                    {complaint.description.length > 50 ? (
                      <>
                        {complaint.description.substring(0, 50)}...
                        <button
                          className="btn btn-link"
                          onClick={() =>
                            showFullDescription(complaint.description)
                          }
                        >
                          See More
                        </button>
                      </>
                    ) : (
                      complaint.description
                    )}
                  </div>
                </div>
              </td>
              <td>{complaint.ward_no}</td>
              <td>{complaint.location}</td>
              <td>
                <select
                  value={complaint.status}
                  onChange={(e) =>
                    handleStatusChange(complaint.id, e.target.value, complaint.response)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button className="my-2 btn-primary">Submit</button>
               
              </td>
            </tr>
          ))}
      </>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div className="container mt-2 mb-2 flex-grow-1">
        <h2 className="mb-4"><strong>Welcome Admin!</strong></h2>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Select complaint category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Complaints</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="table-responsive" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr. No.</th>
                <th>Complaint ID</th>
                <th>Priority</th>
                <th>Complaint Type</th>
                <th>Sub-type</th>
                <th>Citizen UID</th>
                <th>Description</th>
                <th>Sector No.</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderComplaintsByCategory()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

