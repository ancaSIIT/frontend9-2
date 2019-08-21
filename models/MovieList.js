class Movies {
  constructor(options = {}) {
    this.Title = options.Title;
    this.Year = options.Year;
    this.Runtime = options.Runtime;
    this.Genre = options.Genre;
    this.Plot = options.Plot;
    this.Language = options.Language;
    this.Poster = options.Poster;
    this.imdbRating = options.imdbRating;
  }
  baseUrl = "https://movies-api-siit.herokuapp.com";

  getMovies(skip = null) {
    return fetch(this.baseUrl + "/movies" + "?skip" + "=" + skip + "&take=10")
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

  add() {
    var data = {
      Title: this.Title,
      Year: this.Year,
      Runtime: this.Runtime,
      Genre: this.Genre,
      Plot: this.Plot,
      Language: this.Language,
      Poster: this.Poster,
      imdbRating: this.imdbRating
    };
    console.log(this);

    return fetch(baseUrl + "/movies", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(response => {
      return response.json();
    });
  };

  getMoviesByTitle(opts) {
    return fetch(this.baseUrl + "/movies" + "?take=10" + "&Title=" + opts.title)
      .then(response => {
        console.log("response", response);
        if (response.ok) {
          return response.json();
        }
        return new Error("A network error occurred", response.status);
      });
  }

  getMoviesWithFilters(filtersObj) {
    //make the obj to string

    let filtersInUrl = "";
    let urlToCall = this.baseUrl + "/movies";
    let filtersArr = [];
    if (filtersObj) {
      for (let key in filtersObj) {
        if (filtersObj.hasOwnProperty(key)) {
          filtersArr.push(key + '=' + filtersObj[key]);
        }
      };
      filtersInUrl += "?" + filtersArr.join('&');
      urlToCall += filtersInUrl;
    }
    return fetch(urlToCall)
      .then(response => {
        console.log("response", response);
        if (response.ok) {
          return response.json();
        }
        return new Error("A network error occurred", response.status);
      });
  }
}





