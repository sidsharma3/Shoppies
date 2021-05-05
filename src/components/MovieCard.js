import Zoom from 'react-reveal/Zoom';

const MovieCard = ({ movie, addNomination }) => {
    return (
        <Zoom>
            <div className="movie">
                <img 
                    width="210" 
                    height="315" 
                    alt={movie.Title} 
                    src={movie.Poster}
                />
                <h3>{ movie.Title }</h3>
                <h2>{ movie.Year }</h2>
                <button 
                    className="button" 
                    disabled={movie.nominated} 
                    onClick={() => addNomination(movie)}
                >
                    {!movie.nominated ? ("Nominate Me!") : ("Nominated!")}
                </button>
            </div>
        </Zoom>
    )
}

export default MovieCard