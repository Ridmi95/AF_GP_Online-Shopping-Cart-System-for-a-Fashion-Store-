// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  type AsyncStatusType,
  type NotificationType
} from "shared/types/General";

import CartForm from "./components/CartForm";
import Loader from "components/loader";
import classNames from "classnames";

import {
  getCartItems,
  removeCartItems,
  editCartItems,
  onEditCArtItems,
  handleCart
} from "action/cart";
import { ASYNC_STATUS } from "constants/async";
import { getUserBaseCurrency } from "selectors/product";

import "./styles.scss";

type CartProps = {
  getCartItems: Function,
  cartItems: Array<any>,
  status: AsyncStatusType,
  notification: NotificationType,
  removeCartItems: Function,
  editCartItems: Function,
  onEditCArtItems: Function,
  handleCart: Function,
  open: boolean,
  baseCurrency: string
};

class Cart extends PureComponent<CartProps, CartState> {
  componentDidMount() {
    const { getCartItems } = this.props;

    getCartItems({ page: 1, pageSize: 50 });
  }

  render() {
    const {
      cartItems,
      status,
      notification,
      removeCartItems,
      editCartItems,
      onEditCArtItems,
      handleCart,
      open,
      baseCurrency
    } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <div
          className={classNames("cart-modal-container", {
            open: this.props.open
          })}
        >
          <Loader isLoading />
        </div>
      );
    }

    return (
      cartItems !== null && (
        <CartForm
          cartItems={cartItems}
          status={status}
          notification={notification}
          removeCartItems={removeCartItems}
          editCartItems={editCartItems}
          onEditCArtItems={onEditCArtItems}
          handleCart={handleCart}
          open={open}
          baseCurrency={baseCurrency}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    status: state.cart.status,
    notification: state.cart.notification,
    open: state.cart.open,
    baseCurrency: getUserBaseCurrency(state)
  };
};

const Action = {
  getCartItems,
  removeCartItems,
  editCartItems,
  onEditCArtItems,
  handleCart
};

export default connect(mapStateToProps, Action)(Cart);
