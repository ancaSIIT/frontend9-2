var baseUrl = "https://movies-api-siit.herokuapp.com";

class Movie {
  constructor(options = {}) {
    this.id = options.id;
  }
  get() {
    return fetch(`${baseUrl}/movies/${this.id}`).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("A network error occured", response.status);
    });
  }
}

Movie.prototype.update = function(data) {
  return fetch(`${baseUrl}/movies/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      "x-Auth-Token": localStorage.getItem("accessToken")
    }
  }).then(function(response) {
    return response.json();
  });
};

Movie.prototype.delete = function() {
  let url = `${baseUrl}/movies/${this.id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-Auth-Token": localStorage.getItem("accessToken")
    }
  }).then(function(response) {
    return response.text();
  });
};
