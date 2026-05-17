const API_KEY = "6d3f033d-09d2-415a-a165-910896b21c91";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

function getMovies(url) {
    fetch(url, {
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
}

getMovies(API_URL_POPULAR);

function showMovies(data) {
    const movieblock = document.querySelector(".movie-grid");
    if (!movieblock) return;

document.querySelector(".movie-grid").innerHTML = "";

const movies = data.items || data.films; 

    movies.forEach((card) => {
        const movieEL = document.createElement("div");
        movieEL.classList.add("card");

        movieEL.innerHTML = `
        <img src="${card.posterUrlPreview} || ${card.posterUrl}"> 
        <p>${card.nameRu}</p>
       `;
    //    modalEl.addEventListener("click", () => openModal(card.kinopoiskId));
       movieblock.appendChild(movieEL);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

const hero = document.querySelector(".hero");
const films = document.querySelector(".row h2");
const marfun = document.querySelector(".movie-grid");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // const query = search.value.trim(); 
    // if (query) {
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    getMovies(apiSearchUrl);
    if (hero) {
        hero.innerHTML="";
        hero.classList.remove("hero");
        films.innerHTML="";
        marfun.classList.add("mar")
    }
    search.value = "";

    // }
});



//modal window 

// const modalEl = document.querySelector(".modal");

// async function openModal(id) {
//     movieEL.classList.add(".modal-show");
    
// }

// movieblock.innerHTML = ` 
//                 <head><title>${card.nameRu}</title></head>
//         <div class="poster-container">
//             <img src="${movie.posterUrl}" class="main-poster">
//             <div class="rating-badge">${movie.ratingKinopoisk || '—'}</div>
//         </div>
        
//         <div class="movie-info">
//             <h1>${movie.nameRu} (${movie.year})</h1>
//             <p class="tagline">Дата выхода: ${movie.premiereRu}</p>
            
//             <div class="meta">
//                 <span>${movie.genres.map(g => g.genre).join(', ')}</span>
//                 <span>${movie.duration ? movie.duration + ' мин.' : ''}</span>
//             </div>

//             <div class="description">
//                 <p>Вы можете добавить описание, если оно есть в API (в премьерах оно часто отсутствует в кратком ответе).</p>
//             </div>
            
//             <div class="buttons">
//                 <button class="btn-primary">Смотреть</button>
//                 <button class="btn-secondary">Буду смотреть</button>
//             </div>
//         </div>
    //   `
                