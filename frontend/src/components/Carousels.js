import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "../App.css";

export default function Carousels() {
  // Check if user is logged in (you may implement your own logic for this)
  const isLoggedIn = localStorage.getItem('loggedInUserEmail');

  // Function to handle profile link click
  const handleProfileClick = () => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      // You may replace '/Login' with your actual login route
      window.location.href = '/Login';
    }
  };

  const handleUpvoteClick = () => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      // You may replace '/Login' with your actual login route
      window.location.href = '/Login';
    }
  };

  return (
    <>
      <div className="row my-2">
        {/* Upvote Page Card */}
        <div className="col-sm-4">
          <div className="card text-center card-hover-gradient">
            <div className="card-body">
              <img src="images/upvote.png" alt="Profile Icon" style={{ width: '50px', height: '50px', marginBottom: '10px' }}/>
              <h5 className="card-title">UPVOTE HERE!</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              {/* Conditionally render Link based on user's authentication status */}
              {isLoggedIn ? (
                <Link to="/upvote" className="btn btn-dark">Go To Upvote</Link>
              ) : (
                <button className="btn btn-dark" onClick={handleUpvoteClick}>Go To Upvote Page</button>
              )}
            </div>
          </div>
        </div>

        {/* Lodge Complaint Card */}
        <div className="col-sm-4">
          <div className="card text-center card-hover-gradient">
            <div className="card-body">
              <img src="images/complaint.png" alt="Complaint Icon" style={{ width: '50px', height: '50px', marginBottom: '10px' }}/>
              <h5 className="card-title">LODGE YOUR COMPLAINT HERE!</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="/Complaintform" className="btn btn-dark">Lodge Complaint</Link>
            </div>
          </div>
        </div>

        {/* View Profile Card */}
        <div className="col-sm-4">
          <div className="card text-center card-hover-gradient">
            <div className="card-body">
              <img src="images/profile.jpg" alt="Profile Icon" style={{ width: '50px', height: '50px', marginBottom: '10px' }}/>
              <h5 className="card-title">VIEW YOUR PROFILE HERE!</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              {/* Conditionally render Link based on user's authentication status */}
              {isLoggedIn ? (
                <Link to="/Profile" className="btn btn-dark">View Profile</Link>
              ) : (
                <button className="btn btn-dark" onClick={handleProfileClick}>Login to View Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card-header text-center">
        Janseva Featured
      </div>
    
      <div className="carousel-container" id="home">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image" 
              src="images/img1.1.jpeg"
              alt="First slide"
            />
            <Carousel.Caption className="text-black">
              <h2><u><b>JANSEVA</b></u></h2>
              <h5>A Grievance Platform</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="images/img2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="text-black">
              <h3>Second slide label</h3>
              <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="images/img3.3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption className="text-white-100">
              <h3>Third slide label</h3>
              <h5>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
