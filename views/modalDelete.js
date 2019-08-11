var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var buttonYes = document.getElementsByClassName("buttonYes");

var buttonNo = document.getElementsByClassName("buttonNo")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

buttonYes.onclick = function deleteMovieFromApi(movieId, authenticationToken) {
  modal.style.display = "none";  
}

buttonNo.onclick = function () {
    modal.style.display = "none";  
  }
// When the user clicks anywhere outside of the modal, the pop-up remains
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "block";
  }
}