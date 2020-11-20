import Movie from "./components/movie";
import './App.css';
import React, {useState , useEffect } from "react";


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa33807f75c81b9a11ab8ae5fbf891f7&page=1"; 

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=aa33807f75c81b9a11ab8ae5fbf891f7&query=';



function App() {

const [movies, setmovies] = useState([]);
const [searchTerm, setSearchTerm] = useState("");


useEffect(() => {
  getMovies(FEATURED_API);
},[]);


const getMovies =(API) => {
  fetch(API)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setmovies(data.results);
    console.log(movies,"movies !!!");
  })
  .catch(err => console.log(err));
  setSearchTerm("");
}


const handleOnSubmit =(e) => {
  e.preventDefault();
  

  if(searchTerm.length > 0){
    getMovies(SEARCH_API+searchTerm);
  }
  
   
};

const handleOnChange =(e) => {
  setSearchTerm(e.target.value);
};




  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}>
        <input

       className="search" 
       type="search" 
       placeholder="search..."
       value={searchTerm}
       onChange={handleOnChange}
       
         />
  </form>
  </header>
    <div className="movie-container">
    {movies.length > 0 && movies.map((movie) => 
    <Movie key={movie.id} {...movie} />
    
    )}
    
    </div>
    </>
  );
}

export default App;
