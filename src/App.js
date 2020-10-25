import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  }

  getMovies = async () => {
  //  const movies = await axios.get("https://yts.mx/api/v2/list_movies.json")
    const {data:{data:{movies}}} = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating")  
    console.log(movies)
    
    this.setState({movies : movies, isLoading:false})
  }

  componentDidMount(){
    this.getMovies()
  }
  
  renderMovies = (movie) => {
      return <Movie key = {movie.id} 
      id = {movie.id} 
      year = {movie.year} 
      title = {movie.title} 
      summary = {movie.summary} 
      poster = {movie.medium_cover_image} 
      rating = {movie.rating}
      genres = {movie.genres}/>
  }

  render(){
    const {isLoading, movies} = this.state
    return(
    <section className = "container">
      {isLoading ? 
      (<div className="loader">
        <span className = "loader__text">Loading... </span>
      </div>): 
      (<div className="movies">
        {movies.map(this.renderMovies)}
      </div>)
      }
    </section>
    )
  }
}

export default App;
