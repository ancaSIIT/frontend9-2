let editButton = document.querySelector(".edit-button");
let editModal = document.querySelector(".modal-shadow");
let editClose = document.querySelector(".edit-close");
let saveButton = document.querySelector(".save-button");
let closeButton = document.querySelector(".close-button");

let title = document.querySelector(".title");
let plot = document.querySelector(".plot");
let year = document.querySelector(".year");
let language = document.querySelector(".language");
let runtime = document.querySelector(".runtime");
let poster = document.querySelector(".posterUrl");
let genre = document.querySelector(".genre");
let imdbRating = document.querySelector(".imdbRating");

let inputTitle = document.getElementsByTagName("input")[1];
let inputPlot = document.getElementsByTagName("input")[2];
let inputYear = document.getElementsByTagName("input")[3];
let inputLanguage = document.getElementsByTagName("input")[4];
let inputRuntime = document.getElementsByTagName("input")[5];
let inputPoster = document.getElementsByTagName("input")[6];
let inputGenre = document.getElementsByTagName("input")[7];
let inputImdbRating = document.getElementsByTagName("input")[8];

editButton.onclick = () => {
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

closeButton.onclick = () => {
  editModal.style.display = "none";
};

editClose.onclick = () => {
  editModal.style.display = "none";
};

var editData = new Movie({});

saveButton.onclick = data => {
  editData.Title = data.path[2].children[1].children[1].value;
  editData.Year = data.path[2].children[1].children[3].value;
  editData.Genre = data.path[2].children[1].children[5].value;
  editData.Runtime = data.path[2].children[1].children[7].value;
  editData.Plot = data.path[2].children[1].children[9].value;
  editData.Language = data.path[2].children[1].children[11].value;
  editData.Poster = data.path[2].children[1].children[13].value;
  editData.imdbRating = data.path[2].children[1].children[15].value;
  editData.id = movieId;

  editData.update(editData).then(data => {
    editModal.style.display = "none";
    location.reload(true);
  });
};
