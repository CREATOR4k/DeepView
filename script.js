const API_KEY = "6d3f033d-09d2-415a-a165-910896b21c91";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_TRAILER = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2027&month=JULY";

let currentPage = 1;
let totalPages = 1;
let currentApiUrl = "";


function getMovies(url, page = 1) {
    currentApiUrl = url;
    currentPage = page;
    const urlWithPage = page > 1 ? `${url}&page=${page}` : url;

    fetch(urlWithPage, {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => {
        console.log(json);
        if (json.totalPages) {
            totalPages = json.totalPages;
        }
        showMovies(json);
        updatePagination();
    })
    .catch(err => console.log(err));
}

getMovies(API_URL_POPULAR);

// Add pagination to the page after initial load
document.addEventListener('DOMContentLoaded', () => {
    const rowSection = document.querySelector(".row");
    if (rowSection) {
        const pagination = createPagination();
        rowSection.appendChild(pagination);
        setupPaginationEvents();
    }
});

function showMovies(data) {
    const movieblock = document.querySelector(".movie-grid");
    if (!movieblock) return;

document.querySelector(".movie-grid").innerHTML = "";

const movies = data.items || data.films; 

    movies.forEach((card) => {
        const movieEL = document.createElement("div");
        movieEL.classList.add("card");
        movieEL.innerHTML = `
        <img src="${card.posterUrlPreview || card.posterUrl} "> 
        <p>${card.nameRu || card.nameEn || "-"}</p>
       `;
       movieblock.appendChild(movieEL);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

const hero = document.querySelector(".hero");
const films = document.querySelector(".row h2");
const marfun = document.querySelector(".movie-grid");

// Pagination functions
function createPagination() {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";
    paginationContainer.innerHTML = `
        <button class="pagination-prev" disabled>←</button>
        <div class="pagination-pages"></div>
        <button class="pagination-next">→</button>
    `;
    return paginationContainer;
}

function updatePagination() {
    const prevButton = document.querySelector(".pagination-prev");
    const nextButton = document.querySelector(".pagination-next");
    const pagesContainer = document.querySelector(".pagination-pages");

    if (prevButton && nextButton && pagesContainer) {
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;

        // Clear existing page buttons
        pagesContainer.innerHTML = '';

        // Determine range of pages to show
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        // Always show first page
        if (startPage > 1) {
            const firstPageButton = document.createElement("button");
            firstPageButton.textContent = "1";
            firstPageButton.className = "pagination-page" + (currentPage === 1 ? " active" : "");
            firstPageButton.addEventListener("click", () => getMovies(currentApiUrl, 1));
            pagesContainer.appendChild(firstPageButton);

            if (startPage > 2) {
                const ellipsis = document.createElement("span");
                ellipsis.textContent = "...";
                ellipsis.className = "pagination-ellipsis";
                pagesContainer.appendChild(ellipsis);
            }
        }

        // Show pages in range
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.className = "pagination-page" + (currentPage === i ? " active" : "");
            pageButton.addEventListener("click", () => getMovies(currentApiUrl, i));
            pagesContainer.appendChild(pageButton);
        }

        // Always show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement("span");
                ellipsis.textContent = "...";
                ellipsis.className = "pagination-ellipsis";
                pagesContainer.appendChild(ellipsis);
            }

            const lastPageButton = document.createElement("button");
            lastPageButton.textContent = totalPages;
            lastPageButton.className = "pagination-page" + (currentPage === totalPages ? " active" : "");
            lastPageButton.addEventListener("click", () => getMovies(currentApiUrl, totalPages));
            pagesContainer.appendChild(lastPageButton);
        }
    }
}

function setupPaginationEvents() {
    const prevButton = document.querySelector(".pagination-prev");
    const nextButton = document.querySelector(".pagination-next");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                getMovies(currentApiUrl, currentPage - 1);
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                getMovies(currentApiUrl, currentPage + 1);
            }
        });
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    getMovies(apiSearchUrl);
    if (hero) {
        hero.innerHTML="";
        hero.classList.remove("hero");
        films.innerHTML="";
        marfun.classList.add("mar")
    }
    search.value = "";
});


//trailer and classic code
const trailer = document.querySelector(".trailer");

function trlr() {
    window.location.href = API_TRAILER;
}

trailer.addEventListener("click", trlr);
