import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Map from "../pages/Map.js";
// import LanguageSwitcher from '../pages/LanguageSwitcher.js';

// import './complaintform.css'; // Custom CSS file (if needed)

const Complaintform = () => {
  const navigate = useNavigate();

  const { dispatch } = useComplaintsContext();
  const { user } = useAuthContext();

  const [category, setCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ward_no, setWardNo] = useState("");
  const [imageDataUri, setImageDataUri] = useState(null);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voicedescription, setVoiceDescription] = useState("");
  const [error, setError] = useState(null);
  const [coordinates]=useState()
  const complaintCategories = ["Roads and Footpath"];

  // const complaintCategories = ["Roads and Footpath"];

  const subCategoriesMap = {
    "Roads and Footpath": [
      "Damaged Road",
      "Damaged Footpath",
      "Damaged Road Divider",
      "No marking on Bump",
      "Marking no proper on Bump",
      "Marking no proper on Zebra Crossing",
    ],
  };
  const wardNumbers = ["Ward 1", "Ward 2", "Ward 3"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imageDataUri);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Handle form submission logic here (e.g., send data to server)
    const complaint = {
      category,
      sub_category,
      description,
      ward_no,
      image_url: imageDataUri,
      phoneNumber,
      location, // Include the address field
    };

    const response = await fetch("/complaints", {
      method: "POST",
      body: JSON.stringify(complaint),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setCategory("");
      setSubCategory("");
      setDescription("");
      setWardNo("");
      setImageDataUri("");
      setLocation("");
      console.log("new complaint added:", json);

      dispatch({ type: "CREATE_WORKOUT", payload: json });
      navigate("/Profile");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target.result;
      setImageDataUri(dataUri);
    };
    reader.readAsDataURL(file);
  };

  const Map = ({ coordinates }) => {
    // Check if coordinates is an array and has a length
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      // Handle case where coordinates are not provided
      return null; // Or return a default map view without markers
    }};

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="mb-4">Complaint Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label id="CC1" htmlFor="category" className="form-label">
              Complaint Category:
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {complaintCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {category && (
            <div className="mb-3">
              <label htmlFor="subCategory" className="form-label">
                Complaint Sub-Category:
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={sub_category}
                onChange={(e) => setSubCategory(e.target.value)}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Sub-Category
                </option>
                {subCategoriesMap[category].map((sub_category) => (
                  <option key={sub_category} value={sub_category}>
                    {sub_category}
                  </option>
                ))}
              </select>
            </div>
          )}
          {category && (
            <div className="mb-3">
              <label htmlFor="subCategory" className="form-label">
                Complaint Sub-Category:
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={sub_category}
                onChange={(e) => setSubCategory(e.target.value)}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Sub-Category
                </option>
                {subCategoriesMap[category].map((sub_category) => (
                  <option key={sub_category} value={sub_category}>
                    {sub_category}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Complaint Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="wardNo" className="form-label">
              Ward Number:
            </label>
            <select
              id="wardNo"
              name="wardNo"
              value={ward_no}
              onChange={(e) => setWardNo(e.target.value)}
              className="form-select"
              required
            >
              <option value="" disabled>
                Select Ward Number
              </option>
              {wardNumbers.map((ward_no) => (
                <option key={ward_no} value={ward_no}>
                  {ward_no}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e);
              }}
              className="form-control"
            />
          </div>

          {/* Image preview */}
          {imageDataUri && (
            <div className="mb-3">
              <img
                src={imageDataUri}
                alt="Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>

          <Map
  coordinates={
    coordinates && coordinates.length > 0
      ? coordinates
      : [{ name: "Default Marker", lngLat: [72.9986, 19.159] }]
  }
/>


          <button type="submit" className="btn btn-dark">
            Submit Complaint
          </button>
        </form>
      </div>
    </>
  );
};

export default Complaintform;
