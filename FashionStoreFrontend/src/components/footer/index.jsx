// @flow
import React, { PureComponent, Fragment } from "react";

import Link from "components/Link";
import buyportLogo from "assets/image/buyport-logo.svg";

import "./styles.scss";
import Icon from "components/icon";

class Footer extends PureComponent {
  render() {
    return (
      <Fragment>
        <footer>
          <div className="container">
            <div className="site-logo">
              <Link to="">
                <img src={buyportLogo} alt="Buyport Logo" />
              </Link>
              <p>Based on your input, get a random alpha numeric string.</p>
              <p>
                In statistical theory, randomization is an important principle
                with one possible application.
              </p>
            </div>
            <div className="navigation-container">
              <div className="navigation-header">Navigation</div>
              <ul className="nav-list">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Representative Login</li>
                <li>Become a buyport Customer</li>
              </ul>
            </div>
            <div className="contact-container">
              <div className="contact-header">Call us now</div>
              <div className="contact-number-container">
                <Icon icon="phone" />
                0800 000 000
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
