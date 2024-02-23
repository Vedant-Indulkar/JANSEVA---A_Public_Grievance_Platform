import React, { useState } from 'react';
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar"; // Make sure this path is correct

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const [registeredUser, setRegisteredUser] = useState(null);



    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault()

        
        await login(email, password)
        
        // const adminemail = "admin@gmail.com";
        // const adminPassword = "admin123";

        // if (email === adminemail && password === adminPassword) {
        //     alert('Welcome, Admin!');
        //     navigate('/admin');
        // } else if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
        //     alert('Successfully logged in!');
        //     // Set email in local storage after successful login
        //     localStorage.setItem('loggedInUserEmail', email);

            

        //     // Pass the email to both the Complaintform and Dashboard pages
        //     navigate('/Complaintform', { state: { email } });


        //     // navigate('/Dashboard', { state: { email } });
        // } else {
        //     alert('Incorrect email or password.');
        // }
    };


    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <div className="w-50 mx-auto">

                    <Form onSubmit={handleLogin}>
                        <h3 className="text-center mb-4"><u>Login</u></h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit">Login</Button>

                    </Form>



                    <div className="text-center mt-3">
                        <Button disabled={isLoading} variant="link" onClick={() => navigate('/Signup')} className='text-black'>
                            {'Need an account? Sign up'}
                        </Button>
                        {error && <div className="error">{error}</div>}

                    </div>
                </div>
            </Container>
        </>
    );
}


