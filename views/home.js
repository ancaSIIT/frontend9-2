var movies = new Movies();
window.onload = function() {
  getAndDisplayMovies();
};

function getAndDisplayMovies() {
  movies.getMovies(0).then(function(movieList) {
    createPagination(movieList);
    createMovies(movieList.results);
  });
}

function showPage(pageNumber) {
  let skip = pageNumber * 10 - 10;
  let pag = document.querySelector(".pagination");
  let paginationList = pag.querySelectorAll("button");
  movies.getMovies(skip).then(function(movieList) {
    paginationList.forEach(page => {
      page.classList.remove("active");
      if (page.innerText == movieList.pagination.currentPage) {
        page.classList.add("active");
      }
    });
    createMovies(movieList.results);
  });
}

function createPagination(movieList) {
  let paginationList = document.querySelector(".pagination");
  paginationList.innerHTML = "";
  let arrayOfElements = [];
  for (let i = 1; i <= movieList.pagination.numberOfPages; i++) {
    let paginationTemplate;
    if (i == 1) {
      paginationTemplate = `<button class="active" onclick="showPage('${i}')">${i}</button>`;
    } else {
      paginationTemplate = `<button onclick="showPage('${i}')">${i}</button>`;
    }
    arrayOfElements.push(paginationTemplate);
  }
  var string = arrayOfElements.join("");
  paginationList.innerHTML = string;
}

function createMovies(movieList) {
  if (!movieList.length) {
    let movieArticle = document.getElementById("movie-article");
    movieArticle.innerHTML =
      "There are no results for this search. Please try a new search with a different keyword or filter.";
    return;
  }
  let movieArticle = document.getElementById("movie-article");
  movieArticle.innerHTML = "";
  let movieTemplate = document.getElementById("movie-template");
  movieList.forEach(movie => {
    clonedElement = movieTemplate.cloneNode(true);
    clonedElement.classList.add("movie-container", "container-shadow");

    let linkedElement = clonedElement.querySelector("a");
    linkedElement.href = "movieDetails.html?id=" + movie._id;

    let homepageEditElement = clonedElement.querySelector(".homepage-editbtn");
    homepageEditElement.addEventListener("click", function() {
      location.assign("movieDetails.html?id=" + movie._id + "&edit=true");
    });

    let titleElement = clonedElement.querySelector(".movie-title");
    titleElement.innerText = movie.Title;
    clonedElement.id = movie._id;

    const movieModel = new Movie({ id: movie._id });
    let deleteButton = clonedElement.querySelector(".delete-button-homepage");
    deleteButton.addEventListener("click", function() {
      movieModel.delete().then(() => {
        getAndDisplayMovies();
      });
    });

    clonedElement.style.backgroundImage = `url(${movie.Poster})`;
    movieArticle.insertBefore(clonedElement, movieArticle.childNodes[0]);
  });

  verifyLoginHome();
}

//add button

const addBtn = document.querySelector(".new-movie-button");
addBtn.addEventListener("click", addMovie);

function addMovie() {
  const modalElement = document.getElementById("addModal");
  modalElement.style.display = "block";
  const formContentElement = document.querySelector(".form-content");
  let inputValues = formContentElement.getElementsByClassName("input");
  const yearElement = document.querySelector(".input.year");
  const titleElement = document.querySelector(".input.title");
  const runtimeElement = document.querySelector(".input.runtime");
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

    if (
      isNaN(yearElement.value) ||
      yearElement.value < 1900 ||
      yearElement.value > 2020
    ) {
      yearElement.style.border = "2px solid red";
      tooltipElement.style.visibility = "visible";
    } else {
      yearElement.style.border = "1px solid black";
      tooltipElement.style.visibility = "hidden";
    }

    if (
      titleElement.value &&
      runtimeElement.value &&
      yearElement.value &&
      languageElement.value &&
      plotElement.value &&
      genreElement.value &&
      posterElement.value &&
      imdbRatingElement.value &&
      yearElement.value &&
      yearElement.value > 1900 &&
      yearElement.value < 2021
    ) {
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
           };
           getAndDisplayMovies();
      });
    }
  });
}

//logout button

const logoutHomeBtn = document.querySelector(".logout-button");
logoutHomeBtn.addEventListener("click", logoutHome);

function logoutHome() {
  const logoutSession = new Auth();
  logoutSession.logout().then(data => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    verifyLoginHome();
  });
}

