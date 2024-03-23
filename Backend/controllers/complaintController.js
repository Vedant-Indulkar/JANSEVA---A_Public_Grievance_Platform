const Complaint = require("../models/complaintModels");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 }).populate('user_id');
  console.log(complaints.length)
  res.status(200).json(complaints);
};



const upvoteComplaint = async (req, res) => {
  const postId = req.params.id; // Assuming complaint ID is in the URL params
  const userId = req.user._id;

  try {
    // Find the complaint by ID
    const complaint = await Complaint.findById(postId);

    if (!complaint) {
      return res.status(404).json({ error: "No such complaint found" });
    }

    // Check if the user has already upvoted this complaint
    if (complaint.upvotes.includes(userId)) { // Check if userId is already in upvotes array
      return res.status(400).json({ error: "User has already upvoted this complaint" });
    }

    // Add the user ID to the upvotes array
    complaint.upvotes.push(userId);

    // Save the updated complaint
    await complaint.save();

    res.status(200).json({ message: "Upvoted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get all complaints
const getComplaints = async (req, res) => {
  const user_id = req.user._id;

  const complaints = await Complaint.find({ user_id }).sort({ createdAt: -1 }).populate('user_id');
  console.log(complaints.length)
  res.status(200).json(complaints);
};

//get a single complaint
const getComplaint = async (req, res) => {
  const { id } = req.params;

  const complaint = await Complaint.findById(id).populate('user_id');

  if (!complaint) {
    return res.status(404).json({ error: "No such complaint" });
  }

  res.status(200).json(complaint);
};

//create new complaint
const createComplaint = async (req, res) => {
  const { category, sub_category, description, ward_no, location, image_url, phoneNumber } =
    req.body;

  const image = await uploadOnCloudinary(image_url);

  //add doc to db
  try {
    const user_id = req.user._id;
    const complaint = await Complaint.create({
      category,
      sub_category,
      description,
      ward_no,
      image_url: image.secure_url || "",
      phoneNumber,
      location,
      user_id,
      // useremail
    });

    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a complaint
const deleteComplaint = async (req, res) => {
  const { id } = req.params;

  const complaint = await Complaint.findOneAndDelete({
    _id: id,
  });

  if (!complaint) {
    return res.status(400).json({ error: "No such complaint" });
  }

  res.status(200).json(complaint);
};

//update a complaint
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  const complaint = await Complaint.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!complaint) {
    return res.status(400).json({ error: "No such complaint" });
  }

  res.status(200).json(complaint);
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint,
  upvoteComplaint,
  getAllComplaints
};
