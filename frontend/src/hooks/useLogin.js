import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Use false instead of null
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Failed to login');
                return; // Early return in case of error
            }

            // If the response is ok, proceed with the login
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            alert('Login Successful!')
            // Navigate to another route upon successful login. Adjust the path as needed.
            // navigate('/complaintform'); // Example: navigate to a 'dashboard' route
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Login error:', error);
            setError('An error occurred during login.');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
