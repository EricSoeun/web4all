// #region import
import { forwardRef, useState, useEffect, useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Paper, Button, FormControl, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AccountLogo from "@mui/icons-material/AccountCircle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { login } from "../requests/postRequest";

import { AppContext } from ".././AppContext";
// #endregion import

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const context = useContext(AppContext);

  //contenu des inputs à envoyer pour se connecter
  const [stateLogin, setStateLogin] = useState({
    email: "",
    password: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [openNotifError, setOpenNotifError] = useState(false);
  const [openNotifSuccess, setOpenNotifSuccess] = useState(false);

  //Liste des message d'erreur que l'utlisateur peut rencontrer :
  const errorMessageList = {
    emptyInput: "Veuillez remplir le champ.",
    notValidEmail: "Veuillez saisir un email valide.",
    signInError: "Impossible de trouver votre compte.",
  };

  //Use effect utilisé pour récupérer l'émail de l'utlisateur après inscription :
  useEffect(() => {
    if (location && location.state !== undefined) {
      setStateLogin({ ...stateLogin, email: location.state.email });
      setOpenNotifSuccess(location.state.successRegister);
    }
  }, [location]);

  //Use effect utilisé pour fermer la notif après 5 seconde :
  useEffect(() => {
    if (location && location.state !== undefined) {
      if (location.state.successRegister === true) {
        setTimeout(() => {
          setOpenNotifSuccess(false);
        }, 5000);
      }
    }
  }, [location]);

  //On récupère les value du formulaire :
  const handleChangeTextLogin = (e, type) => {
    const value = e.target.value;
    setStateLogin({ ...stateLogin, [type]: value });
  };

  //On met a jours la visibilité du mot de passe :
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  /*
  On recoit les donné du formulaire saisit par l'utilisateur
  pour ensuite envoyé coté back puis faire une redirection sur la page d'acceuil:
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    login(stateLogin)
      .then((success) => {
        console.log(success.user);
        localStorage.setItem("token", success.token);
        context.setIsLogged(true);
        setOpenNotifError(false);
        history.push("/");
      })
      .catch((err) => {
        setOpenNotifError(true);
      });
  };

  //Handle qui permet de fermer la notification success:
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotifSuccess(false);
  };

  //Handle qui permet de fermer la notification error :
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotifError(false);
  };

  return (
    <div className={classes.parentLogin}>
      <Paper elevation={1} className={classes.containerFormStyle}>
        <ValidatorForm onSubmit={(e) => handleSubmit(e)}>
          <Box className={classes.containerLogo}>
            <AccountLogo className={classes.avatarStyle} fontSize="large" />
          </Box>

          <Typography className={classes.title} align="center" variant="h5">
            Se connecter
          </Typography>

          <FormControl
            className={classes.centerElementStyle}
            variant="outlined"
          >
            <TextValidator
              label="Email"
              onChange={(e) => handleChangeTextLogin(e, "email")}
              name="email"
              value={stateLogin.email}
              validators={["required", "isEmail"]}
              errorMessages={[
                errorMessageList.emptyInput,
                errorMessageList.notValidEmail,
              ]}
            ></TextValidator>
          </FormControl>

          <FormControl className={classes.centerElementStyle} variant="outlined">
            <TextValidator
              label="Mot de passe"
              type={passwordVisibility ? "text" : "password"}
              onChange={(e) => handleChangeTextLogin(e, "password")}
              name="password"
              value={stateLogin.password}
              validators={["required"]}
              errorMessages={[errorMessageList.emptyInput]}
            ></TextValidator>
          </FormControl>

          <FormGroup className={classes.centerElementStyle}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleClickShowPassword}
                  checked={passwordVisibility}
                />
              }
              label="Afficher le mot de passe"
            />
          </FormGroup>
          <Button
            type="submit"
            className={classes.btnStyle}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </ValidatorForm>

        <Link to="/register" className={classes.linkStyle}>
          <p>Créer un compte</p>
        </Link>
      </Paper>

      <Stack spacing={2}>
        {location.state && (
          <Snackbar
            open={openNotifSuccess}
            autoHideDuration={6000}
            onClose={handleCloseSuccess}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {location.state.contentNotif}
            </Alert>
          </Snackbar>
        )}
        <Snackbar
          open={openNotifError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessageList.signInError}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

const useStyles = makeStyles({
  parentLogin: {
    display: "flex",
    height: "100vh",
  },
  containerFormStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "350px",
    margin: "auto",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0, 0.1)",
  },
  containerLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "20px",
  },
  avatarStyle: {
    transform: "scale(1.8)",
  },
  title: {
    padding: "10px",
  },
  btnStyle: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.8)",
    margin: "30px auto",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
  },
  centerElementStyle: {
    display: "flex",
    justifyContent :'center',
    alignItems:'center',
    width: "25ch",
    marginBottom : '15px'
  },
  linkStyle: {
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "5px",
    padding: "5px",
    color: "white",
  },
});
