// #region import
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "./App";

import "./index.css";
// #endregion import

axios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token) {
        token = `Bearer ${token}`;
        config.headers.Authorization = token;
    }
    return config;
});

ReactDOM.render(<App />, document.getElementById("root"));
