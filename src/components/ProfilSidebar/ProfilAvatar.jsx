import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";

function CircularProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={110}
        className={classes.progressCircle}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ width: "90%", height: "90%" }}
          /* className={classes.avatar} */
          alt="Jean Musclayo"
          src="https://www.service4money.com/pics/2021/01/17/i-will-draw-a-unique-pixel-art-portrait-159689.png"
        />
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function ProfilProgressBar(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <CircularProgressWithLabel
        value={props.value}
        sx={{
          size: "100%",
        }}
      />
    </Box>
  );
}

const useStyles = makeStyles({
  progressCircle: {
    background: "#3F3F3F",
    borderRadius: "50%",
    width: "7vw !important",
    height: "7vw !important",
    WebkitBoxShadow:
      "5px 5px 15px 5px #FF8080A1, -9px 5px 5px -4px #FFE3889A, -7px -5px 15px -19px #8BFF8598, 2px -5px 9px -1px #80C8FFAF, 12px 10px 3px -10px #E388FF9A, -10px 10px 5px -11p#FF616BAF6b, -10px -7px 13px 1px #8D5CFF8F, 5px 5px 15px -5px rgb(0 0 0 / 0%)",
    boxShadow:
      "5px 5px 15px 5px #FF8080C0, -9px 5px 5px -4px #FFE388CB, -7px -5px 15px -19px #8BFF85B9, 2px -5px 9px -1px #80C8FFB4, 12px 10px 3px -10px #E388FF9F, -10px 10px 5px -11px #FF616BAF, -10px -7px 13px 1px #8D5CFFAD, 5px 5px 15px -5px rgb(0 0 0 / 0%)",
  },

  "@media screen and (max-width: 899px)": {
    __expression__: "screen and (min-width: 600px)",
    progressCircle: {
      background: "#3F3F3F",
      borderRadius: "50%",
      width: "120px !important",
      height: "120px !important",
    },
  },

  singleModule: {
    display: "list-item",
  },
});
