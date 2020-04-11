import { makeStyles, Tooltip, withStyles } from "@material-ui/core";
import IconSheet from "../images/icon-sheet.png";
import IconSheet2 from "../images/icon-sheet-2.png";

/* Home page: /pages/Home.js */
export const useHomePageStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    // gridAutoFlow: "column",
    //gridTemplateColumns: 'minmax(auto, 600px) 300px',
    gridGap: 35
    // [theme.breakpoints.down('sm')]: {
    //   gridTemplateColumns: 'minmax(auto, 600px)',
    //   justifyContent: 'center',
    // },
    // '&.slickSlider': {
    //   display: 'grid',
    // },
  },
  sidebarContainer: {
    display: "grid",
    margin: "0px 28px 24px",
    justifyContent: "center",
    gridTemplateColumns: "minmax(auto, 300px)"
  },
  songPlayerContainer: {
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      width: "100%",
      left: 0,
      bottom: 0
    }
  },
  sidebarWrapper: { position: "fixed", width: 293 }
}));

/* Layout component: /components/shared/Layout.js */
export const useLayoutStyles = makeStyles(theme => ({
  section: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: "100%",
    minWidth: "100%",
    overflow: "hidden"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexShrink: 0,
    position: "relative",
    padding: 0,
    order: 4
  },
  childrenWrapper: {
    paddingTop: 30,
    display: "flex",
    margin: 0,
    flexFlow: "row nowrap",
    maxWidth: "935px !important"
  },
  children: {
    width: "100%"
  }
}));

/* Map component: /components/Map.js */
export const useMapStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  geolocationControl: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
}));

/* Header component: /components/Header.js */
export const useHeaderStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1),
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing(2)
  }
}));

