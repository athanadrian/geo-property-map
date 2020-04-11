import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHeaderStyles, useNavbarStyles } from "../styles/styles";
import {
  Typography,
  Hidden,
  Toolbar,
  AppBar,
  Zoom,
  Avatar
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import {
  AddIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon
} from "../styles/icons";

import Context from "../context";
import Signout from "./Auth/Signout";

const Header = () => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const classes = useHeaderStyles();
  // const history = useHistory();
  // const path = history.location.pathname;
  const { state } = useContext(Context);
  const { currentUser } = state;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Title / Logo */}
          <div className={classes.grow}>
            <MapIcon className={classes.icon} />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              GeoPins
            </Typography>
          </div>

          {/* Current User Info */}
          {currentUser && (
            <div className={classes.grow}>
              <img
                className={classes.picture}
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography
                className={mobileSize ? classes.mobile : ""}
                variant="h5"
                color="inherit"
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}
          <Links currentUser={currentUser} />
          {/* Signout Button */}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

function Links({ path, currentUser }) {
  const classes = useNavbarStyles();
  const [showList, setList] = useState(false);
  const [showToolTip, setToolTip] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handleHideToolTip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleToggleList = () => {
    setList(!showList);
  };

  const handleHideToolTip = () => {
    setToolTip(false);
  };

  return (
    <div className={classes.linksContainer}>
      {/* {showList && <NotificationList handleHideList={handleToggleList} />} */}
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        {/* <RedTooltip
          arrow
          open={showToolTip}
          TransitionComponent={Zoom}
          onOpen={handleHideToolTip}
          //title={<NotificationTooltip />}
        > 
         <div className={classes.notifications} onClick={handleToggleList}>
            {!showList ? <NotificationIcon /> : <NotificationActiveIcon />}
          </div> 
        </RedTooltip>*/}
        <Link to={`/${currentUser.name}`}>
          <div
            className={
              path === `/${currentUser.name}` ? classes.profileActive : ""
            }
          >
            <Avatar src={currentUser.image} className={classes.profileImage} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
