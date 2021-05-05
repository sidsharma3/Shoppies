import Zoom from 'react-reveal/Zoom';

const NominationCard = ({ nomination, deleteNomination }) => {
    return (
        <Zoom>
            <div className="nomination">
                <h3>{nomination.Title}</h3>
                <h2>{nomination.Year}</h2>
                <img width="180" height="270" 
                alt={nomination.Title} src={nomination.Poster}/>
                
                <button 
                    onClick=
                    {() => deleteNomination(nomination, nomination.imdbID)}
                >
                    Delete!
                </button>
            </div>
        </Zoom>
    )
}

export default NominationCard
