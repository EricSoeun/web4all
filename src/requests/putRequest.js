// #region import
import axios from "axios";
import { baseURL } from "./api";
// #endregion import


function createQueryString(params) {
    let query = [];
    for (let key in params) {
        query.push(key + "=" + encodeURIComponent(params[key]));
    }
    return query.join("&");
}

export function leveling(loginData) {
    return axios
        .put(`${baseURL}/api/users/leveling`, createQueryString(loginData), {
            headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => res.data);
}
