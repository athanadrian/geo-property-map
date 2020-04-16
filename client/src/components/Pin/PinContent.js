import React, { useContext, useState } from 'react';
import { usePinContentStyles } from '../../styles/styles';
import {
  Edit,
  LandscapeOutlined,
  AddAPhotoTwoTone,
  Save,
  Clear,
} from '@material-ui/icons';
import {
  BuildingIcon,
  ApartmentIcon,
  MaisonetteIcon,
  LandIcon,
  OfficeIcon,
} from '../../styles/icons';
import Context from '../../context';
import {
  TextField,
  Typography,
  MenuItem,
  useMediaQuery,
  Button,
  ListItemIcon,
} from '@material-ui/core';
import ExpandedPanel from '../shared/ExpandedPanel';

const PinContent = ({ isEdit, handleCancelEdit }) => {
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const classes = usePinContentStyles();
  const { state } = useContext(Context);
  //const [image, setImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  //const [title, setTitle] = useState('');
  //const [category, setCategory] = useState('');
  const {
    title,
    category,
    content,
    image,
    author,
    createdAt,
    updatedAt,
    comments,
    owners,
    assets,
  } = state.currentPin;

  return (
    <div className={classes.blogRoot}>
      <div className={classes.wrapper}>
        <form>
          <div className={classes.itemRow}>
            <Typography
              className={classes.alignCenter}
              component="h2"
              variant="h4"
              color="primary"
            >
              {isEdit ? (
                <>
                  <Edit className={classes.iconLarge} />
                  Edit Property
                </>
              ) : (
                <>
                  <LandscapeOutlined className={classes.iconLarge} />
                  Property Info
                </>
              )}
            </Typography>
          </div>
          <div className={isEdit ? classes.itemRow : classes.itemRowInfo}>
            <div>
              <TextField
                id="title"
                label="Title"
                margin="normal"
                padding="normal"
                fullWidth={isEdit ? false : true}
                variant="outlined"
                placeholder="Insert pin title"
                disabled={!isEdit}
                value={title}
                //onChange={(e) => setTitle(e.target.value)}
              />
              {isEdit && (
                <>
                  <input
                    accept="image/*"
                    id="image"
                    type="file"
                    className={classes.input}
                    disabled={!isEdit}
                    //onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label htmlFor="image">
                    <Button
                      style={{ color: image && 'green', padding: '15px 44px' }}
                      component="span"
                      size="small"
                      variant="outlined"
                      disabled={!isEdit}
                      className={classes.button}
                    >
                      <AddAPhotoTwoTone />
                    </Button>
                  </label>
                </>
              )}
            </div>
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
              disabled={!isEdit}
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
              disabled={!isEdit}
            />
          </div>

          {isEdit && (
            <div className={classes.itemRow}>
              <Button
                //onClick={handleDeleteDraft}
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleCancelEdit}
              >
                <Clear className={classes.leftIcon} />
                Cancel
              </Button>
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={
                  !title.trim() || !content.trim() || !category || !image || submitting
                }
                //onClick={handleSubmit}
              >
                Update
                <Save className={classes.rightIcon} />
              </Button>
            </div>
          )}
        </form>
        <div className={classes.itemRow}>
          <ExpandedPanel
            owners={owners}
            assets={assets}
            comments={comments}
            author={author}
            createdAt={createdAt}
            updatedAt={updatedAt}
            //handleDeleteOwner={handleDeleteOwner}
          />
        </div>
      </div>
    </div>
  );
};

export default PinContent;
