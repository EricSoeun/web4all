// #region import
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import Register from "./pages/Register";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import NotFound from "./pages/NotFound";
import GamePage from "./pages/GamePage";
import LeaderBoard from "./pages/LeaderBoard";

import TopNavbar from "./components/Navigation/TopNavbar";

import { getUserWithJwt } from "./requests/getRequest";

import { AppContext } from "./AppContext";

import "./App.css";
import Footer from "./components/Footer/Footer";
// #endregion import

const theme = createTheme({

/*     typography : {
        "fontFamily":"\"Pixolletta8px\", sans-serif"
    } */
});

export default function App() {
    const [state, setState] = useState({
        user: {},
        setUser: (newUser) => {
            setState((state) => {
                return {...state, user: newUser}
            })
        },
        isLogged: false,
        setIsLogged: (value) => {
            setState((state) => {
                return {...state, isLogged: value}
            })
        },
        refreshStats: false,
        setRefreshStats: (value) => {
            setState((state) => {
                return {...state, refreshStats: value}
            })
        }
    });

        //Récupère le token jwt
        useEffect(() => {
            if(state.isLogged === true){
                if (localStorage.getItem("token")){
                    getUserWithJwt().then((user) => state.setUser(user));
                } else {
                    console.log("token not found")
                    state.setIsLogged(false);
                }
            } else if (localStorage.getItem("token")) {
                state.setIsLogged(true);
            } else {
                state.setUser({});
                console.log("aucun utilisateur connecté")
            }

        }, [state.isLogged]);

        useEffect(() => {
            if(state.refreshStats === true) {
                if(state.user !== {}){
                    if (localStorage.getItem("token")){
                        getUserWithJwt().then((user) => state.setUser(user));
                    }
                    state.setRefreshStats(false);
                }
            }
        }, [state.refreshStats])

        
    return (
        <AppContext.Provider value={state}>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <StyledEngineProvider injectFirst>
                        <BrowserRouter>
                            <header>
                                <TopNavbar />
                            </header>
                            <main className="page-container">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={MainMenu}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/game/:slug"
                                        component={GamePage}
                                    />
                                    <Route
                                        exact
                                        path="/leaderboard"
                                        component={LeaderBoard}
                                    />
                                    <Route component={NotFound} />
                                </Switch>
                            </main>
                            <Footer/>
                        </BrowserRouter>
                    </StyledEngineProvider>
                </ThemeProvider>
            </div>
        </AppContext.Provider>
    );
}
