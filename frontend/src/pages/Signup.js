import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar"; 
import { useSignup } from "../hooks/useSignup"
import { Eye, EyeOff } from 'react-feather'; // Import Eye and EyeOff icons

export default function Signup(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const {signup, error, isLoading} = useSignup()

    const handleSignup = async (event) => {
        event.preventDefault();
        await signup(email, password)
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <div className="w-50 mx-auto">
                    <Form onSubmit={handleSignup}>
                        <h3 className="text-center mb-4"><u>Sign Up</u></h3>
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
                            <div className="input-group"> {/* Using Bootstrap input group */}
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
                        <div className="text-center"> {/* Centering the signup button */}
                            <Button variant="dark" type="submit">Sign Up</Button>
                        </div>
                    </Form>
                    <div className="text-center mt-3">
                        <Button disabled={isLoading} variant="link" onClick={() => navigate('/Login')} className='text-black'>
                            {'Already have an account? Log in'}
                        </Button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </Container>
        </>
    );
}
