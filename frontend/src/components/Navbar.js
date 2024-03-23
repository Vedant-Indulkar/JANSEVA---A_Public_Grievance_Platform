// import React, { useEffect } from "react";
// import { Nav, Container, NavDropdown, Navbar, Button } from "react-bootstrap";
// import { useNavigate, Link } from 'react-router-dom';
// import { useLogout } from '../hooks/useLogout'
// import { useAuthContext } from '../hooks/useAuthContext'

// export default function CustomNavbar() {
//   const { logout } = useLogout();
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   // Function to initialize Google Translate widget
//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "en",
//         autoDisplay: false,
//         pageLanguageOption: 'en'
//       },
//       "google_translate_element"
//     );
//   };

//   // Effect hook to load Google Translate script
//   useEffect(() => {
//     const addGoogleTranslateScript = () => {
//       const script = document.createElement("script");
//       script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     };

//     addGoogleTranslateScript();

//     window.googleTranslateElementInit = googleTranslateElementInit;

//     return () => {
//       const scripts = document.getElementsByTagName("script");
//       for (let i = scripts.length - 1; i >= 0; i--) {
//         if (scripts[i] && scripts[i].getAttribute("src") != null && scripts[i].getAttribute("src").includes("translate.google.com")) {
//           scripts[i].parentNode.removeChild(scripts[i]);
//         }
//       }
//       delete window.googleTranslateElementInit;
//     };
//   }, []);

//   const handleClick = () => {
//     logout();
//     navigate("/");
//   };

//   const navigateAboutUs = () => navigate('/AboutUs');
//   const navigateLogin = () => navigate('/Login');
//   const navigateSignUp = () => navigate('/SignUp');
//   const navigateComplaintform = () => navigate('/Complaintform');

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
//       <Container style={{ paddingLeft: 0 }}>
//         <Navbar.Brand href="#home" className="d-flex align-items-center">
//           <img
//             alt=""
//             src="images/logo.png.jpeg"
//             width="55"
//             height="55"
//             className="d-inline-block align-top mx-2"
//           />
//           <h2 className="mb-0 ml-2">JANSEVA</h2>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Link to="/" className="nav-link">Home</Link>
//             <Nav.Link href="#" onClick={navigateAboutUs}>About</Nav.Link>
//             <NavDropdown title="Contact Us" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#email">Email</NavDropdown.Item>
//               <NavDropdown.Item href="#viewers-impression">Viewer's Impression</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#feedback-form">Feedback Form</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>

//         <Nav className="ms-auto align-items-center">
//           {user && (
//             <div>
//               <span> <strong>Hello! {user.email}</strong></span>
//               <Button onClick={handleClick} variant="danger" className="mx-2"> Log out </Button>
//             </div>
//           )}

//           {!user && (
//             <Nav.Link href="#" onClick={navigateLogin}>Login/Signup</Nav.Link>
//           )}

//           <Button onClick={navigateComplaintform} variant="outline-dark">Lodge your complaint here</Button>
//         </Nav>

//         {/* Google Translate widget */}
//         <div id="google_translate_element"></div>
//       </Container>
//     </Navbar>
//   );
// }

import React, { useEffect } from "react";
import { Nav, Container, NavDropdown, Navbar, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function CustomNavbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //       pageLanguageOption: 'en'
  //     },
  //     "google_translate_element"
  //   );
  // };

  // useEffect(() => {
  //   const addGoogleTranslateScript = () => {
  //     const script = document.createElement("script");
  //     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   };

  //   if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
  //     addGoogleTranslateScript();
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //   }

  //   return () => {
  //     const scripts = document.getElementsByTagName("script");
  //     for (let i = scripts.length - 1; i >= 0; i--) {
  //       if (scripts[i] && scripts[i].getAttribute("src") != null && scripts[i].getAttribute("src").includes("translate.google.com")) {
  //         scripts[i].parentNode.removeChild(scripts[i]);
  //       }
  //     }
  //     delete window.googleTranslateElementInit;
  //   };
  // }, []);

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const navigateAboutUs = () => navigate('/AboutUs');
  const navigateLogin = () => navigate('/Login');
  const navigateSignUp = () => navigate('/SignUp');
  const navigateComplaintform = () => navigate('/Complaintform');

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container style={{ paddingLeft: 0 }}>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt=""
            src="images/logo.png.jpeg"
            width="55"
            height="55"
            className="d-inline-block align-top mx-2"
          />
           <h2 className="mb-0 ml-2" ><b>𝐉𝐀𝐍𝐒𝐄𝐕𝐀</b></h2>
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Nav.Link href="#" onClick={navigateAboutUs}>About</Nav.Link>
            <NavDropdown title="Contact Us" id="basic-nav-dropdown">
              <NavDropdown.Item href="#email">Email</NavDropdown.Item>
              <NavDropdown.Item href="#viewers-impression">Viewer's Impression</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#feedback-form">Feedback Form</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Nav className="ms-auto align-items-center">
          {user && (
            <div>
              <span> <strong>Hello! {user.email}</strong></span>
              <Button onClick={handleClick} variant="danger" className="mx-2"> Log out </Button>
            </div>
          )}

          {!user && (
            <Nav.Link href="#" onClick={navigateLogin}>Login/Signup</Nav.Link>
          )}

          <Button onClick={navigateComplaintform} variant="outline-dark">Lodge your complaint here</Button>
        </Nav>

        {/* Google Translate widget */}
        <div id="google_translate_element"></div>
      </Container>
    </Navbar>
  );
}

