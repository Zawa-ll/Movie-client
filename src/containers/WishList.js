import React from 'react';
import { Box, Table, Tbody, Tr, Td, Text, IconButton, Spacer } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Wishlist = () => {
    const wishlistItems = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
        { id: 3, title: 'Movie 3' },
    ]; // Replace with your wishlist items

    const handleRemoveItem = (itemId) => {
        // Handle removing an item from the wishlist
        console.log(`Removing item with id ${itemId}`);
    };

    return (
        <Box>
            <h1>Your Wishlist</h1>
            <Table variant="simple">
                <Tbody>
                    {wishlistItems.map((item) => (
                        <Tr key={item.id}>
                            <Td>
                                <Text>{item.title}</Text>
                            </Td>
                            <Td isNumeric>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => handleRemoveItem(item.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Wishlist;
