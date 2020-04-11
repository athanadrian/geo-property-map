import React, { useState, useContext } from "react";
import axios from "axios";
import { useCreatePinStyles } from "../../styles/styles";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import { useMediaQuery } from "@material-ui/core";

import Context from "../../context";
import config from "../../config";
import { useClient } from "../../client";
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";

const CreatePin = () => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const classes = useCreatePinStyles();
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteDraft = () => {
    setTitle("");
    setImage("");
    setContent("");
    setCategory("");
    dispatch({ type: "DELETE_DRAFT" });
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geopropertymap");
    data.append("cloud_name", "atana");
    const res = await axios.post(config.CLOUDINARY_API, data);

    return res.data.url;
  };

  const handleSubmit = async event => {
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
        longitude
      };
      await client.request(CREATE_PIN_MUTATION, variables);
      handleDeleteDraft();
    } catch (err) {
      setSubmitting(false);
      console.error("Error creating pin", err);
    }
  };

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} /> Pin Location
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          placeholder="Insert pin title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="category">Select a Category</InputLabel>
          <Select
            labelId="category"
            name="category"
            id="category"
            autoWidth
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"building"}>Building</MenuItem>
            <MenuItem value={"land"}>Land</MenuItem>
            <MenuItem value={"apartment"}>Apartment</MenuItem>
            <MenuItem value={"office"}>Office</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Content"
          multiline
          rows={mobileSize ? "3" : "6"}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={handleDeleteDraft}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

export default CreatePin;
