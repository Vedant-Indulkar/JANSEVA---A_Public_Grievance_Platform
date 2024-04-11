const mongoose = require("mongoose");

const Schema = mongoose.Schema; //create a schema

const complaintsSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },

    sub_category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ward_no: {
      type: String,
      required: true,
    },

    image_url: {
      type: String,
    },

    location: {
      type: String,
    },
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
      
    },
    hospitalCount: {
      type: Number,
      default: 0,
    },
    schoolCount: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      required: true,
    },

    phoneNumber : {
      type: Number,
      required: true
    },

    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "IN PROGRESS"],
      default: "PENDING",
    },

    assignee: String,

    upvotes: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintsSchema);
module.exports = Complaint;
