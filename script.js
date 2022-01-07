const API_KEY = 'ca34b1ab541651378e4fd47bce303f53'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`
const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`

const WITH_GENRE = `https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=${API_KEY}`
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

const genres = [{
    "id": 28,
    "name": "Action" 
},
{
    "id": 12,
    "name": "Adventure"
},
{
    "id": 16,
    "name": "Animation"
},
{
    "id": 35,
    "name": "Comedy"
},
{
    "id": 80,
    "name": "Crime"
},
{
    "id": 99,
    "name": "Documentary"
},
{
    "id": 18,
    "name": "Drama"
},
{
    "id": 10751,
    "name": "Family"
},
{
    "id": 14,
    "name": "Fantasy"
},
{
    "id": 36,
    "name": "History"
},
{
    "id": 27,
    "name": "Horror"
},
{
    "id": 10402,
    "name": "Music"
},
{
    "id": 9648,
    "name": "Mystery"
},
{
    "id": 10749,
    "name": "Romance"
},
{
    "id": 878,
    "name": "Science Fiction"
},
{
    "id": 10770,
    "name": "TV Movie"
},
{
    "id": 53,
    "name": "Thriller"
},
{
    "id": 10752,
    "name": "War"
},
{
    "id": 37,
    "name": "Western"
},
]

//Get Intial Movies
getAPIS(API_URL, GENRE_API)

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)   
}


async function getAPIS(discover, genre) {
    const discoverRes = await fetch(discover)
    const discoverData = await discoverRes.json()

    const genreRes = await fetch(genre)
    const genreData = await genreRes.json()


    showMovies(discoverData.results)
}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, genre_ids} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`
    main.appendChild(movieEl)

      const genreEl = document.createElement('div')
      genreEl.classList.add('movie-info')
      genreEl.innerHTML = ''
      movieEl.appendChild(genreEl)

      if (genre_ids.includes(28)) {
          genreEl.innerHTML = "<span class='genre action'>Action</span>"
      }    else {
          console.log("N/A")
      }
      if (genre_ids.includes(28) && genre_ids.includes(12)) {
        genreEl.innerHTML = "<span class='genre action'>Action</span> <span class = 'genre adventure'>Adventure</span>"
    }    else {
        console.log("N/A")
    }
    if (genre_ids.includes(28) && genre_ids.includes(12) && genre_ids.includes(35)) {
        genreEl.innerHTML = "<span class='genre action'>Action</span> <span class = 'genre adventure'>Adventure</span> <span class = 'genre comedy'>Comedy</span>"
    }    else {
        console.log("N/A")
    }
    if (genre_ids.includes(28) && genre_ids.includes(12) && genre_ids.includes(35) && genre_ids.includes(14)) {
        genreEl.innerHTML = "<span class='genre action'>Action</span> <span class = 'genre adventure'>Adventure</span> <span class = 'genre comedy'>Comedy</span> <span class = 'genre fantasy'>Fantasy</span>"
    }    else {
        console.log("N/A")
    }
    //I know for a fact that there is a better way to do this way of adding the genres onto each movie-info div but at this point im kind of done with this for now. Could be improved in the future for sure
      movieEl.appendChild(genreEl)
    })  
}
function getClassByRate(vote) {
    if(vote >= 8) {
        return "green"
    } else if(vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
});