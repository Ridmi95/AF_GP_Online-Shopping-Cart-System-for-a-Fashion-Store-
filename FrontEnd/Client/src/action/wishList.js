// @flow
import Alert from "components/Alert";

export function notificationHandler(isSuccess, message) {
  return {
    type: "WISH_LIST_HANDLE_NOTIFICATIONS",
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

export function addToWishList(payload) {
  return (dispatch) => {
    dispatch({ type: "ADD_TO_WISH_LIST_SUCCESS", payload });
  };
}

export function removeFromWishList(productCode) {
  return (dispatch) => {
    dispatch({ type: "REMOVE_FROM_WISH_LIST_SUCCESS", payload: { productCode } });
  };
}