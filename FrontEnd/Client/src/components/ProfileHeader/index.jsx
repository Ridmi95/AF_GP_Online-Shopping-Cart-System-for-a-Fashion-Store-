// @flow
import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";

import Link from "components/Link";
import buyportLogo from "assets/image/buyport-logo.svg";
import Button from "components/button";
import IconButton from "components/IconButton";

import { authSignOut } from "action/auth";

import "./styles.scss";


class Header extends PureComponent<> {
  render() {
    return (
      <Fragment>
        <div className="header">
          <div className="container">
            <div className="site-logo">
              <Link to="/">
                <img src={buyportLogo} alt="Buyport Logo" />
              </Link>
            </div>
            <div className="top-menu-container">
              <div className="button-container">
                <span className="username-container">hi pathum!</span>
                <IconButton icon="menu" onClick={() => {}}></IconButton>
                <IconButton icon="menu" onClick={() => {}}></IconButton>
                <IconButton icon="cart" onClick={() => {}}></IconButton>
                <Button onClick={() => {}}>ERP</Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.errors,
    isAuthSuccess: state.auth.isAuthSuccess,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    status: state.auth.status
  };
}

const Actions = { authSignOut };

export default connect(mapStateToProps, Actions)(Header);
