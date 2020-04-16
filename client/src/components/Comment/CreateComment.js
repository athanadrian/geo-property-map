import React, { useState, useContext } from 'react';
import { useCreateCommentStyles } from '../../styles/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';

import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';
import Context from '../../context';

const CreateComment = () => {
  const classes = useCreateCommentStyles();
  const client = useClient();
  const { state } = useContext(Context);
  const [comment, setComment] = useState('');

  const handleSubmitComment = async () => {
    const variables = { pinId: state.currentPin._id, text: comment };
    await client.request(CREATE_COMMENT_MUTATION, variables);
    setComment('');
  };

  return (
    <>
      <div className={classes.itemRow}>
        <IconButton
          onClick={() => setComment('')}
          disabled={!comment.trim()}
          className={classes.clearButton}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Add Comment"
          multiline={true}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={handleSubmitComment}
          disabled={!comment.trim()}
          className={
            comment.trim() ? classes.sendButtonNotValid : classes.sendButtonValid
          }
        >
          <SendIcon />
        </IconButton>
      </div>
      <Divider />
    </>
  );
};

export default CreateComment;
