import React, { useState } from 'react';
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar"; // Make sure this path is correct
import { Mail } from 'lucide-react'; // Import Mail icon
import { Eye, EyeOff } from 'react-feather'; // Import Eye and EyeOff icons

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Attempt login
        await login(email, password);

        // Admin credentials
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {
            // Admin login successful
            alert('Welcome, Admin!');
            navigate('/admin');
        } else if (error) {
            // Display error message if login fails
            alert(error);
        } else {
            // Regular user login successful
            // alert('Successfully logged in!');
            // Set email in local storage after successful login
            localStorage.setItem('loggedInUserEmail', email);
            // Navigate to the Complaint page
           
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <div className="w-50 mx-auto">
                    <Form onSubmit={handleLogin}>
                        <h3 className="text-center mb-4"><u>Login</u></h3>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <Mail /> Email
                            </Form.Label>
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
                            <div className="input-group">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button variant="dark" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
                            </div>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="dark" type="submit">Login</Button>
                        </div>
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
