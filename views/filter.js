

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", getResultsAll);
const searchInput = document.querySelector(".search-value");
searchInput.onkeyup = (event) => {
  if (event.keyCode === 13) {
    getResultsAll();
  }
};


function getResultsAll(){
  //front-end filter
  const searchInput = document.querySelector(".search-value");
  const searchInputVal = searchInput.value;
  let currentSearchFilters = getCurrentSearchFilters();
  if (Object.keys(currentSearchFilters).length) {
    movies.getMoviesWithFilters(currentSearchFilters).then(function (movieList){
      console.log(movieList);
      let newList = [];
      newList = movieList.results;
      createMovies(newList);
    })
  } else {
    movies.getAllMovies().then(function (movieList){
      console.log(movieList);
      let newList = [];
      newList = movieList.results.filter(item =>{
        const lowerCaseSearchInput = searchInputVal.toLowerCase();
        if (item.Title.toLowerCase().includes(lowerCaseSearchInput) ||
            item.Genre.toLowerCase().includes(lowerCaseSearchInput) ||
            item.Runtime.toLowerCase().includes(lowerCaseSearchInput) ||
            item.Year.toLowerCase().includes(lowerCaseSearchInput) ||
            item.Language.toLowerCase().includes(lowerCaseSearchInput) ||
            item.imdbRating.toLowerCase().includes(lowerCaseSearchInput) ||
            item.Country.toLowerCase().includes(lowerCaseSearchInput)) {
              return item;
            };
      });
      createMovies(newList);
    })
  }


}


