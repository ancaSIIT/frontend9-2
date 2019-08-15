const baseUrl = "https://movies-api-siit.herokuapp.com";

class Movies {
  constructor (options = {}) {
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

  add() {
    var data = {
      Title: this.Title,
      Year: this.Year,
      Runtime: this.Runtime,
      Genre: this.Genre,
      Plot: this.Plot,
      Language:  this.Language,
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

   
        }
       

var movies = new Movies();
