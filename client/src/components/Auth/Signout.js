import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { useSignoutStyles } from "../../styles/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "@material-ui/core";

import Context from "../../context";

const Signout = () => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const classes = useSignoutStyles();
  const { dispatch } = useContext(Context);

  const onSignout = () => {
    dispatch({ type: "SIGNOUT_USER" });
    console.log("Signed out user");
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography
            style={{ display: mobileSize ? "none" : "block" }}
            variant="body1"
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

export default Signout;
