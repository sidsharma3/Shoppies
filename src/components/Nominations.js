import NominationCard from './NominationCard'
import Zoom from 'react-reveal/Zoom';

const Nominations = ({nominations, deleteNomination }) => {
    return (
        <div className="nominationContainer">
            
            {nominations.length === 0 ? 
            (
                <Zoom>
                    <h1 className="explanation">
                        Click on one of the movies below to nominate them!
                    </h1>
                </Zoom>
            ) : 
            (
                <>
                <h1>Nominations:</h1>
                <div className="nominations">
                        {nominations.map((nomination, index) => (
                            <NominationCard 
                                key={index} 
                                nomination={nomination} 
                                deleteNomination={deleteNomination}
                            />
                        ))}
                </div>
                </>
            )}
        </div>
    )
}

export default Nominations