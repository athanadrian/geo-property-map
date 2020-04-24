import React, { useState, useContext } from 'react';
import { useCreateOwnerStyles } from '../../styles/styles';
import { Typography, TextField, MenuItem, Button, Divider } from '@material-ui/core';
import { CREATE_OWNER_MUTATION } from '../../graphql/mutations';
import { UPDATE_OWNER_MUTATION } from '../../graphql/mutations';
//import EditableInput from '../shared/EditableInput';
import { useClient } from '../../client';
import Context from '../../context';

const CreateOwner = ({ isOwnerEdit, setIsOwnerEdit, handleEditOwner, ownerRow }) => {
  const classes = useCreateOwnerStyles();
  const client = useClient();
  const { state } = useContext(Context);
  let [name, setName] = useState('');
  let [percentage, setPercentage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { owner, i } = ownerRow;

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePercentage = (e) => {
    setPercentage(e.target.value);
  };

  const handleOnFocus = () => {
    console.log('focus');
    if (isOwnerEdit) {
      setIsEditing(true);
      setIsOwnerEdit(false);
    }
  };

  const handleSubmitOwner = async () => {
    const variables = { pinId: state.currentPin._id, name: name, percentage: percentage };
    await client.request(CREATE_OWNER_MUTATION, variables);
    setName('');
    setPercentage('');
  };

  handleEditOwner = async () => {
    const variables = {
      pinId: state.currentPin._id,
      i,
      name,
      percentage,
    };
    console.log('vars', variables);
    await client.request(UPDATE_OWNER_MUTATION, variables);
    setName('');
    setPercentage('');
    setIsEditing(false);
  };

  if (isOwnerEdit) {
    name = owner.name;
    percentage = owner.percentage;
  }

  return (
    <>
      <div className={classes.itemRow}>
        <TextField
          id="name"
          select
          label="Owner"
          value={!isOwnerEdit ? name : owner.name}
          helperText="Select an owner"
          margin="normal"
          padding="normal"
          variant="outlined"
          onFocus={handleOnFocus}
          onChange={handleChangeName}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'nikos'}>
            <Typography variant="inherit">Nikos</Typography>
          </MenuItem>
          <MenuItem value={'haroula'}>
            <Typography variant="inherit">Haroula</Typography>
          </MenuItem>
          <MenuItem value={'lily'}>
            <Typography variant="inherit">Lily</Typography>
          </MenuItem>
          <MenuItem value={'maria'}>
            <Typography variant="inherit">Maria</Typography>
          </MenuItem>
          <MenuItem value={'pan'}>
            <Typography variant="inherit">PAN</Typography>
          </MenuItem>
        </TextField>
        <TextField
          id="percentage"
          label="Percentage"
          select
          margin="normal"
          padding="normal"
          helperText="Select percentage"
          variant="outlined"
          fullWidth
          onFocus={handleOnFocus}
          value={!isOwnerEdit ? percentage : owner.percentage}
          onChange={handleChangePercentage}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'10'}>
            <Typography variant="inherit">10%</Typography>
          </MenuItem>
          <MenuItem value={'20'}>
            <Typography variant="inherit">20%</Typography>
          </MenuItem>
          <MenuItem value={'25'}>
            <Typography variant="inherit">25%</Typography>
          </MenuItem>
          <MenuItem value={'30'}>
            <Typography variant="inherit">30%</Typography>
          </MenuItem>
          <MenuItem value={'33'}>
            <Typography variant="inherit">33%</Typography>
          </MenuItem>
          <MenuItem value={'40'}>
            <Typography variant="inherit">40%</Typography>
          </MenuItem>
          <MenuItem value={'45'}>
            <Typography variant="inherit">45%</Typography>
          </MenuItem>
          <MenuItem value={'50'}>
            <Typography variant="inherit">50%</Typography>
          </MenuItem>
          <MenuItem value={'60'}>
            <Typography variant="inherit">60%</Typography>
          </MenuItem>
          <MenuItem value={'66'}>
            <Typography variant="inherit">66%</Typography>
          </MenuItem>
          <MenuItem value={'75'}>
            <Typography variant="inherit">75%</Typography>
          </MenuItem>
          <MenuItem value={'80'}>
            <Typography variant="inherit">80%</Typography>
          </MenuItem>
          <MenuItem value={'100'}>
            <Typography variant="inherit">100%</Typography>
          </MenuItem>
        </TextField>
      </div>
      <div className={classes.itemRowButton}>
        {!isOwnerEdit && !isEditing ? (
          <Button
            variant={!name || !percentage ? 'outlined' : 'contained'}
            onClick={handleSubmitOwner}
            color="primary"
            disabled={!name || !percentage}
            className={
              !name || !percentage ? classes.sendButtonNotValid : classes.sendButtonValid
            }
          >
            Add
          </Button>
        ) : (
          <Button
            variant={!name || !percentage ? 'outlined' : 'contained'}
            onClick={handleEditOwner}
            color="primary"
            disabled={!name || !percentage}
            className={
              !name || !percentage ? classes.sendButtonNotValid : classes.sendButtonValid
            }
          >
            Edit
          </Button>
        )}
      </div>
      <Divider />
    </>
  );
};

export default CreateOwner;
