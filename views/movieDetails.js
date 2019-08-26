var movieId = getQueryValue("id");

const movie = new Movie({ id: movieId });
movie
  .get()
  .then(data => {
    displayMovieHtml(data);

    const editParam = getQueryValue("edit");
    if (editParam === "true") {
      openModal();
    }
  })
  .catch(error => {
    document.body.innerText = "Invalid post ID";
  });

verifyLoginDetails();

function getQueryValue(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

const displayMovieHtml = data => {
  let title = document.querySelector(".title");
  title.innerHTML = data.Title;

  let plot = document.querySelector(".plot");
  plot.innerHTML = data.Plot;

  let year = document.querySelector(".year");
  year.innerHTML = data.Year;

  let language = document.querySelector(".language");
  language.innerHTML = data.Language;

  let runtime = document.querySelector(".runtime");
  runtime.innerHTML = data.Runtime;

  let poster = document.querySelector(".posterUrl");
  poster.setAttribute("src", data.Poster);

  let genre = document.querySelector(".genre");
  genre.innerHTML = data.Genre;

  let imdbRating = document.querySelector(".imdbRating");
  imdbRating.innerHTML = data.imdbRating;
};

//Login Button

document.querySelector(".login-button").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "flex";
});

document.querySelector("#btnLogin").addEventListener("click", function(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let usernameElement = document.getElementById("username");
  let password = document.getElementById("password").value;
  let passwordElement = document.getElementById("password");
  let messageElement = document.querySelector(".loginValidateMessage");
  console.log(username, password);

  if (username == "") {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else {
    usernameElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (password == "") {
    passwordElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else {
    passwordElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (username && password) {
    let auth = new Auth();
    auth.login(username, password).then(data => {
      console.log(data);
      if (data.authenticated) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", username);
        document.querySelector(".login-modal").style.display = "none";
        verifyLoginDetails();
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        messageElement.style.display = "none";
      } else {
        messageElement.innerHTML = data.message;
        messageElement.style.display = "inline";
      }
    });
  }
});

document.querySelector(".login-close").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "none";
  document.querySelector(".loginForm").reset();
  document.querySelector(".loginValidateMessage").style.display = "none";
  document.getElementById("username").style.border = "1px solid black";
  document.getElementById("password").style.border = "1px solid black";
});
document.querySelector(".message a").addEventListener("click", function() {
  document.querySelector(".reg-modal").style.display = "flex";
  document.querySelector(".login-modal").style.display = "none";
  document.querySelector(".loginForm").reset();
  document.querySelector(".loginValidateMessage").style.display = "none";
  document.getElementById("username").style.border = "1px solid black";
  document.getElementById("password").style.border = "1px solid black";
});

//logout Button

const logoutDetailsBtn = document.querySelector(".logout-button");
logoutDetailsBtn.addEventListener("click", logoutDetails);

function logoutDetails() {
  const logoutSession = new Auth();
  logoutSession.logout().then(data => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    verifyLoginDetails();
  });
}

// register Button

document
  .querySelector(".register-button")
  .addEventListener("click", function() {
    document.querySelector(".reg-modal").style.display = "flex";
  });

const registerBtn = document.getElementById("btnRegister");
registerBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let username = document.getElementById("regUsername").value;
  let usernameElement = document.getElementById("regUsername");
  let password = document.getElementById("regPassword").value;
  let passwordElement = document.getElementById("regPassword");
  let messageElement = document.querySelector(".registerValidateMessage");
  console.log(username, password);

  if (username == "") {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else if (username.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else {
    usernameElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }
  if (password == "") {
    passwordElement.style.border = "2px solid red";
    messageElement.innerHTML = "Please fill all fields.";
    messageElement.style.display = "inline";
  } else if (password.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else if (username.length < 8) {
    usernameElement.style.border = "2px solid red";
    messageElement.innerHTML =
      "Username and password must have at least 8 characters.";
    messageElement.style.display = "inline";
  } else {
    passwordElement.style.border = "1px solid black";
    messageElement.style.display = "none";
  }

  if (username && password && username.length >= 8 && password.length >= 8) {
    let reg = new Auth();
    reg.register(username, password).then(data => {
      console.log(data);
      if (data.authenticated) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", username);
        document.querySelector(".reg-modal").style.display = "none";
        verifyLoginHome();
        document.querySelector(".reg-content form").reset();
        messageElement.style.display = "none";
      } else {
        messageElement.innerHTML = data.message;
        messageElement.style.display = "inline";
      }
    });
  }
});

document.querySelector(".reg-close").addEventListener("click", function() {
  document.querySelector(".reg-modal").style.display = "none";
  document.querySelector(".reg-content form").reset();
  document.querySelector(".registerValidateMessage").style.display = "none";
  document.getElementById("regUsername").style.border = "1px solid black";
  document.getElementById("regPassword").style.border = "1px solid black";
});

document.querySelector(".messageb a").addEventListener("click", function() {
  document.querySelector(".login-modal").style.display = "flex";
  document.querySelector(".reg-modal").style.display = "none";
  document.querySelector(".reg-content form").reset();
  document.querySelector(".registerValidateMessage").style.display = "none";
  document.getElementById("regUsername").style.border = "1px solid black";
  document.getElementById("regPassword").style.border = "1px solid black";
});
