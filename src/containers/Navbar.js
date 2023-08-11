// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Spacer, Heading, Button, Icon } from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi'; // Import the Feather icon

const Navbar = () => {
    return (
        <Flex bg="gray.700" p={4} alignItems="center">
            <Box>
                <Heading size="md" color="white">
                    MovieHub
                </Heading>
            </Box>
            <Spacer />
            <Box>
                <Link to="/" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                    Home
                </Link>
                <Link to="/register" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                    Personal
                </Link>

                {/* Add more navigation links or buttons here */}
            </Box>
        </Flex>
    );
};

export default Navbar;
