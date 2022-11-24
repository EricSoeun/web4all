// #region import
import axios from "axios";
import axiosJwt from "./axiosJwt";
// #endregion import

let serverUrl = "https://web4all-back.herokuapp.com/";
    // serverUrl = "http://localhost:3000/";

// #region getAll
export function getAllCategories() {
  return axios.get(`${serverUrl}api/categories/list`).then((res) => res.data);
}

export function getAllThemes() {
  return axios
    .get(`${serverUrl}api/categories/themes/list`)
    .then((res) => res.data);
}

export function getAllModules() {
  return axios
    .get(`${serverUrl}api/categories/modules/list`)
    .then((res) => res.data);
}

export function getAllGames() {
  return axios.get(`${serverUrl}api/games/list`).then((res) => res.data);
}

export function getAllUsers() {
  return axios.get(`${serverUrl}api/users/list`).then((res) => res.data);
}

export function getLeaderboard() {
  return axios.get(`${serverUrl}api/users/rank`).then((res) => res.data);
}
// #endregion getAll

//#region getByID
export function getCategoryByID(id) {
  return axios
    .get(`${serverUrl}api/categories/find/${id}`)
    .then((res) => res.data);
}

export function getUserByID(id) {
  return axios.get(`${serverUrl}api/users/find/${id}`).then((res) => res.data);
}

export function getModulesInTheme(themeid) {
  return axios
    .get(`${serverUrl}api/categories/modules/find/${themeid}`)
    .then((res) => res.data);
}

export function getGameBySlug(slug) {
  return axios
    .get(`${serverUrl}api/games/find/${slug}`)
    .then((res) => res.data);
}

export function getGamesInModule(moduleid) {
  return axios
    .get(`${serverUrl}api/games/module/${moduleid}`)
    .then((res) => res.data);
}

export function getUserWithJwt() {
  return axiosJwt()
    .get(`${serverUrl}api/users/profile`)
    .then((res) => res.data);
}
//#endregion getByID
