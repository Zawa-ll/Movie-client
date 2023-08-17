import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PosterCard from './PosterCard'; // Import the PosterCard component

const MovieGrid = ({ movies }) => { // Accept movies as a prop
    return (
        <SimpleGrid columns={4} spacing={6}>
            {movies.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <PosterCard movie={movie} />
                </Link>
            ))}
        </SimpleGrid>
    );
};

export default MovieGrid;

// import React from 'react';
// import { SimpleGrid } from '@chakra-ui/react';
// import { Link } from 'react-router-dom'; // Import Link from React Router
// import useAdImages from '../hooks/useAdImages';
// import PosterCard from './PosterCard'; // Import the PosterCard component

// const MovieGrid = () => {
//     const { movies, loading, error } = useAdImages();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <SimpleGrid columns={4} spacing={6}>
//             {movies.map((movie) => (
//                 <Link key={movie.id} to={`/movies/${movie.id}`}>
//                     <PosterCard movie={movie} />
//                 </Link>
//             ))}
//         </SimpleGrid>
//     );
// };

// export default MovieGrid;
