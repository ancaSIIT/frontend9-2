
baseUrl = "https://movies-api-siit.herokuapp.com";

  window.deleteMovieFromApi = function deleteMovieFromApi(movieId, authenticationToken) {
    var url = baseUrl + "/movies/" + movieId;
    
    return fetch(url, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "authenticationToken"
      }
    }).then(function(response) {
      return response.text();
    });
  };