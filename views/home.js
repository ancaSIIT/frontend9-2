movies.getMovies()
  .then(function (movieList) {
    createMovies(movieList);
  });

function createMovies(movieList) {
  let movieArticle = document.getElementById("movie-article");
  let movieTemplate = document.getElementById("movie-template");
  movieList.results.forEach(movie => {
    clonedElement = movieTemplate.cloneNode(true);
    clonedElement.classList.add("movie-container","container-shadow");

    let titleElement = clonedElement.querySelector(".movie-title");
    titleElement.innerText = movie.Title;
    clonedElement.id = movie._id;

    clonedElement.style.backgroundImage = `url(${movie.Poster})`;
    movieArticle.insertBefore(clonedElement, movieArticle.childNodes[0]);
  });
}

let regenerateMovieButton = document.querySelector(".regenerate-button");
regenerateMovieButton.addEventListener("click", regenerate);

function regenerate() {
 movies.regenerateMovie()
    .then(function () {
      location.reload();
    })
}