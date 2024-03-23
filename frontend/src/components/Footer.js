import React, { useState, useEffect } from "react";
import { Card, CardGroup, Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

// import '../App.css'; //

export default function Customfooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <hr className="my-3 hr-black " id="feedback-form" />
      <marquee className="left ">
        {" "}
        <strong>
          "We welcome your valuable suggestions, as they are instrumental in our
          continuous efforts to enhance our site and contribute to the
          cleanliness of our country. Your input will enable us to further
          improve and uphold standards of excellence. Thank you for your
          collaboration in making a positive impact."
        </strong>
      </marquee>
      <hr className="my-3.5 hr-black" />

      <Container className="my-4">
        <h2 className="text-center mb-4">
          <u>Janseva Suggestion Form</u>
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFeedback">
            <Form.Label>Your Suggestions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your suggestions"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

      <hr className="my-4 hr-black" />
      <hr className="my-3.7 hr-black" />

      <h2 className="text-center" id="viewers-impression">
        <u>Viewer's Impression</u>
      </h2>
      <CardGroup className="mt-1">
        <Card className="mx-2">
          <Card.Img
            variant="top"
            src="./images/imgc1.avif"
            className="card-img-fit"
          />
          <Card.Body>
            <Card.Title> <b> Feedback </b>: Clean Roads</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card className="mx-3">
          <Card.Img
            variant="top"
            src="./images/imgc2.2.avif"
            className="card-img-fit"
          />
          <Card.Body>
            <Card.Title> <b> Feedback </b>: Immediate action on sanitation</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="./images/imgc3.jpg"
            className="card-img-fit"
          />
          <Card.Body>
            <Card.Title> <b> Feedback </b>:Solved Electricity issues</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        {/* <Card>
        <Card.Img variant="top" src="./images/imgc4.jpeg" className="card-img-fit" />
        <Card.Body>
          <Card.Title>Feedback: Person 4</Card.Title>
          <Card.Text>
          This card has supporting text below as a natural lead-in to
            additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card> */}
      </CardGroup>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="d-flex align-items-center text-muted text-decoration-none"
            >
              <img
                alt="Janseva Logo"
                src="images/logo.png.jpeg"
                width="40"
                height="40"
                className="d-inline-block align-top mx-2"
              />
              <h3 className="mb-0 ml-2">Janseva</h3>
              {/* <h5 className="mb-0 ml-1">-A complaint greviance platform</h5> */}
            </a>
          </div>

          <span className="text-muted text-center col-md-4" id="email">
            Copyright© 2024 Janseva, Inc, Email:{" "}
            <a href="mailto:janseva1@gmail.com">janseva1@gmail.com</a>
          </span>

          <ul className="nav justify-content-end list-unstyled d-flex col-md-4">
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
          </ul>

          {showTopBtn && (
            <Button
              className="btn-top bg-black"
              onClick={goToTop}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 1000,
              }}
            >
              &#11165;
            </Button>
          )}
        </footer>
      </div>
    </>
  );
}
