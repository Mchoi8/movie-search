//Hooks with useState 

import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=avengers&apikey=cabc4c0f"; 





const App = () => { // Func Component 
  var modal = document.getElementById("modal");
   
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => { //Shows a home page of a list of avenger movies by calling the API
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

    const search = searchValue => { //API called with the specific search query to return a list of the relevant movies
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=cabc4c0f`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
    };

    const closeModal = (e) => {

      document.getElementById('modal-body').remove();
      modal.style.display = 'none';
    }


    window.onclick = function(event) {

      if (event.target == modal) {
        document.getElementById('modal-body').remove();
        modal.style.display = "none";
      }
    }


    let openModal = (info) => {
      console.log("CALLBACK", info)
        fetch(`https://www.omdbapi.com/?t=${info}&apikey=cabc4c0f`)
          .then(response => response.json())
          .then(jsonResponse => {
            var modalBody = document.createElement('div');
            modalBody.id = 'modal-body';


            if( jsonResponse.Title !== undefined) {

              var close = document.createElement('span');
              close.className = 'close';
              close.innerHTML = '&times;';
              close.onclick = closeModal;


              var header = document.createElement('h3');
              header.innerHTML = jsonResponse.Title;
              header.id = 'header';

              var poster = document.createElement('img');
              poster.id = 'modalposter';
              poster.src = jsonResponse.Poster;

              var runtime = document.createElement('p');
              runtime.innerHTML = 'Runtime: ' + jsonResponse.Runtime;
              runtime.className = 'para';

              var genre = document.createElement('p');
              genre.innerHTML = 'Genre: ' + jsonResponse.Genre;
              genre.className = 'para';


              var plot = document.createElement('p');
              plot.innerHTML = 'Plot: ' + jsonResponse.Plot;
              plot.className = 'para';


              var Actors = document.createElement('p');
              Actors.innerHTML = 'Actors: ' + jsonResponse.Actors;
              Actors.className = 'para';

              modal.appendChild(modalBody);

              modalBody.appendChild(close);
              modalBody.appendChild(header);
              modalBody.appendChild(poster);
              modalBody.appendChild(runtime);
              modalBody.appendChild(genre);
              modalBody.appendChild(plot);
              modalBody.appendChild(Actors);
            }

            modal.style.display = 'flex';
            modalBody.style.display = 'block';
          });
  }
    
    return (
     <div className="App">
      <Header text="Online Movie Lookup" />
      <Search search={search} />
      <p className="App-intro">Search your favorite movies online!</p>
      <div onClick={openModal} className="movies">
        {loading && !errorMessage ? (
         <span className='searchloading'>Search loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie  key={`${index}-${movie.Title}`} movie={movie} movieInfo={openModal} />
          ))
        )}

      </div>
      <div id='modal'>

        {/* <div id="modal-body">
          <span className="close" onClick={closeModal}>&times;</span>

        </div> */}
      </div>
    </div>
  );
};


export default App;