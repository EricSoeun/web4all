// #region import

//React import :
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

//MUI import :
import { Paper, Button, FormControl, Typography } from "@mui/material";
import AccountLogo from "@mui/icons-material/AccountBox";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Requete import :
import { getAllUsers } from "../requests/getRequest";
import { postNewUser } from "../requests/postRequest";
// #endregion import

export default function Register() {
  const classes = useStyles();
  const history = useHistory();

  //contenu des inputs à envoyer pour s'inscrire
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [stateRegister, setStateRegister] = useState({
    email: "",
    username: "",
    password: "",
    passwordRepeat: "",
  });

  const [emailList, setEmailList] = useState([]);
  const [usernameList, setUsernameList] = useState([]);

  //Liste des message d'erreur que l'utlisateur peut rencontrer :
  const errorMessageList = {
    emptyInput: "Veuillez remplir le champ.",
    notValidEmail: "Veuillez saisir un email valide.",
    numberCharacterNeeded:
      "Le username doit comporter entre 5 et 20 caractères.",
    passwordMinLength:
      "le mot de passe doit comporter entre 5 et 20 caractères.",
    passwordNotMatch:
      "Les mots de passe ne correspondent pas veuillez réessayer.",
    emailNotFree: "Cette email est déjà utilisé. Essayez un autre nom.",
    usernameNotFree: "Ce username est déjà utilisé. Essayez un autre nom.",
  };

  //Effect utilisé pour récupérer la liste des utilisateurs "Email, UserName" :
  useEffect(() => {
    let tempUserMail = [];
    let tempUserName = [];

    getAllUsers().then((users) => {
      users.map((user) => tempUserMail.push(user.email));
      users.map((user) => tempUserName.push(user.username));

      setEmailList(tempUserMail);
      setUsernameList(tempUserName);
    });
  }, []);

  //Effect utilisé pour la vérification de conformité de character relié au mot de passe + username :
  useEffect(() => {
    if (!ValidatorForm.hasValidationRule("isCharacterValide")) {
      ValidatorForm.addValidationRule("isCharacterValide", (value) => {
        if (value.length >= 5 && value.length <= 20) {
          return true;
        }
        return false;
      });
    }

    return () => {
      if (ValidatorForm.hasValidationRule("isCharacterValide")) {
        ValidatorForm.removeValidationRule("isCharacterValide");
      }
    };
  }, [stateRegister.username, stateRegister.password]);

  //Effect utilisé pour la vérification du mot de passe :
  useEffect(() => {
    if (!ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== stateRegister.password) {
          return false;
        }
        return true;
      });
    }

    return () => {
      if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
        ValidatorForm.removeValidationRule("isPasswordMatch");
      }
    };
  }, [stateRegister.password]);

  //Effect utilisé pour la vérification d'émail :
  useEffect(() => {
    if (!ValidatorForm.hasValidationRule("isEmailFree")) {
      ValidatorForm.addValidationRule("isEmailFree", (value) => {
        if (emailList.includes(value)) {
          return false;
        }
        return true;
      });
    }

    return () => {
      if (ValidatorForm.hasValidationRule("isEmailFree")) {
        ValidatorForm.removeValidationRule("isEmailFree");
      }
    };
  }, [emailList]);

  //Effect utilisé pour la vérification d'username :
  useEffect(() => {
    if (!ValidatorForm.hasValidationRule("isUsernameFree")) {
      ValidatorForm.addValidationRule("isUsernameFree", (value) => {
        if (usernameList.includes(value)) {
          return false;
        }
        return true;
      });
    }

    return () => {
      if (ValidatorForm.hasValidationRule("isUsernameFree")) {
        ValidatorForm.removeValidationRule("isUsernameFree");
      }
    };
  }, [usernameList]);

  //On récupère les donné du formulaire pour mettre a jours notre state :
  const handleChangeTextRegister = (e, type) => {
    const value = e.target.value;
    setStateRegister({ ...stateRegister, [type]: value });
  };

  //On update la visibilité du mot de passe :
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  //Envoie de donné coté back avec une redirection sur la page de login :
  const handleSubmit = (e) => {
    e.preventDefault();
    postNewUser(stateRegister);
    history.push({
      pathname: "/login",
      state: {
        email: stateRegister.email,
        successRegister: true,
        contentNotif: "Inscription réussie",
      },
    });
  };

  return (
    <div className={classes.parentRegister}>
      <Paper elevation={1} className={classes.containerFormStyle}>
        <ValidatorForm
          onError={(errors) => console.log("ERREUR FORMULAIRE: ", errors)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Box className={classes.containerLogo}>
            <AccountLogo className={classes.avatarStyle} fontSize="large" />
          </Box>

          <Typography className={classes.title} align="center" variant="h5">
            Créer votre compte
          </Typography>

          <FormControl
            className={classes.containerInputStyle}
            variant="outlined"
          >
            <TextValidator
              className={classes.inputStyle}
              label="Email"
              onChange={(e) => handleChangeTextRegister(e, "email")}
              name="email"
              value={stateRegister.email}
              validators={["required", "isEmail", "isEmailFree"]}
              errorMessages={[
                errorMessageList.emptyInput,
                errorMessageList.notValidEmail,
                errorMessageList.emailNotFree,
              ]}
            ></TextValidator>
          </FormControl>

          <FormControl
            className={classes.containerInputStyle}
            variant="outlined"
          >
            <TextValidator
              className={classes.inputStyle}
              label="username"
              onChange={(e) => handleChangeTextRegister(e, "username")}
              name="username"
              value={stateRegister.username}
              validators={["required", "isCharacterValide", "isUsernameFree"]}
              errorMessages={[
                errorMessageList.emptyInput,
                errorMessageList.numberCharacterNeeded,
                errorMessageList.usernameNotFree,
              ]}
            ></TextValidator>
          </FormControl>

          <FormControl
            className={classes.containerInputStyle}
            variant="outlined"
          >
            <TextValidator
              className={classes.inputStyle}
              label="Mot de passe"
              type={passwordVisibility ? "text" : "password"}
              onChange={(e) => handleChangeTextRegister(e, "password")}
              name="password"
              value={stateRegister.password}
              validators={["required", "isCharacterValide"]}
              errorMessages={[
                errorMessageList.emptyInput,
                errorMessageList.passwordMinLength,
              ]}
            ></TextValidator>
          </FormControl>

          <FormControl
            className={classes.containerInputStyle}
            variant="outlined"
          >
            <TextValidator
              className={classes.inputStyle}
              label="Confirmer"
              onChange={(e) => handleChangeTextRegister(e, "passwordRepeat")}
              type={passwordVisibility ? "text" : "password"}
              name="passwordRepeat"
              validators={["isPasswordMatch", "required"]}
              errorMessages={[
                errorMessageList.passwordNotMatch,
                errorMessageList.emptyInput,
              ]}
              value={stateRegister.passwordRepeat}
            ></TextValidator>
          </FormControl>

          <FormGroup>
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
          >
            S'inscrire
          </Button>
        </ValidatorForm>

        <Link to="/login" className={classes.linkStyle}>
          <p>Se connecter à un compte existant</p>
        </Link>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles({
  parentRegister: {
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
  containerInputStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  inputStyle: {
    width: "25ch",
  },
  linkStyle: {
    textDecoration: "none",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "5px",
    padding: "5px",
    color: "white",
  },
});
