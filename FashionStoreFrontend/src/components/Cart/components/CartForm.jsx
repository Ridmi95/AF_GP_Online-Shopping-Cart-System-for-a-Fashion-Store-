// @flow
import React, { PureComponent } from "react";
import {
  type AsyncStatusType,
  type NotificationType
} from "shared/types/General";

import Loader from "components/loader";
import Row from "components/Row";
import Col from "components/Col";
import ImagePlaceHolder from "assets/image/product-image-placeholder.png";
import Icon from "components/icon";
import classNames from "classnames";
import Alert from "components/Alert";
import Button from "components/button";

import { ASYNC_STATUS } from "constants/async";

import "../styles.scss";

type CartProps = {
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

type CartState = {
  open: boolean,
  disabled: boolean
};

class CartForm extends PureComponent<CartProps, CartState> {
  constructor(props) {
    super(props);

    if (this.props.cartItems && this.props.cartItems.length > 0) {
      this.props.cartItems.map(item => {
        return (this[`${item.product.productCode}-ref`] = React.createRef());
      });
    }

    this.state = {
      disabled:
        this.props.cartItems.length > 0
          ? this.props.cartItems.map(({ product }) => {
              return { id: product.productCode, disable: true };
            })
          : ""
    };

    this.textInput = React.createRef();

    //$FlowFixMe
    this.focusTextInput = this.focusTextInput.bind(this);
    //$FlowFixMe
    this.handleCartModal = this.handleCartModal.bind(this);
    //$FlowFixMe
    this.disableInput = this.disableInput.bind(this);
    //$FlowFixMe
    this.removeProducts = this.removeProducts.bind(this);
    //$FlowFixMe
    this.changeItemQuantity = this.changeItemQuantity.bind(this);
  }

  focusTextInput(productCode) {
    const { disabled } = this.state;

    const updatedInputList = disabled.map(field => {
      if (productCode === field.id) {
        return {
          ...field,
          disable: false
        };
      }
      return {
        ...field
      };
    });

    this.setState(
      {
        ...this.state,
        disabled: [...updatedInputList]
      },
      () => this[`${productCode}-ref`].current.focus()
    );
  }

  disableInput(selectedProductCode) {
    const { editCartItems, cartItems } = this.props;
    const { disabled } = this.state;

    const updatedProduct = cartItems.filter(({ product }) => {
      return product.productCode === selectedProductCode;
    });

    editCartItems(
      {
        product: [
          {
            productCode: updatedProduct[0].product.productCode,
            productTenantId: updatedProduct[0].product.productTenantId,
            quantity: updatedProduct[0].quantity,
            shippingCountry: updatedProduct[0].shippingCountry,
            shippingCost: updatedProduct[0].shippingCost,
            price: updatedProduct[0].price
          }
        ]
      },
      { page: 1, pageSize: 50 }
    );

    const updatedInputList = disabled.map(field => {
      if (selectedProductCode === field.id) {
        return {
          ...field,
          disable: true
        };
      }
      return {
        ...field
      };
    });

    this.setState({
      ...this.state,
      disabled: [...updatedInputList]
    });
  }

  handleCartModal() {
    this.props.handleCart();
  }

  removeProducts(productCode, tenantId) {
    const { removeCartItems } = this.props;

    removeCartItems(
      { productCode: productCode, productTenantId: tenantId },
      { page: 1, pageSize: 50 }
    );
  }

  changeItemQuantity(productCode, value) {
    const { onEditCArtItems } = this.props;

    onEditCArtItems({ productCode, value: value.target.value });
  }

  render() {
    const { status, cartItems, notification, baseCurrency } = this.props;
    const { disabled } = this.state;

    let subTotal = 0;
    cartItems.length > 0 &&
      cartItems.map(({ price }) => {
        subTotal = subTotal + price;
        return null;
      });

    let shippingTotal = 0;
    cartItems.length > 0 &&
      cartItems.map(({ shippingCost }) => {
        shippingTotal = shippingTotal + shippingCost;
        return null;
      });

    return (
      <div
        className={classNames("cart-modal-container", {
          open: this.props.open
        })}
      >
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        {status === ASYNC_STATUS.LOADING ? (
          <Loader isLoading />
        ) : (
          <div className="cart-content">
            <Row>
              <Col size="10">
                <h2>Cart</h2>
              </Col>
              <Col size="2" className="close-icon-container">
                <Icon
                  icon="chevron-down"
                  onClick={this.handleCartModal}
                  className="close-icn"
                />
              </Col>
            </Row>
            {cartItems.length > 0 &&
              cartItems.map((item, index) => {
                return (
                  <Row key={index}>
                    <Col className="cart-item-body">
                      <div className="cart-image-container">
                        <div className="cart-image">
                          <img
                            src={
                              item.product.images.length > 0
                                ? item.product.images[0].url
                                  ? item.product.images[0].url
                                  : ImagePlaceHolder
                                : ImagePlaceHolder
                            }
                            alt={`cart-img-${index}`}
                            className="cart-image"
                          />
                        </div>
                      </div>
                      <div className="cart-item-details-container">
                        <Row className="cart-item-header">
                          <Col sm={12} md={7}>
                            <div className="cart-item-name">
                              {item.product.productName}
                            </div>
                          </Col>
                          <Col sm={12} md={4}>
                            <div className="cart-item-price">{`${baseCurrency} ${item.price}`}</div>
                          </Col>
                        </Row>
                        <Row className="cart-item-details">
                          <Col>
                            <Row>
                              <Col>
                                <div className="cart-item-country">
                                  {`Shipping from: ${item.shippingCountry}`}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="cart-item-shipping">
                                  {`Shipping: ${item.shippingCost}`}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="cart-item-quantity-container">
                                <div className="main-quantity-container">
                                  <div className="cart-item-quantity">
                                    {disabled.map(
                                      field =>
                                        field.id ===
                                          item.product.productCode && (
                                          <input
                                            key={field.id}
                                            type="number"
                                            value={item.quantity}
                                            disabled={field.disable}
                                            ref={
                                              this[
                                                `${item.product.productCode}-ref`
                                              ]
                                            }
                                            onBlur={() =>
                                              this.disableInput(
                                                item.product.productCode
                                              )
                                            }
                                            onChange={quantity =>
                                              this.changeItemQuantity(
                                                item.product.productCode,
                                                quantity
                                              )
                                            }
                                          />
                                        )
                                    )}
                                  </div>
                                  <div className="cart-item-unit">Unit</div>
                                </div>
                                <div
                                  className="cart-item-edit"
                                  onClick={() =>
                                    this.focusTextInput(
                                      item.product.productCode
                                    )
                                  }
                                >
                                  Edit
                                </div>
                              </Col>
                              <Col size="3">
                                <div
                                  className="cart-item-remove"
                                  onClick={() =>
                                    this.removeProducts(
                                      item.product.productCode,
                                      item.productTenantId
                                    )
                                  }
                                >
                                  Remove
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                );
              })}
            <Row>
              <Col>
                <div className="billing-details">
                  <Row>
                    <Col>
                      <div className="billing-details-label">Sub Total</div>
                    </Col>
                    <Col>
                      <div>{`${baseCurrency} ${subTotal}`}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="billing-details-label">Shipping</div>
                    </Col>
                    <Col>
                      <div>{`${baseCurrency} ${shippingTotal}`}</div>
                    </Col>
                  </Row>
                  <Row className="billing-detail-total">
                    <Col>
                      <div className="billing-details-label">Total</div>
                    </Col>
                    <Col>
                      <div>{`${baseCurrency} ${subTotal + shippingTotal}`}</div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="button-checkout">
                  <Button>Check out</Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default CartForm;
