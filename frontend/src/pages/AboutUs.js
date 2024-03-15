import React from "react";
// import { useNavigate, useLocation, } from 'react-router-dom'; // Import Link
import Navbar from "../components/Navbar";

export default function compactAboutUs() {
  return (
    <>
      <Navbar />

      <div>
        <div className="row featurette mt-5 mx-5">
          <div className="col-md-7">
            <h2 className="featurette-heading">
              <u>JANSEVA</u>{" "}
              <span className="text-muted">
                {" "}
                <u>- A COMPLAINT GREVIANCE PLATFORM</u>
              </span>
            </h2>
            <p className="lead">
              lorem ipsum dolor
            </p>
          </div>
          <div className="col-md-5">
            <img
              className="featurette-image img-fluid mx-auto"
              alt="200x200"
              src="./images/logo.png.jpeg"
              width="300"
              height="300"
            />
          </div>
        </div>
      </div>
    </>
  );
}
