// @flow
import React, { PureComponent } from "react";

import Link from "components/Link";
import Icon from "components/icon";

import "./styles.scss";

type CategoryCardProps = {
  title: string,
  color: string,
  icon: string
};

class CategoryCard extends PureComponent<CategoryCardProps> {
  render() {
    const { title, color, icon } = this.props;

    return (
      <div className={`category ${color}`}>
        <Link to={`/`}>
          <div className={"category-content"}>
            <Icon icon={icon} />
            <div className="category-title ">{title}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CategoryCard;
