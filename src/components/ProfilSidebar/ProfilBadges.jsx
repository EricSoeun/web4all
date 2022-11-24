// #region import
import { makeStyles } from "@mui/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// #endregion import

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 5,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProfilBadges() {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          sx={{ background: "transparent", m: 0, p: 0, width: "100%" }}
          className={classes.badgesRow}
        >
                    <Grid item xs={12}>
            <Item sx={{p: 0, color: "white", bgcolor: "transparent", boxShadow: 0, fontSize: 15, fontWeight: "bold"}}>Trophées 2/3</Item>
          </Grid>
          <Grid item xs={4} alt="HTML" className={classes.badgeContainer} sx={{pl: 0}}>
              <Item className={classes.badge}><i className={'fa-brands fa-html5 ' + classes.achievedHTML}></i></Item>
          </Grid>
          <Grid item xs={4} alt="CSS" className={classes.badgeContainer} sx={{pl: 0}}>
            <Item className={classes.badge}><i className={'fa-brands fa-css3-alt ' + classes.achievedCSS} ></i></Item>
          </Grid>
          <Grid item xs={4} alt="Javascript" className={classes.badgeContainer} sx={{pl: 0}}>
            <Item className={classes.badge}><i className="fa-brands fa-js-square"></i></Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const useStyles = makeStyles({

  badge: {
    fontSize: "2.5em",
    color: "#949494",
    margin:0,
    "backgroundColor": "#cbcbcb",
    "width": "55px",
    "height": "55px",
    "borderRadius": "50%",
    "MozBoxShadow":"inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(0, 0, 0, 0.24)","WebkitBoxShadow":"inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(0, 0, 0, 0.24)","boxShadow":"inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(0, 0, 0, 0.24)"
  },

  badgeContainer: {
    display: "flex",
    justifyContent: "center",
    paddingLeft:"0px !important",
    width: "100%",
  },

  badgesRow: {
    width: "100%",
    margin: 0,
  },
  
  achievedHTML: {
    color: "#D46060",
    "WebkitBackgroundClip": "text",
    "backgroundImage": "linear-gradient(to right, #E05D3C, #CA1111)",
    "WebkitTextFillColor": "transparent"
  },
  achievedCSS: {
    color: "#434EB9",
    "WebkitBackgroundClip": "text",
    "backgroundImage": "linear-gradient(to right, #44B2D3, #2979ff)",
    "WebkitTextFillColor": "transparent"
  },
  achievedJS: {
    color: "#F5C731",
  },

});
