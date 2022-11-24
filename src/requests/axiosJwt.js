import axios from "axios";

const prepareAxiosJwt = () => {
    const axiosJwt = axios.create({});
    if (localStorage.getItem("token")) {
        axiosJwt.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
    }
    return axiosJwt;
}

export default prepareAxiosJwt;
