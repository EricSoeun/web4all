// #region import
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { getGamesInModule } from "../../requests/getRequest";

// #endregion import

//-------------------------------------------------------------------------------------------------------------------------------
//  Affiche la page d'game avec le theme id de la catégorie séléctionner depuis la page d'accueil :
//-------------------------------------------------------------------------------------------------------------------------------
export default function GamesMainMenu({ moduleid }) {
  const classes = useStyles();
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    getGamesInModule(moduleid).then((game) =>
      setGameData(game)
    );
  }, [moduleid]);

  return (
    <ul className={classes.gamesList}>
      {gameData.map((value, index) => {
        return (
            <Link className={classes.singleGameLink} key={index} to={`/game/${value.slug}`}>{value.name}</Link>
        );
      })}
    </ul>
  );
}


const useStyles = makeStyles({
  gamesList: {
    background: "lightYellow",
    border: "3px solid black",
    "display": "flex",
    "flexDirection": "column"
  },

  singleGameLink: {
    background: "plum",
    border: "1px solid pink",
    padding: "5px 20px",
    textDecoration: "none",
  },
});
