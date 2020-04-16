import React, { useState, useContext } from 'react';
import { useCreateAssetStyles } from '../../styles/styles';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  ListItemIcon,
  FormControlLabel,
  Divider,
} from '@material-ui/core';
import { ApartmentIcon, MaisonetteIcon, OfficeIcon } from '../../styles/icons';
import { CREATE_ASSET_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

const CreateAsset = () => {
  const classes = useCreateAssetStyles();
  const client = useClient();
  const { state } = useContext(Context);
  const [codeName, setCodeName] = useState('');
  const [category, setCategory] = useState('');
  const [isRented, setIsRented] = useState(false);
  const [renter, setRenter] = useState('');
  const [rent, setRent] = useState('');

  const handleSubmitAsset = async () => {
    const variables = {
      pinId: state.currentPin._id,
      codeName,
      category,
      isRented,
      renter,
      rent,
    };
    console.log('variables', variables);
    try {
      await client.request(CREATE_ASSET_MUTATION, variables);
      setCodeName('');
      setIsRented(false);
      setCategory('');
      setRenter('');
      setRent('');
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <>
      <div className={classes.itemRow}>
        {/* <div className={classes.textWrapper}> */}
        <TextField
          id="codeName"
          label="Code Name"
          margin="normal"
          padding="normal"
          variant="outlined"
          placeholder="Insert code name"
          value={codeName}
          onChange={(e) => setCodeName(e.target.value)}
        />
        <TextField
          id="category"
          select
          label="Category"
          value={category}
          helperText="Please select a category"
          margin="normal"
          variant="outlined"
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'apartment'}>
            <ListItemIcon>
              <ApartmentIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Apartment</Typography>
          </MenuItem>
          <MenuItem value={'maisonette'}>
            <ListItemIcon>
              <MaisonetteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Maisonette</Typography>
          </MenuItem>
          <MenuItem value={'office'}>
            <ListItemIcon>
              <OfficeIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Office</Typography>
          </MenuItem>
          <MenuItem value={'warehouse'}>
            <ListItemIcon>
              <OfficeIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Warehouse</Typography>
          </MenuItem>
        </TextField>
      </div>
      {/* </div> */}

      <div className={classes.itemRow}>
        <FormControlLabel
          control={
            <Checkbox
              //label="The Asset is Rented."
              name="checkedB"
              checked={isRented}
              value={isRented}
              onChange={(e) => setIsRented(e.target.checked)}
            />
          }
          label="The Asset is Rented."
        />
      </div>
      {isRented && (
        <div className={classes.itemRow}>
          <TextField
            id="renter"
            select
            label="Renter"
            value={renter}
            helperText="Select a Renterr"
            margin="normal"
            padding="normal"
            variant="outlined"
            onChange={(e) => setRenter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'endered'}>
              <Typography variant="inherit">Endered</Typography>
            </MenuItem>
            <MenuItem value={'euroPisti'}>
              <Typography variant="inherit">Europaiki Pisti</Typography>
            </MenuItem>
            <MenuItem value={'kanelakis'}>
              <Typography variant="inherit">Kanellakis</Typography>
            </MenuItem>
            <MenuItem value={'horevas'}>
              <Typography variant="inherit">Horevas-Citroen</Typography>
            </MenuItem>
            <MenuItem value={'pan'}>
              <Typography variant="inherit">Other</Typography>
            </MenuItem>
          </TextField>
          <TextField
            id="rent"
            label="Rent"
            margin="normal"
            padding="normal"
            //type="number"
            helperText="Define Rent"
            variant="outlined"
            fullWidth
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>
      )}
      <div className={classes.itemRowButton}>
        <Button
          variant={!category || !codeName ? 'outlined' : 'contained'}
          color="primary"
          onClick={handleSubmitAsset}
          disabled={!category || !codeName}
          className={
            !category || !codeName ? classes.sendButtonNotValid : classes.sendButtonValid
          }
        >
          Add
        </Button>
      </div>
      <Divider />
    </>
  );
};

export default CreateAsset;
