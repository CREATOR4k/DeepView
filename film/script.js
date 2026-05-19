 const API_KEY = "6d3f033d-09d2-415a-a165-910896b21c91";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2025&month=JUNE";

fetch( API_URL_POPULAR , {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => {
        console.log(json);
        showMovies(json);
    })
    .catch(err => console.log(err));



function showMovies(data) {
    const movieblock = document.querySelector(".movie-header");
    if (!movieblock) return;

movieblock.innerHTML = "";

const movies = data.items || data.films; 

const movie = movies[0]


    function El(){
        movieblock.innerHTML = ` 
                <head><title>${movie.nameRu}</title></head>
        <div class="poster-container">
            <img src="${movie.posterUrl}" class="main-poster">
            <div class="rating-badge">${movie.ratingKinopoisk || '—'}</div>
        </div>
        
        <div class="movie-info">
            <h1>${movie.nameRu} (${movie.year})</h1>
            <p class="tagline">Дата выхода: ${movie.premiereRu}</p>
            
            <div class="meta">
                <span>${movie.genres.map(g => g.genre).join(', ')}</span>
                <span>${movie.duration ? movie.duration + ' мин.' : ''}</span>
            </div>

            <div class="description">
                <p>Вы можете добавить описание, если оно есть в API (в премьерах оно часто отсутствует в кратком ответе).</p>
            </div>
            
            <div class="buttons">
                <button class="btn-primary">Смотреть</button>
                <button class="btn-secondary">Буду смотреть</button>
            </div>
        </div>
                `
    }
       El()
}
 
 
 
 
 
 
 
 
 
 
 
 
 
