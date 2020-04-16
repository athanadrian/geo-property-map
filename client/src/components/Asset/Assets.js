import React from 'react';
import { useAssetsStyles } from '../../styles/styles';
import {
  Typography,
  Divider,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Assets = ({ assets }) => {
  const classes = useAssetsStyles();
  const totalAssets = assets.length;

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItemTitle}>
        <Typography variant="h5" component="strong" color="primary">
          Asset{totalAssets > 1 && 's List'}
        </Typography>
      </ListItem>
      {assets.map((asset, i) => (
        <div key={i}>
          <ListItem className={classes.listItemWrapper} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{i + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={asset.codeName}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    rent: {asset.rent}.
                  </Typography>
                  {` it is rented to ${asset.renter}`}
                </>
              }
            />
          </ListItem>
          {i !== totalAssets - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};

export default Assets;
