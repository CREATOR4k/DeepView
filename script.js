const API_KEY = "6d3f033d-09d2-415a-a165-910896b21c91";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2026&month=MAY";

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
    const movieblock = document.querySelector(".movie-grid");
    if (!movieblock) return;

const movies = data.items || data.films; 

    movies.forEach(card => {
        const movieEL = document.createElement("div")
        movieEL.classList.add("card")

        movieEL.innerHTML = `
        <img src="${card.posterUrlPreview}">
        <p>${card.nameRu}</p>
       `;
       movieblock.appendChild(movieEL);
    });
}