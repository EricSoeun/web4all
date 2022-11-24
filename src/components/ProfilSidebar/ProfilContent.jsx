// #region import
import { makeStyles } from "@mui/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProfilAvatar from "./ProfilAvatar";
import ProfilProgressionBars from "./ProfilProgressionBars";
import ProfilBadges from "./ProfilBadges";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
// #endregion import

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function ProfilGrid() {
    const context = useContext(AppContext);
    // console.log("context: ", context.user.totalPoints);

    const [currentXP, setCurrentXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [levelDivider, setLevelDivider] = useState(15);

    const [locker, setLocker] = useState("✋");
    const [blurHover, setBlurHover] = useState("blur");

    const classes = useStyles();

    useEffect(() => {
        if (context.user.totalPoints) {
            let currentXPTemp = context.user.totalPoints;
            let levelTemp = 1;
            let levelDividerTemp = 15;

            while (currentXPTemp >= levelDividerTemp) {
                currentXPTemp -= levelDividerTemp;
                levelTemp++;
                if (levelDividerTemp < 100) {
                    levelDividerTemp += 10;
                }
            }
            console.log(
                `Niveau ${levelTemp} => ${currentXPTemp}/${levelDividerTemp} XP`
            );
            setCurrentXP(currentXPTemp);
            setLevel(levelTemp);
            setLevelDivider(levelDividerTemp);
        } else {
            setCurrentXP(0);
            setLevel(1);
            setLevelDivider(15);
        }
    }, [context.user.totalPoints]);

    const hoverEnter = () => {
        setBlurHover("blur-hover");
        setLocker("🖖");
    };
    const hoverExit = () => {
        setBlurHover("blur");

        setLocker("✋");
    };

  return (
    <>
      {!context.isLogged && (
                <div className="test-blur">
                  <a href="/login">
                    <button
                        onMouseEnter={hoverEnter}
                        onMouseLeave={hoverExit}
                        className="logInOutButton">
                        {locker}
                    </button>
                  </a>
                </div>
            )}
            <Box
                className={context.isLogged ? "" : blurHover}
                sx={{ flexGrow: 1 }}>
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12 }}
          sx={{ background: "transparent", m: 0, p: 0, width: "100%" }}
          rowSpacing={2}
          spacing={{ xs: 1, md: 0 }}
        >
          <Grid item xs={12} alt="Utilisateur">
            <Item sx={{p: 0, color: "white", bgcolor: "transparent", boxShadow: 0, fontSize: 15,}}>
              <h3 className="profil-username">{context.user.username || "Invité"}</h3>
            </Item>
          </Grid>

          <Grid item xs={6} alt="Avatar">
            <Item className={classes.avatarFrame}  sx={{bgcolor: "transparent", boxShadow: 0}}>
              <ProfilAvatar value={(currentXP/levelDivider)*100} />
            </Item>
          </Grid>

          <Grid item xs={6} alt="Barres de progression">
            <Item className={classes.progressionsFrame}  sx={{bgcolor: "transparent", boxShadow: 0}}>
              <ProfilProgressionBars
                totalPoints={context.user.totalPoints || 0}
                currentXP={currentXP}
                level={level}
                levelDivider={levelDivider || 10}
              />
              
            </Item>
          </Grid>

            <Grid item xs={4}>
              <Item className={classes.profilIconFrame}  sx={{mt: 3, bgcolor: "#79797938"}}>
                <img
                  src="https://u.cubeupload.com/Sono/leader.png"
                  alt="Options"
                  className="profil-icon"
                />
              </Item>
            </Grid>
            <Grid item xs={4}  sx={{mt: 3}}>
              <Item className={classes.profilIconFrame}>
                <img
                  src="https://u.cubeupload.com/Sono/rising2.png"
                  alt="Progression"
                  className="profil-icon"
                />
              </Item>
            </Grid>
            <Grid item xs={4}  sx={{mt: 3}}>
              <Item className={classes.profilIconFrame}>
                <img
                  src="https://u.cubeupload.com/Sono/settings.png"
                  alt="Options"
                  className="profil-icon"
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className={classes.profilIconFrame}>
                <ProfilBadges />
              </Item>
            </Grid>
        </Grid>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  avatar: {
    background: "linear-gradient(to bottom right, #ff3cac, #562b7c, #2b86c5)",
    border: "10px solid white",
  },
  profilIconFrame: {
    padding: "1.9vh 0",
background: '#1E2738',
background: '-webkit-linear-gradient(top left, #1E2738, #19202A)',
background: '-moz-linear-gradient(top left, #1E2738, #19202A)',
background: 'linear-gradient(to bottom right, #1E2738, #19202A)',
  },
  progressionsFrame: {
  /*   background: "blue", */
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  avatarFrame: {
/*     background: "green", */
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
});
