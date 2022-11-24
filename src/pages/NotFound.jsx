// #region import
import React from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
// #endregion import

//-------------------------------------------------------------------------------------------------------------------------------
//  Cette Page nous redirige vers une erreur de type 404 pour nous informer que le path saisit est introuvable :
//-------------------------------------------------------------------------------------------------------------------------------
export default function NotFound() {
  const classes = useStyles();
  return (
    <main className={classes.containerStyle}>
      <Typography className={classes.titleStyle} variant="h1">
        404
      </Typography>

      <Typography className={classes.textStyle} variant="p">
        La page demandée est introuvable.
      </Typography>

      <Button className={classes.btnStyle} variant="contained">
        <Link className={classes.linkStyle} to="/">
          Retour page d'accueil
        </Link>
      </Button>
    </main>
  );
}

const useStyles = makeStyles({
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20vh",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: "200px",
    color: "#fff",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: "30px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "10px",
  },
  btnStyle: {
    borderRadius: "10px",
    background: "rgba(155, 155, 200, 0.5)",
    "&:hover": {
      backgroundColor: "rgba(155, 155, 200, 0.8)",
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: "white",
    fontSize: "30px",
  },
});
