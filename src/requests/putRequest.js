// #region import
import axios from "axios";
// #endregion import

let serverUrl = "https://web4all-back.herokuapp.com/";
// serverUrl = "http://localhost:3000/";

function createQueryString(params) {
    let query = [];
    for (let key in params) {
        query.push(key + "=" + encodeURIComponent(params[key]));
    }
    return query.join("&");
}

export function leveling(loginData) {
    return axios
        .put(`${serverUrl}api/users/leveling`, createQueryString(loginData), {
            headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => res.data);
}
