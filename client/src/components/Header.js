import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import {
  Typography,
  Hidden,
  Toolbar,
  AppBar,
  //Zoom,
  Avatar,
  Grid,
  Fade,
  InputBase,
} from '@material-ui/core';
//import MapIcon from '@material-ui/icons/Map';
import { useHeaderStyles, useNavbarStyles, WhiteTooltip } from '../styles/styles';
import {
  LoadingIcon,
  AddIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon,
  MapIcon1,
  DashboardIcon,
} from '../styles/icons';
import { getProperties } from '../data';
import Context from '../context';
import Signout from './Auth/Signout';

const Header = () => {
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const classes = useHeaderStyles();
  const history = useHistory();
  // const path = history.location.pathname;
  const { state } = useContext(Context);
  const { currentUser } = state;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Title / Logo */}
          <div className={classes.grow}>
            <MapIcon1 className={classes.icon} />
            <Typography
              className={mobileSize ? classes.mobile : ''}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              GeoProperty
            </Typography>
          </div>
          <div className={classes.grow}>
            <Search history={history} />
          </div>
          <Links currentUser={currentUser} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const hasResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    setResults(getProperties());
  }, [query]);

  const handleClearSearcInput = () => {
    setQuery('');
  };

  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultsContainer} container>
              {results.map((result) => (
                <Grid
                  key={result._id}
                  item
                  className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result._id}`);
                    handleClearSearcInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.pin.picture} alt={`${result.pin.title}`} />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.pin.title}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
        <InputBase
          className={classes.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={handleClearSearcInput} className={classes.clearIcon} />
            )
          }
        />
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path, currentUser }) {
  const classes = useNavbarStyles();
  //const [showList, setList] = useState(false);
  //const [showToolTip, setToolTip] = useState(true);

  useEffect(() => {
    // const timeout = setTimeout(handleHideToolTip, 5000);
    // return () => {
    //   clearTimeout(timeout);
    // };
  }, []);

  // const handleToggleList = () => {
  //   setList(!showList);
  // };

  // const handleHideToolTip = () => {
  //   setToolTip(false);
  // };

  return (
    <div className={classes.linksContainer}>
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/dashboard">
          {path === '/dashboard' ? <DashboardIcon alt="Dashboard" /> : <DashboardIcon />}
        </Link>
        <Link to={`/${currentUser.name}`}>
          <div className={classes.profileActive}>
            <Avatar src={currentUser.picture} className={classes.profileImage} />
          </div>
        </Link>
        {/* Signout Button */}
        <Signout />
      </div>
    </div>
  );
}

export default Header;
