

function verifyLoginComun() { 
 let loginToken = localStorage.getItem("accessToken");
 let userElement = document.querySelector(".username");
 let usernameElement = document.querySelector("username span")
  usernameElement.innerHTML = localStorage.getItem("user");
 let logoutBtn = document.querySelector(".logout-button");
 let loginBtn = document.querySelector(".login-button");
 let registerBtn = document.querySelector(".register-button");
 let deleteBtn = document.querySelector(".delete-button");
 if(loginToken) {
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
   deleteBtn.style.display = "inline-block";
   userElement.style.sidplay = "inline-block";
 } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    deleteBtn.style.display = "none";
    userElement = "none";
 }
}

function verifyLoginHome() {
     let loginToken = localStorage.getItem("accessToken");
     let addBtn = document.querySelector(".new-movie-button");
     verifyLoginComun();
     if (loginToken) {
      addBtn.style.display = "inline-block";
     } else {
      addBtn.style.display = "none";
     }
}

function verifyLoginDetails() {
      let loginToken = localStorage.getItem("accessToken");
      let editBtn = document.querySelector(".edit-button");
      verifyLoginComun();
      if (loginToken) {
        editBtn.style.display = "inline-block";
      }else {
        editBtn.style.display = "none";
      }
}