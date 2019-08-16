let editButton = document.querySelector(".edit-button");
let editModal = document.querySelector(".modal-shadow");
let editClose = document.querySelector(".edit-close");
let saveButton = document.querySelector(".save-button");
let closeButton = document.querySelector(".close-button");

editButton.onclick = () => {
  let title = document.querySelector(".title").innerHTML;
  let plot = document.querySelector(".plot").innerHTML;
  let year = document.querySelector(".year").innerHTML;
  let language = document.querySelector(".language").innerHTML;
  let runtime = document.querySelector(".runtime").innerHTML;
  let poster = document.querySelector(".posterUrl").innerHTML;
  let genre = document.querySelector(".genre").innerHTML;
  let imdbRating = document.querySelector(".imdbRating").innerHTML;

  let inputTitle = document.getElementsByTagName("input")[1];
  let inputPlot = document.getElementsByTagName("input")[2];
  let inputYear = document.getElementsByTagName("input")[3];
  let inputLanguage = document.getElementsByTagName("input")[4];
  let inputRuntime = document.getElementsByTagName("input")[5];
  let inputPoster = document.getElementsByTagName("input")[6];
  let inputGenre = document.getElementsByTagName("input")[7];
  let inputImdbRating = document.getElementsByTagName("input")[8];

  inputTitle.setAttribute("value", title);
  inputPlot.setAttribute("value", plot);
  inputYear.setAttribute("value", year);
  inputLanguage.setAttribute("value", language);
  inputRuntime.setAttribute("value", runtime);
  inputPoster.setAttribute("value", poster);
  inputGenre.setAttribute("value", genre);
  inputImdbRating.setAttribute("value", imdbRating);

  editModal.style.display = "block";
};
closeButton.onclick = () => {
  editModal.style.display = "none";
};
editClose.onclick = () => {
  editModal.style.display = "none";
};
