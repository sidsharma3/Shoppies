import { useState, useEffect } from 'react'
import Movies from './components/Movies'
import Search from './components/Search'
import Nominations from './components/Nominations'
import Spinner from './components/Spinner'
import Landing from './components/Landing'
import Zoom from 'react-reveal/Zoom';
import { store } from 'react-notifications-component';
import axios from 'axios';

function App() {

  const [nominated, setNominated] = 
  useState(JSON.parse(localStorage.getItem("nominations")) || [])
  const [searchWords, setSearchWords] = useState("movie")
  const [resultsLoading, setResultsLoading] = useState(true)
  const [showLanding, setShowLanding] = useState(true)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    setResultsLoading(true)
    axios.get(`http://www.omdbapi.com/?s=${searchWords}&apikey=6cbaeff6`)
    .then(res => {
      if (res.data.Response !== "False") {
        const searchedMovies = [...res.data.Search]
        // Prevents any duplicated movies
        let uniqueMovies = {}
        searchedMovies.forEach(function (movie) {          
          if(nominated.some(nomination => nomination.imdbID === movie.imdbID)){
            movie.nominated = true;
          } else{
            movie.nominated = false;
          }
          uniqueMovies[movie.imdbID] = movie;
        });
        setMovies(Object.values(uniqueMovies))
      } else {
        setResultsLoading(false)
        setMovies([])
        console.log("error in search")
      }
    }).catch(({message}) => console.log(message))
  }, [searchWords])

  useEffect(() => {
    setResultsLoading(false)
    localStorage.setItem("movies", JSON.stringify(movies));
    setMovies(movies)
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominated));
    if (nominated.length === 5){
      store.addNotification({
        title: "Great Job!",
        message: "You Nominated Five Movies!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
    let newMovies = [...movies]

    newMovies.forEach(function (movie) {
      if(nominated.some(nomination => nomination.imdbID === movie.imdbID)){
        movie.nominated = true;
      } else{
        movie.nominated = false;
      }
    });

    setMovies(newMovies)

  }, [nominated]);

  const addNomination = (nomination) => {
    if (nominated.length !== 5) {
      nomination.nominated = true;
      setNominated([...nominated, nomination])
    } else {
      store.addNotification({
        title: "There is an Issue!",
        message: "You Can Only Nominate Five Movies",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }

  }

  const deleteNomination = (movie, id) => {
    setNominated(
      nominated.filter((nomination) => nomination.imdbID !== movie.imdbID))
    movie.nominated = false;
  }


  return (
    <div className="app">
      {showLanding ? 
        (<Zoom><Landing setShowLanding={setShowLanding}/></Zoom>) 
        : 
        (<div className="container">
          {nominated.length === 5 && 
          <h1>Awesome! You Nominated Five Movies!</h1>}
          <Nominations 
            nominations={nominated} 
            deleteNomination={deleteNomination}
          />
          <Search setSearchWords={setSearchWords}/>
          {!resultsLoading ? 
            (<Movies movies={movies} addNomination={addNomination}/>) :
            (<Spinner/>)
          }
        </div>)}
    </div>
  );
}

export default App;
