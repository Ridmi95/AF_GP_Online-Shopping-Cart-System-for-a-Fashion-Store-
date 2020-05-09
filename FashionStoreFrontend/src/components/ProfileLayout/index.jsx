// @flow
import React from "react";
import ProfileHeader from "components/header";
import Footer from "components/footer";
import Sidebar from "components/sideBar";
import Cart from "components/Cart";

import "./styles.scss";

type LayoutProps = {
  children: Element,
  breadcrumbs?: String[],
  actions?: Element,
  status?: string
};

export default function layout({
  children,
  breadcrumbs,
  actions,
  status
}: LayoutProps) {
  const breadcrumbsContent =
    breadcrumbs !== undefined
      ? breadcrumbs.map(breadcrumb => <li key={breadcrumb}>{breadcrumb}</li>)
      : null;
  return (
    <div className="profile">
      <div className="profile-container">
        <ProfileHeader searchable={false} />
        <Sidebar />
        <div className="profile-content">
          <div className="profile-content-header">
            <div className="status-bar">
              {breadcrumbs !== undefined && (
                <ul className="breadcrumbs">{breadcrumbsContent}</ul>
              )}
              {status !== undefined && (
                <div className={`status ${status}`}>{status}</div>
              )}
            </div>
            {actions !== undefined && (
              <div className={"action-bar"}>{actions}</div>
            )}
          </div>
          {children}
        </div>
        <Footer />
      </div>
      <div className="cart-container">
        <Cart />
      </div>
    </div>
  );
}
