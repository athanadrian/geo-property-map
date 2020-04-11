import React from "react";
import { useCommentsStyles } from "../../styles/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

const Comments = ({ comments }) => {
  const classes = useCommentsStyles();

  return (
    <List className={classes.root}>
      {comments.map((comment, i) => (
        <ListItem key={i} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={comment.author.picture} alt={comment.author.name} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.text}
            secondary={
              <>
                <Typography
                  className={classes.inline}
                  component="span"
                  color="textPrimary"
                >
                  {comment.author.name}
                </Typography>{" "}
                · {distanceInWordsToNow(Number(comment.createdAt))} ago
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Comments;
