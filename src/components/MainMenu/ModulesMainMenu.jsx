// #region import
import React, { useState, useEffect } from "react";

import { getModulesInTheme } from "../../requests/getRequest";

import GamesMainMenu from "./GamesMainMenu";

import "../../style/mainMenu.css";

import { makeStyles } from "@mui/styles";

import ModulesList from "../GamesList/ModulesList";
// #endregion import

//-------------------------------------------------------------------------------------------------------------------------------
//  Ce component sera afficher dans la page MainMenu en mode toggled,
//  Elle affichera le component GameListToggle qui se chargera d'afficher tout le contenue des games/modules du theme séléctionner.
//-------------------------------------------------------------------------------------------------------------------------------
export default function ModulesMainMenu({ themeId }) {
  const [modulesData, setModulesData] = useState([]);

  useEffect(() => {
    getModulesInTheme(themeId).then((modules) => setModulesData(modules));
  }, [themeId]);

  const classes = useStyles();

  return (
    <article className={"main-menu-modules"}>
              <div className="main-menu-modules-inside">
                <ModulesList themeId={themeId} themeDescription={modulesData.description} />
              </div>
    </article>
  );
}

const useStyles = makeStyles({
  moduleContainer: {
    width: "100%",
    background: "lightBlue",
    display: "list-item"
  },
  
});
