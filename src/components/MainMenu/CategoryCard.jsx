// #region import
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import "../../style/mainMenu.css";
import "animate.css";

import ModulesMainMenu from "./ModulesMainMenu";
// #endregion import

export default function CategoryCard(props) {
  const classes = useStyles();

  const { data, index, isExpanded, expandController } = props;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded !== undefined) setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={expandController}
        className={
          classes.cardContainer + " animate__animated animate__fadeInDown"
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
          className={classes.cardHeader}
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0}}
          >
            {data.name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.cardSummary} sx={{ width: 2 / 2 }}>
          <ModulesMainMenu themeId={data._id} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

const useStyles = makeStyles({
  cardContainer: {
    padding: "0 0",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem 0",
  },

  fullWidth: {
    width: "100%",
  },

  cardHeader: {
    margin: 10,
    width: "100%",
    fontWeight: 600,
    color: "#382b22",
    padding: "1.25em 2em",
    background: "#FFFBFB",
    border: "2px solid #504549",
    borderRadius: "0.75em",
    transformStyle: "preserve-3d",
    transition:
      "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
    "&::before": {
      content: `''`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "#855a65",
      borderRadius: "inherit",
      boxShadow: "0 0 0 2px #b18597, 0 0.425em 0 0 #443F3F",
      transform: "translate3d(0.1em, 0.75em, -1em)",
      transition:
        "transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1)",
    },
    "&:hover": {
      background: "#ffe9e9",
      transform: "translate(0, 0.25em)",
    },
    "&:hover::before": {
      boxShadow: "0 0 0 2px #b18597, 0 0.5em 0 0 #443F3F",
      transform: "translate3d(0, 0.5em, -1em)",
    },
    "&:active": {
      background: "#ffe9e9",
      transform: "translate(0em, 0.75em)",
    },
    "&:active::before": {
      boxShadow: '0 0 0 2px #b18597, 0 0 #ffe3e2',
      transform: 'translate3d(0, 0, -1em)',
    },
  },

  cardSummary: {
    marginTop: 30,
    borderEndStartRadius: 6,
    borderEndEndRadius: 6,
    width: "100%",
    padding: 0,
  },
});
