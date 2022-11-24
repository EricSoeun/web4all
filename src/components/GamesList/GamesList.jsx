// #region import
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
//import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { makeStyles } from "@mui/styles";

import { getGamesInModule } from "../../requests/getRequest";

import { AppContext } from "../../AppContext";

import "../../style/sidebar.css";
// #endregion import

//-------------------------------------------------------------------------------------------------------------------------------
//  Affiche la page d'game avec le theme id de la catégorie séléctionner depuis le component Sidebar :
//-------------------------------------------------------------------------------------------------------------------------------
export default function GamesSidebar({ moduleid }) {
    const classes = useStyles();

    const context = useContext(AppContext);

    const [gameData, setGameData] = useState([]);
    const [gameFinished, setGameFinished] = useState([]);

    useEffect(() => {
        getGamesInModule(moduleid).then((game) => setGameData(game));
    }, [moduleid]);

    useEffect(() => {
        if (context.isLogged && context.user.achieved) {
            setGameFinished(context.user.achieved);
        } else {
            setGameFinished([]);
        }
    }, [context.isLogged, context.user]);

    useEffect(() => {
        console.log(gameFinished);
    }, [gameFinished]);

    return (
        <List className={classes.gamesList}>
            {gameData.map((value, index) => {
                let gameStatus = "";
                if (gameFinished.length) {
                    const alreadyDone = gameFinished.find(
                        (game) => game.gameSlug === value.slug
                    );
                    if (alreadyDone) {
                        console.log(alreadyDone);
                        if (alreadyDone.points === value.points) {
                            gameStatus = "game-finished";
                        } else if (alreadyDone.points < value.points) {
                            gameStatus = "game-not-finished";
                        }
                    }
                }
                return (
                    <li key={index} role="menuitem">
                        <ListItem
                            className={classes.gameLink}
                            sx={{ pl: 5 }}
                            component={Link}
                            to={`/game/${value.slug}`}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <CheckCircleOutlineIcon
                                        className={gameStatus}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                </IconButton>
                            }>
                            {
/* Icone devant le nom des jeux, prévu pour les futurs types de jeux possibles
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 30, height: 30 }}>
                                        <HelpCenterIcon
                                            sx={{ width: 20, height: 20 }}
                                        />
                                    </Avatar>
                                </ListItemAvatar> */
                            }
                            <ListItemText
                                sx={{pl : 5}}
                                primary={value.name}
                                className="gameLink"
                            />
                        </ListItem>
                    </li>
                );
            })}
        </List>
    );
}

const useStyles = makeStyles({
    gamesList: {
        //background: "blue",
        display: "list-item",
        minWidth: "100%",
    },

    gameLink: {
        /*     background: 'lightGreen', */
        "&:hover": {
            background: "#99999957;",
        },
    },
});
