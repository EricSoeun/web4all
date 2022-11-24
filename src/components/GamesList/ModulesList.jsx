// #region import
import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";

import { getModulesInTheme } from "../../requests/getRequest";

import SingleModule from "./SingleModule";

import "../../style/sidebar.css";
// #endregion import

export default function ModulesList({ themeId, themeDescription, openByDefault }) {

  const [modulesData, setModulesData] = useState([]);

  useEffect(() => {
    getModulesInTheme(themeId).then((modules) => setModulesData(modules));
  }, [themeId]);

  const classes = useStyles();

  return (
    <List
      className={classes.modulesListContainer}
      sx={{ width: "100%" }}
      component="nav"
      role="navigation"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="h4" id="nested-list-subheader">
          {themeDescription}
        </ListSubheader>
      }
    >
      {modulesData.map((value, index) => {
        return <SingleModule moduleName={value.name} key={index} moduleId={value._id} openByDefault={openByDefault} />;
      })}
    </List>
  );
}

const useStyles = makeStyles({
  modulesListContainer: {
    display: "list-item",
    maxWidth: "100%",
    background: "#fbfbfb",
    borderRadius: "1.75em",
  },

  singleModule: {
    display: "list-item",
  },
});
