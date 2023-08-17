import React, { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';

const GenreBar = ({ genres, selectedGenre, onSelectGenre }) => {
    const genreWidth = 150; // Adjust the width of each genre button
    const genresPerGroup = 5; // Adjust the number of genres per group
    const totalGenres = genres.length;
    const totalGroups = Math.ceil(totalGenres / genresPerGroup);

    const [currentGroup, setCurrentGroup] = useState(0);

    const handleScroll = (direction) => {
        const step = direction === 'left' ? -1 : 1;
        const newGroup = (currentGroup + step + totalGroups) % totalGroups;
        setCurrentGroup(newGroup);
    };

    const startIdx = currentGroup * genresPerGroup;
    const endIdx = Math.min(startIdx + genresPerGroup, totalGenres);

    return (
        <Flex justify="center" alignItems="center" mt={4} overflowX="hidden">
            {currentGroup > 0 && (
                <Button
                    size="sm"
                    onClick={() => handleScroll('left')}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#333333',
                        border: '2px solid #333333',
                    }}
                    _hover={{
                        backgroundColor: '#333333',
                        color: 'white',
                    }}
                >
                    &lt;
                </Button>
            )}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'hidden',
                }}
            >
                {genres.slice(startIdx, endIdx).map((genre) => (
                    <Button
                        key={genre.id}
                        variant={genre.id === selectedGenre ? 'solid' : 'outline'}
                        onClick={() => onSelectGenre(genre.id)}
                        m={2}
                        size="sm"
                        style={{
                            width: `${genreWidth}px`,
                            backgroundColor: genre.id === selectedGenre ? '#333333' : 'transparent',
                            color: genre.id === selectedGenre ? 'white' : '#333333',
                            border: '2px solid #333333',
                        }}
                        _hover={{
                            backgroundColor: genre.id === selectedGenre ? '#222222' : '#333333',
                            color: 'white',
                        }}
                    >
                        {genre.name}
                    </Button>
                ))}
            </div>
            {currentGroup < totalGroups - 1 && (
                <Button
                    size="sm"
                    onClick={() => handleScroll('right')}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#333333',
                        border: '2px solid #333333',
                    }}
                    _hover={{
                        backgroundColor: '#333333',
                        color: 'white',
                    }}
                >
                    &gt;
                </Button>
            )}
        </Flex>
    );
};

export default GenreBar;
