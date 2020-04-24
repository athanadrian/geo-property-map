import React, { useContext } from 'react';
import { useAssetsStyles } from '../../styles/styles';
import {
  Typography,
  Divider,
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { DELETE_ASSET_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Assets = ({ assets, handleEditAssetClick, handleEditAssetButton, setAssetRow }) => {
  const classes = useAssetsStyles();
  const client = useClient();
  const { state } = useContext(Context);
  const totalAssets = assets.length;

  handleEditAssetClick = (asset, i) => {
    handleEditAssetButton();
    setAssetRow({ asset, i });
  };

  const handleDeleteAsset = async (i) => {
    const variables = { pinId: state.currentPin._id, i: i };
    await client.request(DELETE_ASSET_MUTATION, variables);
  };

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
                  {asset.rent || asset.renter ? (
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {`rent: ${asset.rent}, by ${asset.renter}.`}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Not Rented Yet
                    </Typography>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              {/* <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleEditAssetClick(asset, i)}
              >
                <Edit className={classes.editButton} />
              </IconButton> */}
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleDeleteAsset(i)}
              >
                <HighlightOff className={classes.deleteButton} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {i !== totalAssets - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};

export default Assets;
