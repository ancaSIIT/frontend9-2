const baseUrlTemp = "https://movies-api-siit.herokuapp.com"; // make common base url

class Auth {
  constructor () {};

  login(username, password) {
    console.log("IN MODEL");
    let url = `${baseUrlTemp}/auth/login`;
    return fetch(url, {
      method: "POST"
    });

  }
}
