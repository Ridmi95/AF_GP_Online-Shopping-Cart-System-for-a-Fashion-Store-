// @flow
import React, { Component, Fragment } from "react";

import Button from "components/button";

import "./styles.scss";

class LoginAlert extends Component {
  render() {
    return (
      <Fragment>
        <div className="login-message">
          <div>
            <p>Please login to view prices</p>
          </div>
          <div className="product-login-button">
            <Button htmlType={Button.HTML_TYPE.LINK} link="/signIn">
              Click here to sign in
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoginAlert;
