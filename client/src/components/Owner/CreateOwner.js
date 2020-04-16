import React, { useState, useContext } from 'react';
import { useCreateOwnerStyles } from '../../styles/styles';
import { Typography, TextField, MenuItem, Button, Divider } from '@material-ui/core';
import { CREATE_OWNER_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

const CreateOwner = () => {
  const classes = useCreateOwnerStyles();
  const client = useClient();
  const { state } = useContext(Context);
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');

  const handleSubmitOwner = async () => {
    const variables = { pinId: state.currentPin._id, name: name, percentage: percentage };
    await client.request(CREATE_OWNER_MUTATION, variables);
    setName('');
    setPercentage('');
  };

  return (
    <>
      <div className={classes.itemRow}>
        <TextField
          id="name"
          select
          label="Owner"
          value={name}
          helperText="Select an owner"
          margin="normal"
          padding="normal"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
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
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
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
      </div>
      <Divider />
    </>
  );
};

export default CreateOwner;
