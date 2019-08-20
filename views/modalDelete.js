let modal = document.getElementById("myModal");
let btn = document.querySelector(".delete-button");
let span = document.getElementsByClassName("close")[0];

let buttonYes = document.querySelector(".button-yes");
buttonYes.addEventListener("click", deleteMovie);

let buttonNo = document.getElementsByClassName("button-no")[0];

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
