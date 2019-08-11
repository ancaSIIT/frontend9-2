var movieId = getQueryValue("id");
console.log("Movie ID ", movieId);

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
  
function getQueryValue(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

