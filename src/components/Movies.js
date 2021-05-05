import MovieCard from './MovieCard'

const Movies = ({movies, addNomination }) => {
    return (
        <div className="movieContainer">
            {movies.length === 0 ? (
            <h1>
                No movies were found! Use the search bar above to find movies!
            </h1>) : 
            (<>
                <h1>Search Results:</h1>
                <div className="movies">
                    {movies.map((movie, index) => (
                        <>
                            <MovieCard 
                                key={index} 
                                movie={movie} 
                                addNomination={addNomination}
                            />
                        </>
                    ))}
                </div>
            </>)}
            
        </div>
    )
}

export default Movies