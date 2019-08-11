baseUrl = "https://movies-api-siit.herokuapp.com";

window.deleteMovieFromApi = function deleteMovieFromApi(
  movieId,
  authenticationToken
) {
  var url = baseUrl + "/movies/" + movieId;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": authenticationToken
    }
  }).then(function(response) {
    return response.text();
  });
};

window.editMovieFromApi = function deleteMovieFromApi(movieId, titleValue) {
  var data = {
    Title: titleValue
    Year: yearValue
    Language: languageValue
    Runtime: runtimeValue
    Poster: posterValue
    Genre: genreValue
    imdbRating: imdbRatingValue    
  };
  return fetch(this.baseUrl + "/movies/" + movieId, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "X-Auth-Token": authenticationToken
    }
  }).then(function(response) {
    return response.json();
  });
};
