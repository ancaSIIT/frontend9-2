
window.onload = function () {
  movies.getMovies(0)
    .then(function (movieList) {
      createPagination(movieList);
      createMovies(movieList);
    });
}

function showPage(pageNumber) {
  let skip = (pageNumber * 10) - 10;
  let pag = document.querySelector(".pagination")
  let paginationList = pag.querySelectorAll("button");
  movies.getMovies(skip)
    .then(function (movieList) {
      paginationList.forEach(page => {
        page.classList.remove("active");
        if (page.innerText == movieList.pagination.currentPage) {
          page.classList.add("active");
        }
      })
      createMovies(movieList);
    });
}

function createPagination(movieList) {
  let paginationList = document.querySelector(".pagination");
  paginationList.innerHTML = "";
  let arrayOfElements = [];
  for (let i = 1; i <= movieList.pagination.numberOfPages; i++) {
    let paginationTemplate;
    if (i == 1) {
      paginationTemplate = `<button class="active" onclick="showPage('${i}')">${i}</button>`
    } else {
      paginationTemplate = `<button onclick="showPage('${i}')">${i}</button>`
    }
    arrayOfElements.push(paginationTemplate);
  }
  var string = arrayOfElements.join("");
  paginationList.innerHTML = string;
}

function createMovies(movieList) {
  let movieArticle = document.getElementById("movie-article");
  movieArticle.innerHTML = "";
  let movieTemplate = document.getElementById("movie-template");
  movieList.results.forEach(movie => {

    clonedElement = movieTemplate.cloneNode(true);
    clonedElement.classList.add("movie-container", "container-shadow");

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
//addBtn.style.display = "none";

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
    for (let i = 0; i < inputValues.length; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("closeAddModalBtn").addEventListener("click", () => {
    modalElement.style.display = "none";
    for (let i = 0; i < inputValues.length; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("clearAddBtn").addEventListener("click", () => {
    for (let i = 0; i < inputValues.length; i++) {
      inputValues[i].value = "";
      inputValues[i].style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }
  });

  document.getElementById("saveAddBtn").addEventListener("click", () => {
    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i].value === "") {
        inputValues[i].style.border = "2px solid red";
      } else {
        inputValues[i].style.border = "1px solid black";
      }
    }

    if (isNaN(yearElement.value) || yearElement.value < 1900 || yearElement.value > 2020) {
      yearElement.style.border = "2px solid red";
      tooltipElement.style.visibility = "visible";
    } else {
      yearElement.style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }

    if (titleElement.value && runtimeElement.value && yearElement.value &&
      languageElement.value && plotElement.value && genreElement.value &&
      posterElement.value && imdbRatingElement.value && yearElement.value &&
      yearElement.value > 1900 && yearElement.value < 2021) {
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
      addNewMovie.add().then(data => {

        modalElement.style.display = "none";
        for (let i = 0; i < inputValues.length; i++) {
          inputValues[i].value = "";
        }
        movies.getMovies().then(data => {
          createMovies(data);
        });
      });

    }
  });
}

//Nu merge deoarece nu exista button de Logout pe home page, acesta trebuie creat dupa ce se face login si il inlocuieste
// const logoutHomeBtn = document.querySelector(".logout-button");
// logoutHomeBtn.addEventListener("click", logoutHome);

function logoutHome() {
  const logoutSession = new Auth();
  logoutSession.logout().then(data => {
    localStorage.removeItem("token");
    verifyLoginHome();
  })
}


let regenerateMovieButton = document.querySelector(".regenerate-button");
regenerateMovieButton.addEventListener("click", regenerate);

function regenerate() {
  movies.regenerateMovie()
    .then(function () {
      location.reload();
    });
}

//Login Button

document.querySelector(".login-button").addEventListener("click", function () {
  document.querySelector(".login-modal").style.display = "flex";
});

document.querySelector("#btnLogin").addEventListener("click", function (e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log(username, password);
  let auth = new Auth();
  auth.login(username, password).then(data => {
    console.log(data);
  })

});

document.querySelector(".login-close").addEventListener("click", function () {
  document.querySelector(".login-modal").style.display = "none";
  document.querySelector(".loginForm").reset();
});
document.querySelector(".message a").addEventListener("click", function () {
  document.querySelector(".reg-modal").style.display = "flex";
  document.querySelector(".login-modal").style.display = "none";
})

function validateLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username == null || username == "") {
    alert("Please enter the username.");
    return false;
  }
  if (password == null || password == "") {
    alert("Please enter the password.");
    return false;
  }
  alert("Login successful.");
}

//Register Button
document.querySelector(".register-button").addEventListener("click", function () {
  document.querySelector(".reg-modal").style.display = "flex";
});
document.querySelector(".reg-close").addEventListener("click", function () {
  document.querySelector(".reg-modal").style.display = "none";
});

document.querySelector(".messageb a").addEventListener("click", function () {
  document.querySelector(".login-modal").style.display = "flex";
  document.querySelector(".reg-modal").style.display = "none";
})



