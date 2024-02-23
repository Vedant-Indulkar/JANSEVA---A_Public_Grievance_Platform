import React from "react";
import { Nav, Container, NavDropdown, Navbar, Button } from "react-bootstrap";
import { useNavigate, Link} from 'react-router-dom'; // Import Link
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


export default function CustomNavbar() {

  //for logout
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
    
  }


  const navigate = useNavigate();
  const navigateAboutUs = () => {navigate('/AboutUs')}
  const navigateLogin = () => {navigate('/Login')}
  const navigateSignUp = () => {navigate('/SignUp')}
  const navigateComplaintform = () => {navigate('/Complaintform')}
  // const navigateHome = () => {navigate('/Home')}

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
           <h2 className="mb-0 ml-2" >JANSEVA</h2>
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to="/" className="nav-link">Home</Link>
            <Nav.Link href="#"  onClick={navigateAboutUs }>About</Nav.Link>
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
              <span>{user.email}</span>
              <Button  onClick={handleClick} variant="outline-dark"> Log out </Button>
            </div>
          )}
        
          {!user && (

          <Nav.Link href="#"  onClick={navigateLogin }>Login/Signup</Nav.Link>

          )}

          {/* <Nav.Link href="#"  onClick={navigateSignUp }>Signup</Nav.Link> */}

          {/* <Nav.Link href="#admin">Admin</Nav.Link> */}
          


          <Button  onClick={navigateComplaintform} variant="outline-dark">Lodge your complaint here</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}