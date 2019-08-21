

function verifyLoginComun() {
  let userIconElement = document.querySelector(".far.fa-user");
 let loginToken = localStorage.getItem("accessToken");
 let userElement = document.querySelector(".username");
  userElement.innerHTML = localStorage.getItem("user");
 let logoutBtn = document.querySelector(".logout-button");
 let loginBtn = document.querySelector(".login-button");
 let registerBtn = document.querySelector(".register-button");

 if(loginToken) {
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
     //let deleteEditBtn = document.querySelector(".movie-template-buttons");
     verifyLoginComun();
     if (loginToken) {
      addBtn.style.display = "inline-block";
      //deleteEditBtn.style.display = "block";
     } else {
      addBtn.style.display = "none";
      //deleteEditBtn.style.display = "none";
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
      }else {
        editBtn.style.display = "none";
        deleteBtn.style.display = "none";
      }
}
