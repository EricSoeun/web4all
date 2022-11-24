// #region import
import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import { getAllThemes } from "../requests/getRequest";

import CategoryCard from "../components/MainMenu/CategoryCard.jsx";
import ProfilCard from "../components/ProfilSidebar/ProfilCard.jsx";

import { AppContext } from "../AppContext";

import "../style/mainMenu.css";

import "animate.css";
// #endregion import

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  margin: 40,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MainMenu() {
  //liste des thèmes que l'on récuperera dans la BDD avec un useEffect
  const [themesData, setThemesData] = useState([]);

  //Booléen qui indique si le thème est déroulé ou non
  const [expandedState, setExpandedState] = useState([]);

  const context = useContext(AppContext);

  //Récupère les thèmes depuis la BDD
  useEffect(() => {
    getAllThemes().then((theme) => setThemesData(theme));
  }, []);

  useEffect(() => {
    console.log(context.user);
  }, [context]);

  //Après récupération des thèmes, on remplis le tableau d'expandedState avec des booléens false par défaut
  useEffect(() => {
    const expandedStateTemp = [];
    for (let index = 0; index < themesData.length; index++) {
      expandedStateTemp[index] = false;
    }
    setExpandedState(expandedStateTemp);
  }, [themesData]);

  //Controleur des listes déroulantes, si une liste est déroulée, toutes les autres se referment
  const expandController = (index) => {
    const expandedStateTemp = [...expandedState];

    for (let i = 0; i < expandedStateTemp.length; i++) {
      if (i === index) {
        expandedStateTemp[i] = !expandedStateTemp[i];
      } else {
        expandedStateTemp[i] = false;
      }
    }

    setExpandedState(expandedStateTemp);
  };

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} wrap={"wrap"}>
      <Grid container spacing={0}>
        <Grid item lg={3} md={3} xs={12} order={{ lg: 1, md: 1, xs: 3 }} sx={{border: "0px solid black"}}>
          <Item className="container3D">
            <img
              src="https://u.cubeupload.com/Sono/programming.png"
              width="160"
              height="auto"
              alt=""
            />
            <p className="welcomeMessage">
              Bienvenue sur Web4All ! Une plateforme pour apprendre et tester
              ses connaissances en language web sous forme de quizz et
              mini-jeux.
{/*               <br /><br />
              Nous pensons que le code est un outil de création formidable qui
              doit être ouvert au plus grand nombre. */}
              <br /><br />
              Saurez-vous venir à bout de tous nos challenges pour vous hisser
              parmi les meilleurs ?
            </p>
          </Item>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          order={{ lg: 2, md: 2, xs: 1 }}
          className={classes.mainMenu}
          sx={{border: "0px solid black"}}
        >
          <section className={classes.cardsContainer}>
            {themesData.map((theme, index) => {
              return (
                <CategoryCard
                  expandController={() => expandController(index)}
                  isExpanded={expandedState[index]}
                  data={theme}
                  key={index}
                  index={index}
                />
              );
            })}
          </section>
        </Grid>

        <Grid
          className={classes.profilSidebar}
          item
          lg={3}
          md={3}
          xs={12}
          order={{ lg: 3, md: 3, xs: 2 }}
          sx={{border: "0px solid black"}}
        >
          <ProfilCard />
        </Grid>
      </Grid>
    </Box>
  );
}

const useStyles = makeStyles({
  mainMenu: {
/*     display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center", */
/*     minHeight: "93vh", */
  },

  cardsContainer: {
    display:"flex",
    flexDirection:"column",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100%",
    padding: "5rem 1rem",
  },

  profilSidebar: {
    padding: "4.5rem 0",
    display: "flex",
    justifyContent: "center",
  },
});
