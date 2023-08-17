import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Spacer, Heading, Button, Icon } from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi'; // Import the Feather icon

const Navbar = () => {
    const token = localStorage.getItem('token');

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
                <Link to="/search_page" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                    Search
                </Link>
                {token ? (
                    <>
                        <Link to="/wishlist" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                            WishList
                        </Link>
                        <Link to="/account" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                            Account
                        </Link>
                        {/* Add more authenticated links here */}
                    </>
                ) : (
                    <Link to="/login" style={{ color: 'gray', textDecoration: 'none', marginRight: '15px' }}>
                        Login
                    </Link>
                )}

            </Box>
        </Flex>
    );
};

export default Navbar;
