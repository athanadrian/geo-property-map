import React from "react";
import { useNoContentStyles } from "../../styles/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";

const NoContent = () => {
  const classes = useNoContentStyles();

  return (
    <div className={classes.root}>
      <ExploreIcon className={classes.icon} />
      <Typography
        noWrap
        component="h2"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Click on the map to add a pin
      </Typography>
    </div>
  );
};

export default NoContent;
