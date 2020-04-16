import React from 'react';
import { usePinInfoStyles } from '../../styles/styles';
import {
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import format from 'date-fns/format';
//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const PinInfo = ({ author, createdAt, updatedAt }) => {
  const classes = usePinInfoStyles();

  return (
    <>
      <ListItem className={classes.listItemWrapper} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={author.picture} alt={author.name} />
        </ListItemAvatar>
        <ListItemText
          primary={`Created by, ${author.name}`}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Created At: {format(Number(createdAt), 'MMM Do, YYYY')}.
              </Typography>
              {` it was Updated At ${format(Number(updatedAt), 'MMM Do, YYYY')}`}
            </>
          }
        />
      </ListItem>
    </>
  );
};

export default PinInfo;
