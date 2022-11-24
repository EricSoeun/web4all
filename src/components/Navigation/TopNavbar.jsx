// #region import
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Toolbar /* Avatar */ } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/navbar.css";
import BurgerMenu from "./BurgerMenu";
// #endregion import

export default function TopNavbar() {
  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();

  const [logState, setLogState] = useState("");

  useEffect(() => {
    if (context.isLogged) {
      setLogState(<FontAwesomeIcon icon={faUserSlash} />);
    } else {
      setLogState(<FontAwesomeIcon icon={faRightToBracket} />);
    }
  }, [context.user, context.isLogged]);


  const logInOut = () => {
    if (context.isLogged) {
      localStorage.removeItem("token");
      context.setIsLogged(false);
      console.log("remove token");
      history.push("/");
    } else {
      history.push("/login");
      console.log("redirection");
    }
  };

  function logText() {
    if (context.isLogged) {
      return "Se déconnecter";
    } else {
      return "Se connecter";
    }
  }

  const navLinks = [
    {
      name: "Tous les jeux",
      route: "/",
      icon: "👾",
    },
    {
      name: "Classement",
      route: "/leaderboard",
      icon: "🥇",
    },
    {
      name: "Challenges ",
      route: "/challenges",
      icon: "💪",
    },
  ];

  /* Fonction map qui renvoie la liste des liens de navigation */
  const navLinksRender = navLinks.map((link, index) => {
    return (
      <Link key={index} to={link.route} className={classes.link}>
        {link.name} {link.icon}
      </Link>
    );
  });

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Link to="/">
          <img
            src="https://u.cubeupload.com/Sono/LogoW4AV1h35.png"
            alt="Web4All"
            className={classes.logo}
          />
        </Link>
        <nav className="navLinksFrame">
          <ul className="navLinks">
            {navLinksRender}
            <button className="logInOutButton" onClick={logInOut}>
            {logState} {logText()}
          </button>
          </ul>

          {/* Le bouton burger qui apparait sur la version mobile */}
          <BurgerMenu navLinks={navLinks} logInOutText={logText()}/>

        </nav>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },

  navbar: {
    background: "#6a5faa",
    padding: "0 2.70rem",
  },

  link: {
    /*     margin: 0,
    padding: 0, */
    textDecoration: "none",
    color: "#FCFCFC",
    fontSize: "20px",
    marginLeft: 20,
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
});
