var baseUrl = "https://movies-api-siit.herokuapp.com";

class Movie {
  constructor (options = {}) {
    this.id = options.id;
  }
  get() {
    return fetch(`${baseUrl}/movies/${this.id}`)
     .then(response => {
       if (response.ok) {
        return response.json();
        }
        throw new Error("A network error occured", response.status);
      });
  };
}

function deleteMovieFromApi(movieId) {
  var url = baseUrl + "/movies/" + movieId;

  return fetch(url, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      "x-Auth-Token": "9WnI_tKZbrC8fDB8FbL5gfFPcJsE8M9n"
    }
  }).then(function (response) {
    return response.text();
  });
};
