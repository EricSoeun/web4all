// #region import
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import { getGameBySlug, getCategoryByID } from "../requests/getRequest";
import { gameValidation } from "../requests/postRequest";
import { leveling } from "../requests/putRequest";

import GameContent from "../components/GamesContent/GameContent";
import ProfilCard from "../components/ProfilSidebar/ProfilCard";
import Sidebar from "../components/GamesList/Sidebar";

import { AppContext } from "../AppContext";

import "animate.css";

import "../style/gamePage.css";
// #endregion import

export default function GamePage() {
  //récupère le slug dans l'url pour afficher le jeu correspondant
  let { slug } = useParams();

  const context = useContext(AppContext);

  //données lié au jeu en cours, au thème en cours, et à la liste des modules de ce thème
  const [gameData, setGameData] = useState({});
  const [moduleData, setModuleData] = useState({});
  const [themeData, setThemeData] = useState({});


  // Future feature de jeu suivant/précédent
  const [previousGame, setPreviousGame] = useState({});
  const [nextGame, setNextGame] = useState({});

  const [finalAnswers, setFinalAnswers] = useState([]);
  const [disableSend, setDisableSend] = useState(true);

  const [feedbackAnswers, setFeedBackAnswers] = useState([]);

  const [disableAnswerChange, setDisableAnswerChange] = useState(false);

  const [gameNotification, setGameNotification] = useState("");

//   console.log('gameNotification: ', gameNotification);

  function displayNotification() {
      if (gameNotification) {
          return "block"
      } else {
          return "none"
      }
  }
  



  //Est appelé dès réception des props
  useEffect(() => {
    //on reset les states au changement d'un jeu
    setFinalAnswers([]);
    setDisableSend(true);
    setDisableAnswerChange(false);
    setFeedBackAnswers([]);
    setGameNotification("");

    console.log(slug);

    //on récupère le jeu lié au slug dans l'url
    getGameBySlug(slug).then((game) => {
      setGameData(game);

      //on vérifie si on a pas déjà récupéré le module parent
      if (Object.keys(moduleData).length === 0) {
        //on récupère le module parent du jeu en cours
        getCategoryByID(game.parentModule).then((parentModule) => {
          setModuleData(parentModule);

          //on récupère le thème parent
          getCategoryByID(parentModule.parentTheme).then((parentTheme) => {
            setThemeData(parentTheme);
          });
        });
      }
    });
  }, [slug]);

  const classes = useStyles();

  useEffect(() => {
    if (gameData.gameContent) {
      //on compare le nombre de questions posées, au nombre de réponses choisies
      let notEqual =
        gameData.gameContent.length !==
        finalAnswers.filter((answer) => answer !== undefined).length;

      //si notEqual est vrai, le bouton est désactivé, sinon il s'active
      setDisableSend(notEqual);
    }
  }, [gameData, finalAnswers]);

  //Récupère les réponses choisies pour les envoyer
  const getAnswers = (answer, index) => {
    if (answer !== "") {
      let finalAnswersTemp = [...finalAnswers];
      finalAnswersTemp[index] = answer;
      setFinalAnswers(finalAnswersTemp);
    }
  };


  //Envoie les réponses au Back pour validation
  const submitAnswers = () => {
    setDisableSend(true);
    setDisableAnswerChange(true);
    gameValidation({ slug: slug, finalAnswers: finalAnswers }).then(
      (feedback) => {
        setFeedBackAnswers(feedback.answersFeedback);
        if (context.isLogged === true) {
          leveling({
            points: feedback.score,
            gameSlug: slug,
            totalPoints: gameData.points,
          }).then((msgResponse) => {
            context.setRefreshStats(true);
            setGameNotification(msgResponse);
          });
        }
      }
    );
  };

  return (
    <article>
      <Box sx={{ flexGrow: 1 }} wrap={"wrap"}>
        <Grid container spacing={0}>
          <Grid
            item
            lg={3}
            md={4}
            xs={12}
            className={classes.sidebarArea}
            order={{ lg: 1, md: 1, xs: 3 }}
          >
            <Sidebar currentTheme={themeData} />
          </Grid>

          <Grid
            item
            lg={6}
            md={8}
            xs={12}
            order={{ lg: 2, md: 2, xs: 1 }}
            className={classes.gameArea}
          >
            <section id="game-container">
              <article className="game-content">
                <div className="game-navigation">
                  {previousGame.slug && (
                    <IconButton edge="end" aria-label="delete">
                      <SkipPreviousIcon sx={{ width: 40, height: 40 }} />
                    </IconButton>
                  )}

                  <h2 className="game-title">{gameData.name} 🤔</h2>

                  {nextGame.slug && (
                    <IconButton edge="end" aria-label="delete">
                      <SkipNextIcon sx={{ width: 40, height: 40 }} />
                    </IconButton>
                  )}
                </div>
                {gameData.gameContent &&
                  //Boucle sur le contenue des jeux :
                  gameData.gameContent.map((value, gameIndex) => {
                    return (
                      <GameContent
                        key={gameIndex}
                        value={value}
                        getAnswers={getAnswers}
                        gameIndex={gameIndex}
                        themeName={themeData.name}
                        disableAnswerChange={disableAnswerChange}
                        validate={feedbackAnswers[gameIndex]}
                      />
                    );
                  })}
                <button
                  className="validateButton"
                  //on désactive le bouton tant que la personne n'a pas répondue à toutes les questions
                  disabled={disableSend}
                  onClick={submitAnswers}
                >
                  Vérifier !
                </button>
                <span className="game-notification animate__animated animate__bounceInUp" style={{display: displayNotification()}}>{gameNotification}</span>
              </article>
            </section>
          </Grid>

          <Grid
            className={classes.profilSidebarArea}
            item
            lg={3}
            md={12}
            xs={12}
            order={{ lg: 3, md: 3, xs: 3 }}
          >
            <ProfilCard />
          </Grid>
        </Grid>
      </Box>
    </article>
  );
}

const useStyles = makeStyles({
  gameArea: {

  },

  sidebarArea: {
    width: "100%",
  },

  profilSidebarArea: {
    padding: "4.5rem 0",
    display: "flex",
    justifyContent: "center",
    width: '100%',
  },
});
