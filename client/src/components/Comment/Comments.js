import React from 'react';
import { useCommentsStyles } from '../../styles/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from '@material-ui/core';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Comments = ({ comments }) => {
  const classes = useCommentsStyles();
  const totalComments = comments.length;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItemTitle}>
        <Typography variant="h5" component="strong" color="primary">
          Comment{totalComments > 1 && 's List'}
        </Typography>
      </ListItem>
      {comments.map((comment, i) => (
        <div key={i}>
          <ListItem className={classes.listItemWrapper} alignItems="flex-start">
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
                  </Typography>{' '}
                  · {distanceInWordsToNow(Number(comment.createdAt))} ago
                </>
              }
            />
          </ListItem>
          {i !== totalComments - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};

export default Comments;
