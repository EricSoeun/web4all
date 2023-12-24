// #region import
import axios from "axios";
import axiosJwt from "./axiosJwt";
import { baseURL } from "./api";
// #endregion import



// #region getAll
export function getAllCategories() {
  return axios.get(`${baseURL}api/categories/list`).then((res) => res.data);
}

export function getAllThemes() {
  return axios
    .get(`${baseURL}api/categories/themes/list`)
    .then((res) => res.data);
}

export function getAllModules() {
  return axios
    .get(`${baseURL}api/categories/modules/list`)
    .then((res) => res.data);
}

export function getAllGames() {
  return axios.get(`${baseURL}api/games/list`).then((res) => res.data);
}

export function getAllUsers() {
  return axios.get(`${baseURL}/api/users/list`).then((res) => res.data);
}

export function getLeaderboard() {
  return axios.get(`${baseURL}/api/users/rank`).then((res) => res.data);
}
// #endregion getAll

//#region getByID
export function getCategoryByID(id) {
  return axios
    .get(`${baseURL}/api/categories/find/${id}`)
    .then((res) => res.data);
}

export function getUserByID(id) {
  return axios.get(`${baseURL}/api/users/find/${id}`).then((res) => res.data);
}

export function getModulesInTheme(themeid) {
  return axios
    .get(`${baseURL}/api/categories/modules/find/${themeid}`)
    .then((res) => res.data);
}

export function getGameBySlug(slug) {
  return axios
    .get(`${baseURL}/api/games/find/${slug}`)
    .then((res) => res.data);
}

export function getGamesInModule(moduleid) {
  return axios
    .get(`${baseURL}/api/games/module/${moduleid}`)
    .then((res) => res.data);
}

export function getUserWithJwt() {
  return axiosJwt()
    .get(`${baseURL}/api/users/profile`)
    .then((res) => res.data);
}
//#endregion getByID
