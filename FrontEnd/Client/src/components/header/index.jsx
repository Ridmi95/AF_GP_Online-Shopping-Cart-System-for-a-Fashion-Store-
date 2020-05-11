// @flow
import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Link from "components/Link";
import buyportLogo from "assets/image/buyport-logo.svg";
import Input from "components/Input";
import Button from "components/button";
import ButtonDropdown from "components/ButtonDropdown";

import { getLoggedUserName } from "selectors/auth";
import { authSignOut } from "action/auth";
import { ASYNC_STATUS } from "constants/async";
import { handleCart } from "action/cart";

import "./styles.scss";
import Icon from "components/icon";

type HeaderProps = {
  isAuthenticated: Boolean,
  toggleAuth: Function,
  displayAuth: boolean,
  user: Object,
  status: AsyncStatusType,
  authSignOut: Function,
  userName: string,
  searchable?: boolean,
  handleCart: Function
};

type HeaderState = {
  isSignUpClicked: Boolean,
  isSignInClicked: Boolean,
  searchProduct: Boolean,
  searchText: string
};

class Header extends PureComponent<HeaderProps, HeaderState> {
  static defaultProps = {
    searchable: true
  };
  constructor(props) {
    super(props);

    this.state = {
      isSignUpClicked: false,
      isSignInClicked: false,
      searchProduct: false,
      searchText: ""
    };
    //$FlowFixMe
    this.handleSingUpButtonClick = this.handleSingUpButtonClick.bind(this);
    //$FlowFixMe
    this.handleSignInButtonClick = this.handleSignInButtonClick.bind(this);
    //$FlowFixMe
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    //$FlowFixMe
    this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
  }

  handleSignInButtonClick() {
    this.setState({
      ...this.state,
      isSignInClicked: !this.state.isSignInClicked
    });
  }

  handleSingUpButtonClick() {
    this.setState({
      ...this.state,
      isSignUpClicked: !this.state.isSignUpClicked
    });
  }

  onSearchTextChange(field) {
    this.setState({
      ...this.state,
      ...field
    });
  }

  onEnterKeyPress(event) {
    if (event.key === "Enter") {
      this.setState({
        ...this.state,
        searchProduct: !this.state.searchProduct
      });
    }
  }

  render() {
    const {
      isAuthenticated,
      status,
      isAuthSuccess,
      userName,
      searchable,
      handleCart
    } = this.props;
    const {
      isSignUpClicked,
      isSignInClicked,
      searchProduct,
      searchText
    } = this.state;

    if (isSignUpClicked) {
      return <Redirect to="/signup" />;
    }

    if (isSignInClicked) {
      return <Redirect to="/signin" />;
    }

    if (searchProduct) {
      if (isAuthenticated) {
        return <Redirect to={`/auth/product/search/${searchText}`} />;
      } else {
        return <Redirect to={`/product/search/${searchText}`} />;
      }
    }

    return (
      <Fragment>
        <div className="header">
          <div className="container">
            <Link to="">
              <div className="site-logo">
                <img src={buyportLogo} alt="Buyport Logo" />
              </div>
            </Link>

            {searchable && (
              <div className="search-bar">
                <Input
                  id="searchBar"
                  text={searchText}
                  onChange={searchText =>
                    this.onSearchTextChange({ searchText })
                  }
                  onKeyPress={this.onEnterKeyPress}
                  placeholder="search for any thing"
                />
              </div>
            )}
            <div className="main-button-container">
              {isAuthenticated || isAuthSuccess ? (
                <Fragment>
                  <div className="cart-wrapper">
                    <Icon icon="cart" onClick={handleCart} />
                  </div>
                  <Button>ERP Dashboard</Button>
                  <ButtonDropdown
                    name={`Hi ${userName}`}
                    options={[
                      {
                        buttonName: "My Profile",
                        type: ButtonDropdown.HTML_TYPE.LINK,
                        onClickButton: "/profile/myAccount"
                      },
                      {
                        buttonName: "Sign Out",
                        type: ButtonDropdown.HTML_TYPE.BUTTON,
                        onClickButton: this.props.authSignOut
                      }
                    ]}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <div className="btn-wrapper">
                    <div className="auth-button">
                      <Button
                        loading={status === ASYNC_STATUS.LOADING}
                        onClick={this.handleSignInButtonClick}
                      >
                        Sign In
                      </Button>
                    </div>
                    <div className="auth-button">
                      <Button
                        loading={status === ASYNC_STATUS.LOADING}
                        onClick={this.handleSingUpButtonClick}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
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
    status: state.auth.status,
    userName: getLoggedUserName(state)
  };
}

const Actions = { authSignOut, handleCart };

export default connect(mapStateToProps, Actions)(Header);
