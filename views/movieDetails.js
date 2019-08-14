//replace the hardcoded id with movieId
var movieId = getQueryValue("id");
console.log("Movie ID ", movieId);

const movie = new Movie({ id: movieId });
  movie.get().then(data => {
    console.log(data);
    displayMovieHtml(data)
  })
.catch(error => {
  document.body.innerText = "Invalid post ID";
  });

function getQueryValue(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
    for ( var i = 0; i < vars.length; i++ ) {
      var pair = vars[i].split("=");
          if( pair[0] === key ) {
          return pair[1];
           };
     };
   return(false);
};

const displayMovieHtml = data => {
  let title = document.querySelector(".title");
  title.innerHTML = data.Title;

  let plot = document.querySelector(".plot");
  plot.innerHTML= data.Plot;

  let year = document.querySelector(".year");
  year.innerHTML=data.Year;

  let language = document.querySelector(".language");
  language.innerHTML=data.Language;

  let runtime = document.querySelector(".runtime");
  runtime.innerHTML=data.Runtime;

  let poster = document.querySelector(".posterUrl");
  poster.setAttribute("src", data.Poster);

  let genre = document.querySelector(".genre");
  genre.innerHTML=data.Genre;

  let imdbRating = document.querySelector(".imdbRating");
  imdbRating.innerHTML=data.imdbRating;
}

// functia 'authentication' va returna un token de acces
// acel token de acces il folosim mai jos in functia deleteMovie
// presupunem ca tokenul este salvat in local storage

var authenticationToken = localStorage.getItem("token");

function deleteMovie(event) {
  console.log("delete event", event);
  var grandparentElement = event.target.parentElement.parentElement;
  var movieId = grandparentElement.id;

  deleteMovieFromApi(movieId, authenticationToken).then(function(data) {
    console.log("deleted", data);
    grandparentElement.style.display = "none";
  });
}


const logoutDetailsBtn = document.querySelector(".logout-button");
logoutDetailsBtn.addEventListener("click", logoutDetails);

function logoutDetails() {
   const logoutSession = new Auth();
   logoutSession.logout().then(data => {
     localStorage.removeItem("token");
     verifyLoginDetails()
   })
}