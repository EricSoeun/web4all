import React, { useContext, useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { getLeaderboard } from "../requests/getRequest";

import { makeStyles } from "@mui/styles";
import { height } from "@mui/system";

import { AppContext } from "../AppContext";

export default function LeaderBoard() {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);

  const context = useContext(AppContext);

  //Effect utilisé pour récupérer la liste des utilisateurs "Username, TotalPoints" :
  useEffect(() => {
    getLeaderboard().then((users) => {
      setUserData(users);
    });
  }, []);

  //Couleur background pour leaderboard item :
  const setAvatarColor = (index) => {
    switch (index) {
      case 0:
        return "rgba(255, 199, 0, 0.8)";
      case 1:
        return "rgba(0, 199, 255, 0.8)";
      case 2:
        return "rgba(125, 94, 200, 0.8)";
      default:
        return "rgba(58, 58, 58, 0.8)";
    }
  };

  return (
    <section className={classes.containerStyle}>
      <img className="animate__animated animate__backInDown" src="https://u.cubeupload.com/Sono/crown2.png" alt="Couronne du numéro 1" id="leader-crown"/>
      <List
        className="profilSidebarCard leaderboard-frame animate__animated animate__backInUp"
/*         className="profilSidebarCard animate__animated animate__fadeInDown" */
        sx={{ width: "100%", maxWidth: 500}}
      >
        {userData.length > 0 &&
          userData.map((data, index) => {
            const test = data.username === context.user.username ? "solid 4px white" : "";
            return (
              <ListItem
                style={{
                  background: setAvatarColor(index),
                  borderRadius: "8px",
                  marginBottom: "10px",
                  border: test
                }}
                key={index}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    style={{ background: "rgba( 255, 255, 255, 0.25 )" }}
                    alt={data.username.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText>
                  <section className={classes.containerUserDataStyle}>
                    <Typography
                      className={classes.UserDataUsernameStyle}
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {data.username}
                    </Typography>
                    <Typography
                      className={classes.UserDataIndexStyle}
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      #{index + 1}
                    </Typography>
                  </section>

                  <Typography
                    className={classes.UserDataScoreStyle}
                    variant="p"
                  >
                    {`Score total : ${data.totalPoints}`}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
      </List>
    </section>
  );
}

const useStyles = makeStyles({
  containerStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    height: "100%",
    padding: "3rem",
  },
  boxListStyle: {
    display: "flex",
    flexDirection: "column",
    background: "rgba( 0, 0, 0, 0.3 )",
    boxShadow: "0 0px 32px 0 rgba( 255, 255, 255, .8 )",
    backdropFilter: "blur( 5px )",
    webkitBackdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    padding: "20px",
    maxHeight: "600px",
    overflow: "auto",

    //Mozilla :
    scrollbarColor: "rgba( 0, 0, 0, 0.3) rgba( 0, 0, 0, 0.1)",
    scrollbarWidth: "thin",

    //Chrome :
    "&::-webkit-scrollbar": {
      width: "10px",
      color: "white",
      background: "rgba( 0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      height: "5px",
      width: "5px",
      background: "rgba( 0, 0, 0, 0.3)",
      borderRadius: "10px",
    },
    color: "white",
  },
  containerUserDataStyle: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  UserDataUsernameStyle: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
  },
  UserDataScoreStyle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  UserDataIndexStyle: {
    fontWeight: "bold",
    fontSize: "25px",
    color: "white",
  },
});
