class Movies {
  baseUrl = "https://movies-api-siit.herokuapp.com";

  getMovies() {
    return fetch(this.baseUrl + "/movies")
      .then(response => {
        return response.json();
      });
  }

  regenerateMovie() {
    let url = this.baseUrl + "/movies" + "/all";
    return fetch(url, {
      method: "POST"
    });
  };

}

var movies = new Movies();
