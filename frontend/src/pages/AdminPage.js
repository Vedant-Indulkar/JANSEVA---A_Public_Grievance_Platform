import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminPage = () => {
  const { user } = useAuthContext()
  const [complaints, setComplaints] = useState([]);

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

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const response = await axios.put(`/complaints/${complaintId}/status`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setComplaints(
          complaints.map((complaint) => {
            if (complaint.id === complaintId) {
              return { ...complaint, status: newStatus };
            }
            return complaint;
          })
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const showFullDescription = (description) => {
    alert(description);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4"><strong>Welcome Admin!</strong></h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr. No.</th>
                <th>Priority</th>
                <th>Complaint Type</th>
                <th>Sub-type</th>
                <th>Description</th>
                <th>Ward No.</th>
                <th>Address</th>
                <th>User Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
           
              {user.map((user) && complaints.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  className={getPriorityColor(complaint.priority)}
                >
                  <td>{index + 1}</td>
                  <td>{complaint.priority}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.sub_category}</td>
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
                  <td>{user.email}</td>
                
                  <td>
                    <select>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "table-danger";
    case "Medium":
      return "table-warning";
    default:
      return "";
  }
};

export default AdminPage;
