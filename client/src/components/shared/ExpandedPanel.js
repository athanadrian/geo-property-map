import React, { useState } from 'react';
import { useExpandedPanelStyles } from '../../styles/styles';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateOwner from '../Owner/CreateOwner';
import Owners from '../Owner/Owners';
import Assets from '../Asset/Assets';
import CreateAsset from '../Asset/CreateAsset';
import PinInfo from '../Pin/PinInfo';
import CreateComment from '../Comment/CreateComment';
import Comments from '../Comment/Comments';
import { AddToQueIcon } from '../../styles/icons';

export default function ExpandedPanel({
  owners,
  assets,
  comments,
  author,
  createdAt,
  updatedAt,
}) {
  const classes = useExpandedPanelStyles();
  const [expanded, setExpanded] = useState(false);
  const [isOwnerEdit, setIsOwnerEdit] = useState(false);
  const [isAssetEdit, setIsAssetEdit] = useState(false);
  const [ownerRow, setOwnerRow] = useState({}, null);
  const [assetRow, setAssetRow] = useState({}, null);

  const handleEditOwnerButton = () => {
    console.log('clicked');
    setIsOwnerEdit(true);
  };
  const handleEditAssetButton = () => {
    setIsAssetEdit(true);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <form>
      <div className={classes.root}>
        <ExpansionPanel
          className={classes.panel}
          expanded={expanded === 'owners'}
          onChange={handleChange('owners')}
        >
          <ExpansionPanelSummary
            expandIcon={<AddToQueIcon />}
            aria-controls="owners-content"
            id="owners-header"
            classes={{
              content: classes.summary,
            }}
          >
            <Typography className={classes.heading} color="primary">
              Owners ({owners.length})
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.root}>
              <CreateOwner
                isOwnerEdit={isOwnerEdit}
                setIsOwnerEdit={setIsOwnerEdit}
                ownerRow={ownerRow}
              />
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.itemRowList}>
              <Owners
                owners={owners}
                setOwnerRow={setOwnerRow}
                handleEditOwnerButton={handleEditOwnerButton}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          className={classes.panel}
          expanded={expanded === 'assets'}
          onChange={handleChange('assets')}
        >
          <ExpansionPanelSummary
            expandIcon={<AddToQueIcon />}
            aria-controls="assets-content"
            id="assets-header"
            classes={{
              content: classes.summary,
            }}
          >
            <Typography className={classes.heading} color="primary">
              Assets ({assets.length})
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.root}>
              <CreateAsset
                isAssetEdit={isAssetEdit}
                setIsAssetEdit={setIsAssetEdit}
                assetRow={assetRow}
              />
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.itemRowList}>
              <Assets
                assets={assets}
                setAssetRow={setAssetRow}
                handleEditAssetButton={handleEditAssetButton}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          className={classes.panel}
          expanded={expanded === 'comments'}
          onChange={handleChange('comments')}
        >
          <ExpansionPanelSummary
            expandIcon={<AddToQueIcon />}
            aria-controls="comments-content"
            id="comments-header"
            classes={{
              content: classes.summary,
            }}
          >
            <Typography className={classes.heading} color="primary">
              Comments ({comments.length})
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.root}>
              <CreateComment />
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.itemRowList}>
              <Comments comments={comments} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'info'} onChange={handleChange('info')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="info-content"
            id="info-header"
          >
            <Typography className={classes.heading} color="primary">
              Information
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PinInfo author={author} createdAt={createdAt} updatedAt={updatedAt} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </form>
  );
}
