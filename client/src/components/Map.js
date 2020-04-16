import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { useMapStyles } from '../styles/styles';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete, Edit } from '@material-ui/icons';
import { useMediaQuery } from '@material-ui/core';
import { Subscription } from 'react-apollo';

import { useClient } from '../client';
import config from '../config';
import { GET_PINS_QUERY } from '../graphql/queries';
import { DELETE_PIN_MUTATION } from '../graphql/mutations';
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION,
} from '../graphql/subscriptions';
import PinIcon from './PinIcon';
import Blog from './Blog';
import Context from '../context';

const { HOME, MAPBOX_KEY } = config;
const INITIAL_VIEWPORT = {
  latitude: HOME.longitude,
  longitude: HOME.latitude,
  zoom: 13,
};

const Map = () => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const classes = useMapStyles();

  useEffect(() => {
    getPins();
  }, []);

  const handleOnChangeViewPort = (viewport) => {
    setViewport(viewport);
  };
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  useEffect(() => {
    getUserPosition();
  }, []);
  const [popup, setPopup] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  // remove popup if pin itself is deleted by the author of the pin
  useEffect(() => {
    const pinExists = popup && state.pins.findIndex((pin) => pin._id === popup._id) > -1;
    if (!pinExists) {
      setPopup(null);
    }
  }, [popup, state.pins]);

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY);
    dispatch({ type: 'GET_PINS', payload: getPins });
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude },
    });
  };
  const handleAddPinCurrentLocation = ({ leftButton }) => {
    //if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    console.log('cl', userPosition);
    const [longitude, latitude] = [userPosition.longitude, userPosition.latitude];
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude },
    });
  };

  const highlightNewPin = (pin) => {
    const isNewPin = differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isNewPin ? 'limegreen' : 'darkblue';
  };

  const handleSelectPin = (pin) => {
    setPopup(pin);
    dispatch({ type: 'SET_PIN', payload: pin });
  };

  const isAuthUser = () => state.currentUser._id === popup.author._id;

  const handleCancelEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEditPin = async (pin) => {
    console.log('edit pin');
    handleCancelEdit();
    // const variables = { pinId: pin._id };
    // await client.request(UPDATE_PIN_MUTATION, variables);
    // setPopup(null);
  };

  const handleDeletePin = async (pin) => {
    const variables = { pinId: pin._id };
    await client.request(DELETE_PIN_MUTATION, variables);
    setPopup(null);
  };

  return (
    <div className={mobileSize ? classes.rootMobile : classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={MAPBOX_KEY}
        scrollZoom={!mobileSize}
        onViewportChange={handleOnChangeViewPort}
        onClick={handleMapClick}
        {...viewport}
      >
        {/* Navigation Control */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={(newViewport) => setViewport(newViewport)}
          />
        </div>

        {/* Pin for User's Current Position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" onClick={handleAddPinCurrentLocation} />
          </Marker>
        )}

        {/* Draft Pin */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}

        {/* Created Pins */}
        {state.pins.map((pin) => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              onClick={() => handleSelectPin(pin)}
              size={40}
              color={highlightNewPin(pin)}
            />
          </Marker>
        ))}

        {/* Popup Dialog for Created Pins */}
        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <>
              <img className={classes.popupImage} src={popup.image} alt={popup.title} />
              <div className={classes.popupTab}>
                <Typography>
                  {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
                </Typography>
                {isAuthUser() && (
                  <div className={classes.actionButtons}>
                    <Button variant="outlined" onClick={() => handleDeletePin(popup)}>
                      <Delete className={classes.deleteIcon} />
                    </Button>
                    <Button variant="outlined" onClick={() => handleEditPin(popup)}>
                      <Edit className={classes.editIcon} />
                    </Button>
                  </div>
                )}
              </div>
            </>
          </Popup>
        )}
      </ReactMapGL>

      {/* Subscriptions for Creating / Updating / Deleting Pins */}
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data;
          console.log({ pinAdded });
          dispatch({ type: 'CREATE_PIN', payload: pinAdded });
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          console.log({ pinUpdated });
          dispatch({ type: 'CREATE_ASSET', payload: pinUpdated });
          dispatch({ type: 'CREATE_OWNER', payload: pinUpdated });
          dispatch({ type: 'CREATE_ASSET', payload: pinUpdated });
          dispatch({ type: 'DELETE_OWNER', payload: pinUpdated });
        }}
      />
      <Subscription
        subscription={PIN_DELETED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinDeleted } = subscriptionData.data;
          console.log({ pinDeleted });
          dispatch({ type: 'DELETE_PIN', payload: pinDeleted });
        }}
      />

      {/* Blog Area to add Pin Content */}
      <Blog isEdit={isEdit} handleCancelEdit={handleCancelEdit} />
    </div>
  );
};

export default Map;
