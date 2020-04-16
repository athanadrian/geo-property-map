import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useCreatePinStyles } from '../../styles/styles';
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  useMediaQuery,
  ListItemIcon,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import {
  BuildingIcon,
  ApartmentIcon,
  MaisonetteIcon,
  LandIcon,
  OfficeIcon,
} from '../../styles/icons';
import { Clear, SaveTwoTone } from '@material-ui/icons';
import Context from '../../context';
import config from '../../config';
import { useClient } from '../../client';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

const CreatePin = () => {
  const client = useClient();
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const classes = useCreatePinStyles();
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteDraft = () => {
    setTitle('');
    setImage('');
    setContent('');
    setCategory('');
    dispatch({ type: 'DELETE_DRAFT' });
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'geopropertymap');
    data.append('cloud_name', 'atana');
    const res = await axios.post(config.CLOUDINARY_API, data);

    return res.data.url;
  };
  console.log('ctxo', state.owners);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;

      const variables = {
        title,
        category,
        image: url,
        content,
        latitude,
        longitude,
      };
      await client.request(CREATE_PIN_MUTATION, variables);
      handleDeleteDraft();
    } catch (err) {
      setSubmitting(false);
      console.error('Error creating pin', err);
    }
  };

  return (
    <form>
      <div className={classes.blogRoot}>
        <div className={classes.wrapper}>
          <div className={classes.itemRow}>
            <Typography
              className={classes.alignCenter}
              component="h2"
              variant="h4"
              color="primary"
            >
              <LandscapeIcon className={classes.iconLarge} /> Pin Property
            </Typography>
          </div>
          <div className={classes.itemRow}>
            <TextField
              id="title"
              label="Title"
              margin="normal"
              padding="normal"
              variant="outlined"
              placeholder="Insert pin title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              accept="image/*"
              id="image"
              type="file"
              className={classes.input}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="image">
              <Button
                style={{ color: image && 'green', padding: '15px 44px' }}
                component="span"
                size="small"
                variant="outlined"
                className={classes.button}
              >
                <AddAPhotoIcon />
              </Button>
            </label>
          </div>
          <div className={classes.itemRow}>
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
              <MenuItem value={'building'}>
                <ListItemIcon>
                  <BuildingIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Building</Typography>
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
              <MenuItem value={'land'}>
                <ListItemIcon>
                  <LandIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Land</Typography>
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
          <div className={classes.itemRow}>
            <TextField
              id="content"
              label="Content"
              multiline
              rows={mobileSize ? '1' : '3'}
              margin="normal"
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={classes.itemRow}>
            <Button
              onClick={handleDeleteDraft}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Clear className={classes.leftIcon} />
              Discard
            </Button>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="secondary"
              disabled={
                !title.trim() || !content.trim() || !category || !image || submitting
              }
              onClick={handleSubmit}
            >
              Submit
              <SaveTwoTone className={classes.rightIcon} />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePin;