// Navbar Component /components/shared/Navbar.js
export const useNavbarStyles = makeStyles(theme => ({
  appBar: {
    background: "#ffffff !important",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    order: 0,
    zIndex: "100 !important"
  },
  section: {
    alignItems: "center",
    display: "flex",
    height: 54,
    maxWidth: 975,
    width: "100%",
    justifyContent: "center",
    padding: "0px 20px"
  },
  logoContainer: {
    display: "flex",
    flex: "1 9999 0%",
    minWidth: 40
  },
  logoWrapper: {
    flex: "0 0 auto",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "stretch"
  },
  logo: {
    marginTop: 7,
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain"
  },
  input: {
    height: 28,
    fontSize: "14px !important",
    background: "rgba(var(--b3f,250,250,250),1)",
    border: "solid 1px rgba(var(--b6a,219,219,219),1)",
    borderRadius: 3,
    color: "rgba(var(--i1d,38,38,38),1)",
    outline: 0,
    padding: "3px 3px 3px 26px",
    zIndex: 2
  },
  linksContainer: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "1 0 0%",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  linksWrapper: {
    display: "flex",
    paddingLeft: 24,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0
    },
    alignItems: "center",
    whiteSpace: "nowrap",
    "&>*:not(:last-child)": {
      marginRight: 22
    }
  },
  resultContainer: { width: 215 },
  resultWrapper: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    padding: "8px 16px"
  },
  avatarWrapper: {
    margin: "0 10px 0 0"
  },
  nameWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    position: "relative",
    "&:not(:first-child)": {
      marginLeft: 22
    }
  },
  clearIcon: {
    backgroundImage: `url(${IconSheet})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-250px -98px",
    height: 20,
    width: 20,
    cursor: "pointer"
  },
  searchIcon: {
    backgroundImage: `url(${IconSheet})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-167px -306px",
    height: 10,
    width: 10,
    left: 11,
    position: "absolute",
    top: 9,
    zIndex: 2
  },
  notifications: {
    position: "relative",
    "&::after": {
      right: 10,
      width: 4,
      bottom: "-5px",
      height: 4,
      margin: "0 auto",
      position: "absolute",
      background: "#ed4956",
      transition: "bottom .2s ease-in-out",
      borderRadius: 2,
      content: '""'
    }
  },
  profileActive: {
    border: "1px solid rgba(var(--i1d,38,38,38),1)",
    borderRadius: "50%",
    height: 28,
    marginLeft: "-3px",
    marginTop: "-3px",
    position: "absolute",
    width: "28px !important"
  },
  profileImage: {
    width: "22px !important",
    height: "22px !important",
    marginBottom: "5px !important"
  },
  followers: {
    backgroundImage: `url(${IconSheet})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-249px -160px",
    height: 16,
    width: 16,
    margin: "0 5px",
    display: "block"
  },
  likes: {
    backgroundImage: `url(${IconSheet})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-385px -126px",
    height: 18,
    width: 18,
    margin: "0 5px",
    display: "block"
  },
  tooltipContainer: {
    display: "flex",
    alignItems: "center",
    "& div": {
      margin: "0 5px"
    }
  },
  tooltip: {
    display: "flex",
    alignItems: "center"
  },
  resultLink: {
    background: "#fafafa",
    width: "100%",
    borderBottom: "solid 1px rgba(var(--b38,219,219,219),1)",
    "&:hover": {
      background: "rgba(var(--b3f,250,250,250),1)"
    }
  },
  progressBar: {
    top: 0,
    zIndex: 1031,
    left: 0,
    height: 3,
    background:
      "#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)",
    backgroundSize: "500%",
    animation:
      "2s linear infinite $LoadingBarProgress,.5s ease-out $LoadingBarEnter",
    transformOrigin: "left",
    width: "100%"
  },
  progressContainer: {
    position: "absolute",
    zIndex: 2000,
    width: "100%",
    pointerEvents: "none"
  },
  progressBackground: {
    boxShadow: "0 0 10px #29d, 0 0 5px #29d",
    display: "block",
    height: "100%",
    opacity: 1,
    position: "absolute",
    right: 0,
    transform: "rotate(3deg) translate(0px, -4px)",
    width: 100
  },
  "@keyframes LoadingBarProgress": {
    "0%": {
      backgroundPosition: "0% 0"
    },
    to: {
      backgroundPosition: "125% 0"
    }
  },
  "@keyframes LoadingBarEnter": {
    "0%": {
      transform: "scaleX(0)"
    },
    to: {
      transform: "scaleX(1)"
    }
  }
}));

export const RedTooltip = withStyles({
  popper: {
    zIndex: "1100 !important"
  },
  arrow: {
    color: "#ed4956"
  },
  tooltip: {
    backgroundColor: "#ed4956",
    color: "#fff"
  }
})(Tooltip);

export const WhiteTooltip = withStyles({
  arrow: {
    color: "#fff",
    filter: "drop-shadow(1px 0px 2px #ccc)"
  },
  tooltip: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 0,
    pointerEvents: "all",
    boxShadow: "0 0 5px 1px rgba(var(--jb7,0,0,0),.0975)"
  }
})(Tooltip);

/* Blog component: /components/Blog.js */
export const useBlogStyles = makeStyles(() => ({
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
}));

/* Pin component: /components/Pin/CreatePin.js */
export const useCreatePinStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing(1)
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%"
  },
  selectContainer: {
    backgroundColor: "grey"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0
  }
}));

/* Pin component: /components/Pin/NoContent.js */
export const useNoContentStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: "80px"
  },
  typography: {
    padding: "0 10px"
  }
}));

/* Pin component: /components/Pin/PinContent.js */
export const usePinContentStyles = makeStyles(theme => ({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

/* Comment component: /components/Comment/Comments.js */
export const useCommentsStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

/* Comment component: /components/Comment/CreateComment.js */
export const useCreateCommentStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
}));

/* Auth component: /components/Auth/Login.js */
export const useLoginStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  typography: {
    color: "rgb(66,133,244)"
  }
}));

/* Auth component: /components/Auth/Signout.js */
export const useSignoutStyles = makeStyles(() => ({
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
}));