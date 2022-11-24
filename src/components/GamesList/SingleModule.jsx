// #region import
import React, { useState } from 'react';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

import GamesList from "./GamesList";
// #endregion import

export default function SingleModule(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(props.openByDefault);
  const [moduleId, setmoduleId] = useState(props.moduleId);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <ul className={classes.singleModule} role="menu">
      <ListItemButton onClick={handleClick} className={classes.moduleLink}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={props.moduleName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={"auto"}>
        <List>
          <ListItemButton sx={{ p:0 }} className={classes.gamesList}>
            <GamesList moduleid={moduleId} />
          </ListItemButton>
        </List>
      </Collapse>
      </ul>
  );
}

const useStyles = makeStyles({
  modulesListContainer: {
    display: "list-item",
    maxWidth: "100%",
    background: "pink",
  },

  singleModule: {
    display: "list-item",
},
    
    moduleLink: {
  },
});
