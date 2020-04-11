import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  InputBase,
  Hidden,
  Avatar,
  Fade,
  Grid,
  Typography,
  Zoom,
} from '@material-ui/core';
import { useNavbarStyles, WhiteTooltip, RedTooltip } from '../../_styles/styles.js';
// import NotificationList from '../notification/NotificationList';
// import NotificationTooltip from '../notification/NotificationTooltip';
import logo from '../../images/logo_title.png';
import { defaultCurrentUser, getDefaultUser } from '../../dev-data/data';
import {
  LoadingIcon,
  AddIcon,
  NotificationActiveIcon,
  NotificationIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon,
} from '../../_styles/icons';
import { useNProgress } from '@tanem/react-nprogress';

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const [isLoadingPage, setLoadingPage] = useState(true);
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    setLoadingPage(false);
  }, [path]);

  return (
    <>
      <Proccess isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              {/* <Links path={path} /> */}
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}

function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className="logoWrapper">
          <img src={logo} alt="musiC Share" />
        </div>
      </Link>
    </div>
  );
}

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const hasResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
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
                  key={result.id}
                  item
                  className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearSearcInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2">{result.name}</Typography>
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

function Links({ path }) {
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
        <Link to="/">{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showToolTip}
          TransitionComponent={Zoom}
          onOpen={handleHideToolTip}
          //title={<NotificationTooltip />}
        >
          {/* <div className={classes.notifications} onClick={handleToggleList}>
            {!showList ? <NotificationIcon /> : <NotificationActiveIcon />}
          </div> */}
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div
            className={
              path === `/${defaultCurrentUser.username}` ? classes.profileActive : ''
            }
          >
            <Avatar
              src={defaultCurrentUser.profile_image}
              className={classes.profileImage}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

const Proccess = ({ isAnimating }) => {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  );
};

export default Navbar;
