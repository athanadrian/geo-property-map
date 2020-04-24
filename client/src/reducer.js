export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload,
      };
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: payload,
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    case 'CREATE_DRAFT':
      return {
        ...state,
        currentPin: null,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      };
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload,
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null,
      };
    case 'GET_PINS':
      return {
        ...state,
        pins: payload,
      };
    case 'CREATE_PIN':
      let newPin = payload;
      const prevPins = state.pins.filter((pin) => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin],
        currentPin: newPin,
      };
    case 'SET_PIN':
      return {
        ...state,
        currentPin: payload,
        draft: null,
      };
    case 'DELETE_PIN':
      const deletedPin = payload;
      const filteredPins = state.pins.filter((pin) => pin._id !== deletedPin._id);
      if (state.currentPin) {
        const isCurrentPin = deletedPin._id === state.currentPin._id;
        if (isCurrentPin) {
          return {
            ...state,
            pins: filteredPins,
            currentPin: null,
          };
        }
      }
      return {
        ...state,
        pins: filteredPins,
      };
    // case 'CREATE_COMMENT':
    //   const updatedCommentCurrentPin = payload;
    //   // find and replace
    //   const updatedCommentPins = state.pins.map((pin) =>
    //     pin._id === updatedCommentCurrentPin._id ? updatedCommentCurrentPin : pin
    //   );
    //   return {
    //     ...state,
    //     pins: updatedCommentPins,
    //     currentPin: updatedCommentCurrentPin,
    //   };
    case 'UPDATE_PIN':
      const updatedCurrentPin = payload;
      // find and replace
      const updatedPins = state.pins.map((pin) =>
        pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin
      );
      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin,
      };
    // case 'CREATE_OWNER':
    //   const upOwnerCurrentPin = payload;
    //   // find and replace
    //   const updatedOwnerPins = state.pins.map((pin) =>
    //     pin._id === upOwnerCurrentPin._id ? upOwnerCurrentPin : pin
    //   );
    //   return {
    //     ...state,
    //     pins: updatedOwnerPins,
    //     currentPin: upOwnerCurrentPin,
    //   };
    // case 'DELETE_OWNER':
    //   const deletedOwnerCurrentPin = payload;
    //   // find and replace
    //   const deletedOwnerPins = state.pins.map((pin) =>
    //     pin._id === deletedOwnerCurrentPin._id ? deletedOwnerCurrentPin : pin
    //   );
    //   return {
    //     ...state,
    //     pins: deletedOwnerPins,
    //     currentPin: deletedOwnerCurrentPin,
    //   };
    // case 'CREATE_ASSET':
    //   const upAssetCurrentPin = payload;
    //   // find and replace
    //   const upAssetPins = state.pins.map((pin) =>
    //     pin._id === upAssetCurrentPin._id ? upAssetCurrentPin : pin
    //   );
    //   return {
    //     ...state,
    //     pins: upAssetPins,
    //     currentPin: upAssetCurrentPin,
    //   };
    // case 'DELETE_ASSET':
    //   const deletedAssetCurrentPin = payload;
    //   // find and replace
    //   const deletedAssetPins = state.pins.map((pin) =>
    //     pin._id === deletedAssetCurrentPin._id ? deletedAssetCurrentPin : pin
    //   );
    //   return {
    //     ...state,
    //     pins: deletedAssetPins,
    //     currentPin: deletedAssetCurrentPin,
    //   };
    default:
      return state;
  }
}
