//Buttons classes
let editButton = document.querySelector(".edit-button");
let editModal = document.querySelector(".modal-shadow");
let editClose = document.querySelector(".edit-close");
let saveButton = document.querySelector(".save-button");
let closeButton = document.querySelector(".close-button");
let resetForm = document.querySelector(".inputs-form");

//Details classes
let title = document.querySelector(".title");
let plot = document.querySelector(".plot");
let year = document.querySelector(".year");
let language = document.querySelector(".language");
let runtime = document.querySelector(".runtime");
let poster = document.querySelector(".posterUrl");
let genre = document.querySelector(".genre");
let imdbRating = document.querySelector(".imdbRating");

//Input classes
let inputTitle = document.querySelector(".title-input");
let inputPlot = document.querySelector(".plot-input");
let inputYear = document.querySelector(".year-input");
let inputLanguage = document.querySelector(".language-input");
let inputRuntime = document.querySelector(".runtime-input");
let inputPoster = document.querySelector(".poster-input");
let inputGenre = document.querySelector(".genre-input");
let inputImdbRating = document.querySelector(".rating-input");

//Open Edit Form
openModal = () => {
  inputTitle.setAttribute("value", title.innerHTML);
  inputPlot.setAttribute("value", plot.innerHTML);
  inputYear.setAttribute("value", year.innerHTML);
  inputLanguage.setAttribute("value", language.innerHTML);
  inputRuntime.setAttribute("value", runtime.innerHTML);
  inputPoster.setAttribute("value", poster.src);
  inputGenre.setAttribute("value", genre.innerHTML);
  inputImdbRating.setAttribute("value", imdbRating.innerHTML);

  editModal.style.display = "block";
};

//Open Edit Form
if (editButton) {
  editButton.onclick = openModal;

  //Close Edit Form
  closeButton.onclick = () => {
    resetForm.reset();
    editModal.style.display = "none";
  };

  //Close Edit Form from X
  editClose.onclick = () => {
    resetForm.reset();
    editModal.style.display = "none";
  };

  var editData = new Movie({});

  //Save Edit Form
  saveButton.onclick = () => {
    editData.Title = inputTitle.value;
    editData.Year = inputYear.value;
    editData.Genre = inputGenre.value;
    editData.Runtime = inputRuntime.value;
    editData.Plot = inputPlot.value;
    editData.Language = inputLanguage.value;
    editData.Poster = inputPoster.value;
    editData.imdbRating = inputImdbRating.value;
    editData.id = movieId;

    if (
      inputTitle.value &&
      inputYear.value &&
      inputGenre.value &&
      inputRuntime.value &&
      inputPlot.value &&
      inputLanguage.value &&
      inputPoster.value &&
      inputImdbRating.value
    ) {
      editData.update(editData).then(data => {
        displayMovieHtml(data);
        editModal.style.display = "none";
      });
    } else {
      console.log("Err: Edit Input/s Have Empty Field/s");
    }
  };
}
