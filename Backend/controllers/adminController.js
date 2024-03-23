const Complaint = require("../models/complaintModels");

const getComplaintsAdmin = async (req, res) => {
  const complaints = await Complaint.find()
    .sort({ createdAt: -1 })
    .populate("user_id", "email");

  res.status(200).json(complaints);
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId).populate(
      "user_id",
      "email"
    );

    if (!complaint) {
      return res.status(404).json({ error: "No such complaint found" });
    }

    // Check if the provided status is valid
    if (
      status !== "PENDING" &&
      status !== "COMPLETED" &&
      status !== "IN PROGRESS"
    ) {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    // Update the status of the complaint
    complaint.status = status;

    // Save the updated complaint
    await complaint.save();


    // send email to user
    

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get status
// const getStatus

const assignWorkerToAComplaint = async (req, res) => {
  const { complaintId } = req.params;
  const { assignee } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId).populate(
      "user_id",
      "email"
    );

    if (!complaint) {
      return res.status(404).json({ error: "No such complaint found" });
    }

    // Update the status of the complaint
    complaint.assignee = assignee;
    complaint.status = assignee === "" ? "PENDING" : "IN PROGRESS";

    // Save the updated complaint
    await complaint.save();

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getComplaintsAdmin,
  updateComplaintStatus,
  assignWorkerToAComplaint,
};
