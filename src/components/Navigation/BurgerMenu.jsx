import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import LogoutIcon from '@mui/icons-material/Logout';

export default function BurgerMenu(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <List>
        {console.log("props.navLinks: ", props.navLinks)}

        {props.navLinks.map((link, index) => (
          <Link key={link.name} to={link.route}>
            <ListItem button>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />
      <List>
          <ListItem button key={"text"}>
            <ListItemIcon>
            <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary={props.logInOutText} />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer("right", true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        id="burgerButton"
        className={classes.burgerButton}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}

const useStyles = makeStyles({
  burgerButton: {
      display: "none",
    backgroundColor: "#0000001f",
  },

});
