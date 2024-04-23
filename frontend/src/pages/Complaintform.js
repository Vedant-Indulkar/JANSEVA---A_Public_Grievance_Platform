import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useComplaintsContext } from "../hooks/useComplaintsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import MapWithGeocoding from "../components/MapWithGeocoding"; // Import MapWithGeocoding component

const Complaintform = () => {
  const navigate = useNavigate();

  const { dispatch } = useComplaintsContext();
  const { user } = useAuthContext();

  const [category, setCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageDataUri, setImageDataUri] = useState(null);
  const [ward_no, setWardNo] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  // Define hospitalCount, schoolCount, selectedLatitude, and selectedLongitude states
  const [hospitalsCount, setHospitalCount] = useState(0);
  const [schoolsCollegesCount , setSchoolCount] = useState(0);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);

   const complaintCategories = ["water supply", "Roads and Footpath", "street light", "public parks and gardens", "garbage and cleanliness"];
   const subCategoriesMap = {
    "water supply": [
      "Insufficient supply duration",
      "Impure/Contaminated water",
      "Pipeline leakage",
      "Supply not received",
      "Repairing of Standpost/Handpump",
      "Other"
    ],
    "Roads and Footpath": [
      "Damaged Road",
      "Damaged Footpath", 
      "Damaged Road Divider",
      "Marking no proper on Bump",
      "Marking no proper on Zebra Crossing",
      "Other"
    ],
    "street light": [
      "Insufficient lighting",
      "Street light not working",
      "Street light pole collapsed",
      "Street Light working in day time not proper",
      "Other"
    ],
    "public parks and gardens": [
      "Cleanliness in garden not proper",
      "Trimming of Trees in public garden/road/divider/plots (except private properties)", 
      "Repairing of Benches/Water Hut/water line/Walk Way/Playing Equipments/Dust Bin/Gate/sinage board/etc.",
      "Nuisance of mosquito/insect due to tree/bushes",
      "Weeding of unwanted plants/bushes on road side/footpath/open plot/creek/etc.",
      "Use of garden for games/yoga/prohibited drinks",
      "Regarding stray dogs in garden",
      "Other"
    ],
    "garbage and cleanliness": [
      "Cleaning/Scraping not carried out/not proper",
      "Container/Dustbin not lifted/not cleaned properly",
      "Lifting of building materials", 
      "Hawkers not maintaining cleanliness",
      "Improper disposal of hotel/restaurant wastes",
      "Burning Of Garbage In Open Space",
      "Other"
    ]
  }
   
  
  const wardNumbers = ["Ward 1", "Ward 2", "Ward 3"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const complaint = {
      category,
      sub_category,
      description,
      ward_no,
      image_url: imageDataUri,
      location,
      phoneNumber,
      submissionDateTime: new Date().toISOString(),
      hospitalsCount,
      schoolsCollegesCount ,
      latitude: selectedLatitude,
      longitude: selectedLongitude
    };

    try {
      const response = await fetch("/complaints", {
        method: "POST",
        body: JSON.stringify(complaint),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const json = await response.json();
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      navigate("/Profile");
    } catch (error) {
      setError(error.message);
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

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Complaint Form</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Complaint category select */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
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

          {/* Complaint sub-category select */}
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

          {/* Complaint description textarea */}
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

          {/* Ward number select */}
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

          {/* Image upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              name={imageDataUri}
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
          </div>

          {/* Address textarea
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
          </div> */}

          <div>       
        {/* MapWithGeocoding component */}
        <MapWithGeocoding 
          onLocationSelect={(latitude, longitude, hospitalsCount, schoolsCollegesCount ) => {
            setSelectedLatitude(latitude);
            setSelectedLongitude(longitude);
            setHospitalCount(hospitalsCount);
            setSchoolCount(schoolsCollegesCount );

          }}
          address={location}
          setAddress={setLocation}
          // hospitalsCount={hospitalsCount}
          // schoolsCollegesCount ={schoolsCollegesCount }
        />
      </div>

          {/* Phone number input */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-dark">
            Submit Complaint
          </button>
        </form>

         
      </div>
    </>
  );
};

export default Complaintform;
