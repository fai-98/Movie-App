const moviesURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";

const posterURL = "https://image.tmdb.org/t/p/w500";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=1ceba6e7e89a5257b3c318819850da51&query=";

const trendingURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=1ceba6e7e89a5257b3c318819850da51";

const hero = document.getElementById("hero");
const form = document.querySelector("form");
const query = document.querySelector("input");
const reviewsDiv = document.querySelector(".reviews");
const trending = document.getElementById("trending");
let reviewBtn;

// Showing movies in DOM
const showMoviesInDOM = (movies) => {
  reviewsDiv.style.height = "0px";
  hero.style.height = "auto";

  hero.innerHTML = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    div.classList.add("container");

    const {
      poster_path,
      title,
      release_date,
      vote_average,
      overview,
      id,
      name,
      first_air_date,
    } = movie;
    const data = `
    <div class="poster">
      <img src="${posterURL}${poster_path}" />

      <div class="title">
        <h3>${title ? title : name}</h3>
      </div>

    </div>
    <div class="info ">
      <h2>${title ? title : name}</h2>
      <p class="date"><strong>Releasing:</strong> ${
        release_date ? release_date : first_air_date
      }</p>
      <p class="vote"><strong>ImDB Rating:</strong> ${vote_average}</p>
      <p><strong>Overview:</strong> ${overview}</p>
      <button class="review-btn" data-movieId="${id}">Show Reviews</button>
    </div>
    `;
    div.innerHTML = data;
    hero.appendChild(div);
  });
  reviewBtn = document.querySelectorAll(".review-btn");
  fetchReviews(reviewBtn, movies);
};

getMovies(moviesURL);

// // Event listener
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if ((query.value !== null) & (query.value !== "")) {
//     getMovies(searchURL + `${query.value}`);
//   }

//   query.value = "";
// });

// Fetching Reviews by Movie ID
function fetchReviews(reviewBtns, movies) {
  reviewBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-movieId");
      let reviewsURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&page=1`;

      const res = await fetch(reviewsURL);
      const data = await res.json();

      const movie = movies.filter((movie) => movie.id === +id);

      showReviewsInDOM(data.results, movie[0]);
    });
  });
}
