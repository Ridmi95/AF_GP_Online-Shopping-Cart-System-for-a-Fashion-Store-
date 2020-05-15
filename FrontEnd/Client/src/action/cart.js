// @flow
import Alert from "components/Alert";

export function notificationHandler(isSuccess, message) {
  return {
    type: "CART_HANDLE_NOTIFICATIONS",
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

export function addToCart(payload) {
  return (dispatch) => {
    dispatch({ type: "ADD_TO_CART_SUCCESS", payload });
  };
}

export function removeFromCart(productCode) {
  return (dispatch) => {
    dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: { productCode } });
  };
}

export function editCartItems(payload) {
  return (dispatch) => {
    dispatch({ type: "EDIT_CART_SUCCESS", payload });
  };
}

export function handleCart() {
  return (dispatch) => {
    dispatch({ type: "HANDLE_CART_SUCCESS" });
  };
}
