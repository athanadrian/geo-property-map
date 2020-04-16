import React from 'react';
import { useNoContentStyles } from '../../styles/styles';
import Typography from '@material-ui/core/Typography';
import { MapIcon1, AddIcon } from '../../styles/icons';

const NoContent = () => {
  const classes = useNoContentStyles();

  return (
    <div className={classes.root}>
      <div className={classes.textWrapper}>
        <MapIcon1 className={classes.icon} />
        <Typography
          //className={mobileSize ? classes.mobile : ''}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          Click on map to add a pin
        </Typography>
      </div>
      <div className={classes.textWrapper}>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          OR
        </Typography>
      </div>
      <div className={classes.textWrapper}>
        <AddIcon className={classes.icon} />
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Add your current location
        </Typography>
      </div>
    </div>
  );
};

export default NoContent;
