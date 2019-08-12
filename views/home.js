

movies.getMovies()
  .then(function (movieList) {
    console.log(movieList);
    createMovies(movieList);
  });

function createMovies(movieList) {
  let movieArticle = document.getElementById("movie-article");
  movieArticle.innerHTML = "";
  let movieTemplate = document.getElementById("movie-template");
  movieList.results.forEach(movie => {
    clonedElement = movieTemplate.cloneNode(true);
    clonedElement.classList.add("movie-container","container-shadow");

    let linkedElement = clonedElement.querySelector("a");
    linkedElement.href = "movieDetails.html?id=" + movie._id;

    let titleElement = clonedElement.querySelector(".movie-title");
    titleElement.innerText = movie.Title;
    clonedElement.id = movie._id;

    clonedElement.style.backgroundImage = `url(${movie.Poster})`;
    movieArticle.insertBefore(clonedElement, movieArticle.childNodes[0]);
  });
}

const addBtn = document.querySelector(".new-movie-button");
addBtn.addEventListener("click", addMovie);

function addMovie() {
  const modalElement = document.getElementById("addModal");
  modalElement.style.display = "block";
  const formContentElement = document.querySelector(".form-content");
  let inputValues = formContentElement.getElementsByClassName("input");
  const yearElement = document.querySelector(".input.year");
  const titleElement = document.querySelector(".input.title");
  const runtimeElement = document.querySelector(".input.runtime");;
  const genreElement = document.querySelector(".input.genre");
  const plotElement = document.querySelector(".input.plot");
  const languageElement = document.querySelector(".input.language");
  const posterElement = document.querySelector(".input.poster");
  const imdbRatingElement = document.querySelector(".input.imdbRating");
  const tooltipElement = document.querySelector(".tooltiptext");



  document.getElementById("cancelAddBtn").addEventListener("click", () => {
    modalElement.style.display = "none";
    for(let i=0; i< inputValues.length ; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("closeAddModalBtn").addEventListener("click", () =>  {
    modalElement.style.display = "none";
    for(let i=0; i < inputValues.length ; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("clearAddBtn").addEventListener("click", () => {
    for(let i=0; i< inputValues.length ; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("saveAddBtn").addEventListener("click", () => {
        for (let i=0; i < inputValues.length; i++) {
          if (inputValues[i].value === "") {
            inputValues[i].style.border = "2px solid red";
        } else {
              inputValues[i].style.border = "1px solid black";
        }
       }

     if ( isNaN(yearElement.value) || yearElement.value < 1900 || yearElement.value > 2020) {
       yearElement.style.border = "2px solid red";
       tooltipElement.style.visibility = "visible";
        } else {
      yearElement.style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
       }

       if (titleElement.value && runtimeElement.value  &&  yearElement.value  &&
         languageElement.value   &&  plotElement.value  && genreElement.value  &&
         posterElement.value  && imdbRatingElement.value && yearElement.value &&
          yearElement.value > 1900 && yearElement.value < 2021)  {
           var addNewMovie = new Movies({
             Title: titleElement.value,
             Year: yearElement.value,
             Genre: genreElement.value,
             Runtime: runtimeElement.value,
             Plot: plotElement.value,
             Language: languageElement.value,
             Poster: posterElement.value,
             imdbRating: imdbRatingElement.value
           });
          addNewMovie.addMovie().then(data => {

          modalElement.style.display = "none";
          for(let i=0; i< inputValues.length ; i++) {
            inputValues[i].value = "";
          }
          movies.getMovies().then(data => {
          createMovies(data);
        });
       });

      }
});
}

  let regenerateMovieButton = document.querySelector(".regenerate-button");
  regenerateMovieButton.addEventListener("click", regenerate);

function regenerate() {
<<<<<<< HEAD
 movies.regenerateMovie()
    .then(function () {
      location.reload();
    })
}
=======
    movies.regenerateMovie()
       .then(function () {
          location.reload();
    });
}
//  movies.regenerateMovie()
//     .then(function () {
//       location.reload();
//     })


document.querySelector(".login-button").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "flex";
});

document.querySelector("#btnLogin").addEventListener("click", function(e) {
    e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log(username, password);
  let auth = new Auth();
  auth.login(username, password);

});

document.querySelector('.login-close').addEventListener('click', function() {
  document.querySelector('.login-modal').style.display = 'none';
});
>>>>>>> def37ce5a9af0acc8cd1f3a05b8e50a8f2a03eb4