let regenerateMovieButton = document.querySelector(".regenerate-button");
regenerateMovieButton.addEventListener("click", regenerate);

function regenerate() {
  movies.regenerateMovie().then(function() {
    location.reload();
  });
}

//Login Button

document.querySelector(".login-button").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "flex";
});

document.querySelector("#btnLogin").addEventListener("click", function(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let usernameElement = document.getElementById("username");
  let password = document.getElementById("password").value;
  let passwordElement = document.getElementById("password");
  let messageElement = document.querySelector(".loginValidateMessage");
  console.log(username, password);

  if (username == "") {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else {
    usernameElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (password == "") {
    passwordElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else {
    passwordElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (username && password) {
    let auth = new Auth();
    auth.login(username, password).then(data => {
      console.log(data);
      if (data.authenticated) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", username);
        document.querySelector(".login-modal").style.display = "none";
        verifyLoginHome();
        document.querySelector(".loginForm").reset();
        messageElement.style.display = "none";
      } else {
        messageElement.innerHTML = data.message;
        messageElement.style.display = "inline";
      }
    });
  }
});

document.querySelector(".login-close").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "none";
  document.querySelector(".loginForm").reset();
  document.querySelector(".loginValidateMessage").style.display = "none";
  document.getElementById("username").style.border = "1px solid black";
  document.getElementById("password").style.border = "1px solid black";
});
document.querySelector(".message a").addEventListener("click", function() {
  document.querySelector(".reg-modal").style.display = "flex";
  document.querySelector(".login-modal").style.display = "none";
  document.querySelector(".loginForm").reset();
  document.querySelector(".loginValidateMessage").style.display = "none";
  document.getElementById("username").style.border = "1px solid black";
  document.getElementById("password").style.border = "1px solid black";
});

//Register Button

document
  .querySelector(".register-button")
  .addEventListener("click", function() {
    document.querySelector(".reg-modal").style.display = "flex";
  });

const registerBtn = document.getElementById("btnRegister");
registerBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let username = document.getElementById("regUsername").value;
  let usernameElement = document.getElementById("regUsername");
  let password = document.getElementById("regPassword").value;
  let passwordElement = document.getElementById("regPassword");
  let messageElement = document.querySelector(".registerValidateMessage");
  console.log(username, password);

  if (username == "") {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else if (username.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else {
    usernameElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (password == "") {
    passwordElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else if (password.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else if (username.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else {
    passwordElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }

  if (username && password && username.length >= 8 && password.length >= 8) {
    let reg = new Auth();
    reg.register(username, password).then(data => {
      console.log(data);
      if (data.authenticated) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", username);
        document.querySelector(".reg-modal").style.display = "none";
        verifyLoginHome();
        document.querySelector(".reg-content form").reset();
        messageElement.style.display = "none";
      } else {
        messageElement.innerHTML = data.message;
        messageElement.style.display = "inline";
      }
    });
  }
});

document.querySelector(".reg-close").addEventListener("click", function() {
  document.querySelector(".reg-modal").style.display = "none";
  document.querySelector(".reg-content form").reset();
  document.querySelector(".registerValidateMessage").style.display = "none";
  document.getElementById("regUsername").style.border = "1px solid black";
  document.getElementById("regPassword").style.border = "1px solid black";
});

document.querySelector(".messageb a").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "flex";
  document.querySelector(".reg-modal").style.display = "none";
  document.querySelector(".reg-content form").reset();
  document.querySelector(".registerValidateMessage").style.display = "none";
  document.getElementById("regUsername").style.border = "1px solid black";
  document.getElementById("regPassword").style.border = "1px solid black";
});

//reset button


let resetFiltersButton = document.querySelector(".reset-button");
resetFiltersButton.addEventListener("click", resetFilter);

function resetFilter() {
  var genreEl = document.getElementsByName("genre");
  for(let i=0;i<genreEl.length;i++)
  genreEl[0].checked = true;

  let languageEl = document.getElementsByName("language");
  for(let i=0;i<languageEl.length;i++)
  languageEl[0].checked = true;

  let yearEl = document.getElementsByName("year");
  for(let i=0;i<yearEl.length;i++)
  yearEl[0].checked = true;

  let countryEl = document.getElementsByName("country");
  for(let i=0;i<countryEl.length;i++)
  countryEl[0].checked = true;

  document.querySelector(".search-value").value =""
  getAndDisplayMovies();

}
