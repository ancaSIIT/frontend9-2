

function verifyLoginComun() {
  let userIconElement = document.querySelector(".far.fa-user");
  let loginToken = localStorage.getItem("accessToken");
  let userElement = document.querySelector(".username");
  userElement.innerHTML = localStorage.getItem("user");
  let logoutBtn = document.querySelector(".logout-button");
  let loginBtn = document.querySelector(".login-button");
  let registerBtn = document.querySelector(".register-button");

  if (loginToken) {
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    userElement.style.display = "inline-block";
    userIconElement.style.display = "inline-block";

  } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    userElement.style.display = "none";
    userIconElement.style.display = "none";

  }
}

function verifyLoginHome() {
  let loginToken = localStorage.getItem("accessToken");
  let addBtn = document.querySelector(".new-movie-button");
  let deleteEditBtn = document.querySelectorAll(".movie-template-buttons");
  verifyLoginComun();
  for (let i = 0; i < deleteEditBtn.length; i++) {
    let button = deleteEditBtn[i];
    console.log('mouseover added');
    button.parentElement.addEventListener("mouseover", () => {
      if (loginToken) {
        button.style.display = "block";
        // addBtn.style.display = "inline-block";
      } else {
        button.style.display = "none";
      }
    })

    button.parentElement.addEventListener("mouseout", () => {
        button.style.display = "none";
    })
  }
  

   if (loginToken) {
    addBtn.style.display = "inline-block";
   } else {
    addBtn.style.display = "none";

   }
}


function verifyLoginDetails() {
  let loginToken = localStorage.getItem("accessToken");
  let deleteBtn = document.querySelector(".delete-button");
  let editBtn = document.querySelector(".edit-button");
  verifyLoginComun();
  if (loginToken) {
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  } else {
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
  }
}
