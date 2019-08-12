var baseUrl = "https://movies-api-siit.herokuapp.com"

function Movie(options = {}) {
  this.id = options.id;
}

Movie.prototype.get = function() {
  return fetch(`${baseUrl}/movies/${this.id}`).then(response => {
  console.log("response", response);
  if (response.ok) {
    return response.json();
  }
  throw new Error("A network error occured", response.status);
  });
};

Movie.prototype.getall = function() {
  return fetch(`${baseUrl}/movies`).then(response => {
  console.log("response", response);
  if (response.ok) {
    return response.json();
  }
  throw new Error("A network error occured", response.status);
  });
};

function deleteMovieFromApi(
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

function deleteMovieFromApi(movieId, titleValue) {
  var data = {
    Title: titleValue,
    Year: yearValue,
    Language: languageValue,
    Runtime: runtimeValue,
    Poster: posterValue,
    Genre: genreValue,
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
