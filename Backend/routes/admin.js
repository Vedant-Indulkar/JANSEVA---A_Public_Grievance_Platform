const express = require("express");
const { getComplaintsAdmin, assignWorkerToAComplaint, updateComplaintStatus } = require("../controllers/adminController");

const router = express.Router();

// router.use(requireAuth);
router.get("/complaints", getComplaintsAdmin);
router.patch("/complaints/:complaintId/assign", assignWorkerToAComplaint);
router.patch("/complaints/:complaintId/status", updateComplaintStatus);


module.exports = router;