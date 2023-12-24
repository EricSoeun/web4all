// #region import
import axios from "axios";
import { baseURL, config } from "./api";
// #endregion import


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


function errorHandler(error) {
    if (error.response.data) {
        console.error(error)
        console.log(error.response && error.response.data);
        throw error;
    }
    throw error;
}



export function postNewUser(data) {

    return axios
      .post(`${baseURL}/api/users/signup`, data, { config })
        .then((res) => res.data)
        .catch(errorHandler);
}

export function login(loginData) {
    return axios
        .post(`${baseURL}/api/users/login`, loginData, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json'
            }
        })
        .then((res) => res.data)
        .catch((error) => {
            console.log("error from front", error);
        })
}

export function gameValidation(data) {
    return axios
        .post(`${baseURL}/api/games/validation`, data, {config})
        .then((res) => res.data)
        .catch((error) => {
            console.log("error from front", error);
        })
}



// export const postNewUser = async (newUser) => {

//     try {



//         // await axios.post(`${baseURL}/api/users/signup`, {data})
//         const { data } = await axios.post(
//             `${baseURL}/api/users/signup`,
//             newUser,
//             config
//         )

//         console.log(data)

//     } catch (error) {
//         console.log(error.response && error.response.data);
//     }
// }