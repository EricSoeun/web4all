// #region import
import axios from "axios";
// #endregion import

let serverUrl = "https://web4all-back.herokuapp.com/";
    // serverUrl = "http://localhost:3000/";

function createQueryString(params) {
  let query = [];
  for (let key in params) {
      query.push(key + '=' + encodeURIComponent(params[key]));
  }
  return query.join('&');
}

function createQueryStringGame(params) {
  let query = [];
  for (let key in params) {
    if (typeof params[key] === 'object') {
      query.push(key + '=' + JSON.stringify(params[key]));
    } else {
      query.push(key + '=' + encodeURIComponent(params[key]));
    }
  }
  return query.join('&');
}

export function postNewUser(data) {
  return axios
    .post(`${serverUrl}api/users/signin`, createQueryString(data) , {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => res.data);
}

export function login(loginData) {
  return axios
    .post(`${serverUrl}api/users/login`, createQueryString(loginData) , {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => res.data);
}

export function gameValidation(data) {
  return axios
    .post(`${serverUrl}api/games/validation`, createQueryStringGame(data) , {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then((res) => res.data);
}
