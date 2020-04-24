import React, { useContext } from 'react';
import { useOwnersStyles } from '../../styles/styles';
import {
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { HighlightOff, Edit } from '@material-ui/icons';
//import { EDIT_OWNER_MUTATION } from '../../graphql/mutations';
import { DELETE_OWNER_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Owners = ({ owners, handleEditOwnerClick, handleEditOwnerButton, setOwnerRow }) => {
  const classes = useOwnersStyles();
  const client = useClient();
  const { state } = useContext(Context);
  const totalOwners = owners.length;

  handleEditOwnerClick = (owner, i) => {
    handleEditOwnerButton();
    setOwnerRow({ owner, i });
  };

  const handleDeleteOwner = async (i) => {
    const variables = { pinId: state.currentPin._id, i: i };
    await client.request(DELETE_OWNER_MUTATION, variables);
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItemTitle}>
        <Typography variant="h5" component="strong" color="primary">
          Owner{totalOwners > 1 && 's List'}
        </Typography>
      </ListItem>
      {owners.map((owner, i) => (
        <div key={i}>
          <ListItem className={classes.listItemWrapper} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar color="primary">{i + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={owner.name} secondary={`${owner.percentage} %`} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleEditOwnerClick(owner, i)}
                //handleDeleteOwner={()=>onHandleEditOwner(owner)}
              >
                <Edit className={classes.editButton} />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleDeleteOwner(i)}
              >
                <HighlightOff className={classes.deleteButton} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {i !== totalOwners - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};

export default Owners;
