import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear the token from local storage and perform any other logout actions
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <Box>
            <h1>Account Information</h1>
            {/* Add other account-related content */}
            <Button onClick={handleLogout} colorScheme="red">
                Logout
            </Button>
        </Box>
    );
};

export default Account;
