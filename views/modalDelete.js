var modal = document.getElementById("myModal");

var btn = document.querySelector(".delete-button");

var span = document.getElementsByClassName("close")[0];

var buttonYes = document.querySelector(".button-yes");
buttonYes.addEventListener("click", deleteMovie);

var buttonNo = document.getElementsByClassName("button-no")[0];

btn.onclick = () => {
  modal.style.display = "block";
}

span.onclick = () => {
  modal.style.display = "none";
}

buttonYes.onclick = () => {
  modal.style.display = "none";
}

buttonNo.onclick = () => {
  modal.style.display = "none";
}

function deleteMovie() {
  deleteMovieFromApi(movieId).then(data => {
    console.log("deleted", data);
    location.assign("home.html");
  });
}
