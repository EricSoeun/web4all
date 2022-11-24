// #region import
import { makeStyles } from "@mui/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from '@mui/material/Typography';
import "../../style/profilCard.css"
// #endregion import

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 3,
  margin: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LinearProgressWithLabel(props) {

  const { value, levelDivider } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={(value/levelDivider)*100} sx={{my: "8px"}}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="caption" display="block" gutterBottom sx={{m: "-5px"}}>
          {value}/{levelDivider}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProfilProgression(props) {

  const { totalPoints, currentXP, level, levelDivider } = props;

  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          sx={{ background: "transparent", m: 0, p: 0, width: "100%" }}
        >
          <Grid item xs={12} alt="XP Actuel">
            <Item className={classes.barBox} sx={{p: 0, color: "white", bgcolor: "transparent", boxShadow: 0, fontSize: 15,}}>
              <LinearProgressWithLabel value={currentXP} levelDivider={levelDivider} className={classes.linearProgress}/>
            </Item>
          </Grid>
          <Grid item xs={12} alt="Niveau">
            <Item className={classes.barBox} sx={{p: 0, color: "white", bgcolor: "transparent", boxShadow: 0, fontSize: 15,}}>
              <span>Niveau {level}</span>
            </Item>
          </Grid>
          <Grid item xs={12} alt="Total XP">
            <Item className={classes.barBox} sx={{color: "white", bgcolor: "#79797938"}}>
              <span>{totalPoints} points</span>
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
  barBox: {
  borderRadius: "10px",
  fontWeight: "bold",
  },
  linearProgress: {
    border : "1px solid black",
    margin: 20
  }
});
