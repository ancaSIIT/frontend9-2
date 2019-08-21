const baseUrlTemp = "https://movies-api-siit.herokuapp.com"; // make common base url

class Auth {
  constructor () {};
  

  login(username, password) {
    console.log("IN MODEL");
    let url = `${baseUrlTemp}/auth/login`;
    let data = {
      username : username,
      password: password
     };
     console.log(this);
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    console.log(response);
  }

  logout() {
    return fetch(baseUrlTemp + "/auth/logout", {
      method: "GET",
      headers: {
       "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(response => response.json());
  }

  register(username, password) {
    let data = {
      username: username,
      password: password
    };

    return fetch(baseUrlTemp + "/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    console.log(response);
  }
}
