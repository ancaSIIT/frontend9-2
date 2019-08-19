
function getCurrentSearchFilters() {
  let currentSearchFilters = {};

  let genreRadios = document.getElementsByName('genre');
  for (let radio of genreRadios) {
      if (radio.checked && radio.value !== 'All') {
          currentSearchFilters.Genre = radio.value;
      }
  }

  let languageRadios = document.getElementsByName('language');
  for (let radio of languageRadios) {
      if (radio.checked && radio.value !== 'All') {
          currentSearchFilters.Language = radio.value;
      }
  }
  let yearRadios = document.getElementsByName('year');
  for (let radio of yearRadios) {
      if (radio.checked && radio.value !== 'All') {
          currentSearchFilters.Year = radio.value;
      }
  }

  let countryRadios = document.getElementsByName('country');
  for (let radio of countryRadios) {
      if (radio.checked &&  radio.value !== 'All') {
          currentSearchFilters.Country = radio.value;
      }
  }
  const searchInput = document.querySelector(".search-value");
  const searchInputVal = searchInput.value;
  currentSearchFilters.Title = searchInputVal;
  console.log(searchInputVal);
  console.log(currentSearchFilters);
  
  return currentSearchFilters;
}
