import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "../App.css";

export default function Carousels() {
  return (
    <>




    <div className="card text-center mb-10  ">
    <div className="card-body mb-7 ">
  <h5 className="card-title">LODGE YOUR COMPLAINT HERE!</h5>
  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
  <Link to="/Login" className="btn btn-dark">Click Here</Link>
</div>


      <div className="card-header">
        Janseva Featured
      </div>
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
