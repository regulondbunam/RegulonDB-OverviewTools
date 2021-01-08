import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Acordion({ id, nameGroup = "", graphics = [] }) {
  const classes = useStyles();
  console.log(graphics)
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={id}
        >
          <Typography className={classes.heading}>{nameGroup}</Typography>
        </AccordionSummary>
        {graphics.map((graphic) => {
          //return <h3>{element}</h3>;

          return (
            <AccordionDetails>
               <a
                  href={`/overviews/${graphic.id}`}
                  key={graphic.id}
                  id={graphic.id}
                >
                  {graphic.title}
                </a>
            </AccordionDetails>
          )
       })}
      </Accordion>
    </div>
  );
}
