// @flow
import Alert from "components/Alert";

function asyncProductInit() {
  return {
    type: "ASYNC_PRODUCT_INIT",
  };
}

export function notificationHandler(isSuccess, message) {
  return {
    type: "PRODUCT_HANDLE_NOTIFICATIONS",
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

export function getAllProducts(filters = {}) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .getAllProducts(filters)
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "GET_PRODUCTS_SUCCESS",
            payload: data,
          });
        } else {
          dispatch(
            notificationHandler(
              success,
              data.errorMessage
                ? data.errorMessage
                : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function getProduct(productCode) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .getProduct(productCode)
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "GET_PRODUCT_SUCCESS",
            payload: data,
          });
        } else {
          dispatch(
            notificationHandler(
              success,
              data.errorMessage
                ? data.errorMessage
                : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function updateProduct(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .updateProduct(payload)
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "UPDATE_PRODUCT_SUCCESS",
            payload: data,
          });
        } else {
          dispatch(
            notificationHandler(
              success,
              data.errorMessage
                ? data.errorMessage
                : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function placeOrder(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .placeOrder(payload)
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "PLACE_ORDER_SUCCESS",
          });
        }
        dispatch(
          notificationHandler(
            success,
            success
              ? "Order placed successfully"
              : "Something went wrong. Please try again"
          )
        );
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function initOrder(payload) {
  return (dispatch) => {
    dispatch({ type: "INITIATE_ORDER" });
  };
}
