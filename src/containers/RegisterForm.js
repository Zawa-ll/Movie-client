import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Center } from '@chakra-ui/react';
import popcornImage from '../assets/popcorn-1085072_1920.jpg'; // Import the image
import { Link } from 'react-router-dom';
import authClient from '../api/authClient';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

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
            const response = await authClient.post('/register', formData);
            console.log('Registration successful', response.data);
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Registration error', error);
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
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
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
                                Register
                            </Button>
                        </VStack>
                    </form>

                </Box>
                <Link to="/login" color="teal" fontSize="sm">
                    Already have an account? Login here.
                </Link>
            </VStack>
        </Center>
    );
};

export default RegisterForm;
