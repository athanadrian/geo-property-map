import React, { useContext } from "react";
import { Paper } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useBlogStyles } from "../styles/styles";
import Context from "../context";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";
import PinContent from "./Pin/PinContent";

const Blog = () => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const classes = useBlogStyles();
  const { state } = useContext(Context);
  const { draft, currentPin } = state;

  let BlogContent;
  if (!draft && !currentPin) {
    BlogContent = NoContent;
  } else if (draft && !currentPin) {
    BlogContent = CreatePin;
  } else if (!draft && currentPin) {
    BlogContent = PinContent;
  }

  return (
    <Paper className={mobileSize ? classes.rootMobile : classes.root}>
      <BlogContent />
    </Paper>
  );
};

export default Blog;
