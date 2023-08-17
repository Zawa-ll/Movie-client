import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import popcornImage from '../assets/popcorn-1085072_1920.jpg'; // Import the image
import { Link } from 'react-router-dom';
import authClient from '../api/authClient';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const [redirectToRoot, setRedirectToRoot] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: token } = await authClient.post('/login', formData);


            localStorage.setItem('token', token);
            if (token) {
                setFormData({ username: '', email: '', password: '', });
                navigate('/');
            }

        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <Center>
            <VStack spacing={4}>
                <Box
                    backgroundImage={`url(${popcornImage})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    width="600px"
                    height="300px" // Adjust the desired height
                    borderRadius="md"
                />
                <Box width="300px" p={4} borderWidth={1} borderRadius="md">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="teal" w="full">
                                Login
                            </Button>
                        </VStack>
                    </form>
                </Box>
                <Link as={Link} to="/register" color="teal" fontSize="sm">
                    Don't have an account? Register here.
                </Link>
            </VStack>
        </Center>
    );
};

export default LoginForm;
