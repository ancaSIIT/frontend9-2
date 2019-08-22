

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
      createPagination(movieList)
    });
  }
  else if ((searchInputVal) & searchInputVal.length > 2 ){ 
    const queryParams = {};
    queryParams.title = document.querySelector(".search-value").value;
    movies.getMoviesByTitle(queryParams).then(function (movieList) {
    console.log(movieList);
    createMovies(movieList.results);
    createPagination(movieList);
  });
  } 
  else if (searchInputVal ==""){
    const messageEl = document.querySelector(".search-validate-message");
    searchInput.style.border = "2px solid red";
    messageEl.innerHTML = "Please input title";
    messageEl.style.display = "compact";
    }
    else {
    messageEl.style.display = "none";
    messageEl.innerHTML = "";
    searchInput.style.border = "none";
    }
  }



