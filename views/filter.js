

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-value");
const searchErrorMessage = document.getElementById("search-error-message")

searchInput.onkeyup = (event) => {
  let currentSearchFilters = getCurrentSearchFilters()
  if (searchInput.value ==="" & (!Object.keys(currentSearchFilters).length)){
    searchInput.style.backgroundColor = "red";
    searchErrorMessage.style.display = "inline-block";
  }
  getResultsAll();
  }

searchButton.addEventListener("click", function() {
  let currentSearchFilters = getCurrentSearchFilters()
  if (searchInput.value ==="" & (!Object.keys(currentSearchFilters).length)){
    searchInput.style.backgroundColor = "red";
    searchErrorMessage.style.display = "inline-block";
  }
  getResultsAll();
})

searchButton.addEventListener("focusout", function(){
  searchInput.style.backgroundColor = "black";
  searchErrorMessage.style.display = "none";

})
function getResultsAll(){
 
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
  }