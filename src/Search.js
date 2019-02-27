import React, { Component } from 'react';
import Header from './Header';
import './header.css';

const movies = [
    {
        img: "http://fr.web.img3.acsta.net/c_215_290/medias/nmedia/18/62/89/48/18708437.jpg",
        rating: 4,
        title: 'À LA RECHERCHE DU BONHEUR',
        date: '31 janvier 2007 (1h 58min)',
        genres: 'Comédie dramatique, Biopic',
        nationalité: 'Américain'
    },
    {
        img: "http://fr.web.img2.acsta.net/c_215_290/medias/nmedia/18/63/12/34/18711805.jpg",
        rating: 3,
        title: 'Blood Diamond',
        date: '31 janvier 2007 (2h 22min)',
        genres: 'Aventure, Drame, Thriller',
        nationalité: ' Américain, Allemand'
    },
    {
        img: "http://fr.web.img5.acsta.net/c_215_290/medias/05/12/12/051212_af.jpg",
        rating: 5,
        title: 'SEUL AU MONDE',
        date: '17 janvier 2001 (2h 23min)',
        genres: 'Aventure, Drame',
        nationalité: 'Américain'
    }
]


//STEP 1 - MOVIE COMPONENT
const Movie = ({movie}) => (
    <div className="flip-card">
        <div className="flip-card-inner">
            <div className="flip-card-front">
                <img  src={movie.img} ></img> 
            </div>
            <div className="starRating">
                {/* STEP 14  */}

                <Rating number={movie.rating}/>
            </div>
            <div className="flip-card-back">
                <h1>{movie.title} </h1>
                <p>{movie.date}</p>
                <p>{movie.genres}</p>
                <p>{movie.nationalité}</p>
            </div>
        </div>
    </div>
)
// step 13
function Rating({ number, onClickStar }) {
    const star = [];
    for (let index = 0; index < 5; index++) {
        if (index < number) {
            star.push(<a onClick={() => onClickStar(index + 1)}><i className="fas fa-star star" ></i></a>)
        }
        else { star.push(<a onClick={() => onClickStar(index + 1)}><i className="fas fa-star whitestar"></i></a>) }
    }
    return star;
}



class Search extends Component {
    constructor(props) {
        super(props)
        //STEP 2 - DEFINIR STATE
        this.state = {
            movies,
            search: "",
            rate:0,   
            display: "none"          
        }

        // STEP 5' - INPUT REFERENCES
        this.titleInput = React.createRef(); 
        this.dateInput = React.createRef(); 
        this.genreInput = React.createRef(); 
        this.nationalitéInput = React.createRef(); 
        this.imgInput = React.createRef(); 
        this.ratingInput = React.createRef(); 


    }

    // STEP 6 - LOGIC
    addMovie = () => {
        // STEP 7 - UPDATE STATE - NEVER MUTATE STATE!!!!!! - NEW TABLE
        this.setState({
            display: "none",
            movies : [
                ...this.state.movies,
                {
                    title: this.titleInput.current.value ,                 
                     date: this.dateInput.current.value,
                     genres: this.genreInput.current.value,
                     nationalité: this.nationalitéInput.current.value,
                     img: this.imgInput.current.value,
                    rating: this.ratingInput.current.value,
                    
                    
                }
                
                
            ]
        })
         // STEP 8
        this.titleInput.current.value = ""
        this.dateInput.current.value = ""
        this.genreInput.current.value = ""
        this.nationalitéInput.current.value = ""
        this.imgInput.current.value = ""
        this.ratingInput.current.value = ""

    }
    // step 10 
    searchInput = (e) => {
      
        this.setState({
            search:e.target.value
       })
        
        
        }
   // step 12
    searchRateMovie = (i) => {
        // Movie = Movie.concat(data);
        this.setState({ rate: i })
    }
    displayBox= () => {

    this.setState({
        display: 'block'
    })
    }
    getVisibleMovies = () => {
        return this.state.movies.filter(
            movie =>
                movie.title.toLowerCase().includes(this.state.search.toLowerCase().trim())
                && (movie.rating >= this.state.rate)
        )
    }
    getname (name){
        console.log(name)
    }
    render() {
        return (
            <div className='header'>
                <div className='menu'>
                    <input className='inputsearch'
                    
                    // step 9 
                        onChange={this.searchInput}
                        placeholder="Search..." />

                    <button className='buttonsearch'>Search</button>
                    {/* STEP 11  */}
           
                    <Rating number={this.state.rate}
                        onClickStar={i => this.searchRateMovie(i)} />
                        
                    
                </div>
                <div class="movies">
                    {/* STEP 3 - REPLACE MOVIES - THIS.STATE.MOVIES */}
                    {this.getVisibleMovies()
                        .map(el => (
                        <Movie movie={el} />
                    ))}

                    
                    <div className="addplus">
                    <div className="add">
                    {/* STEP 4 ADD ONCLICK */}
                        <button className="button" onClick={this.displayBox}>+</button>
                        </div>
                        <div className="input" style={{ display:`${this.state.display}`}}>
                        <br/>
                        {/*  STEP 5 - ADD REFERENCE */}
                            <input  placeholder="title" ref={this.titleInput}/>  
                        <br/>
                            <input placeholder="date" ref={this.dateInput}/>  
                        <br/>
                            <input placeholder="genres" ref={this.genreInput}/>  
                        <br/>
                            <input placeholder="Nationalité" ref={this.nationalitéInput}/>  
                            <br />
                            <input  placeholder="img" ref={this.imgInput} /> 
                            <br />
                            <input placeholder="rating" ref={this.ratingInput} />
                            
                        <button onClick={this.addMovie}>ADD</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;

