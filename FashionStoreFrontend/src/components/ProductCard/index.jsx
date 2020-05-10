// @flow
import React, { PureComponent } from "react";

import Link from "components/Link";
import Checkbox from "components/checkbox";
import classNames from "classnames";

import { textTruncate } from "shared/utils";
import { Rating } from "components/Rate";

import "./styles.scss";

type ProductCardProps = {
  link: string,
  title: string,
  image: string,
  rating: object,
  prices?: Array<any> | null,
  currency?: string,
  selectable?: boolean,
  selected: boolean,
  onChange: Function
};

class ProductCard extends PureComponent<ProductCardProps> {
  static defaultProps = {
    prices: null,
    currency: "",
    selectable: false,
    selected: false,
    onChange: () => {}
  };

  render() {
    const {
      link,
      title,
      image,
      rating,
      prices,
      currency,
      selectable,
      selected,
      onChange
    } = this.props;
    return (
      <div className="product">
        {selectable && (
          <div
            className={classNames(`product-selector`, { selected: selected })}
          >
            <Checkbox isChecked onChange={onChange} />
          </div>
        )}
        <div className="featured-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-content">
          <Link to={`${link}`}>
            <div className="product-title">{textTruncate(title, 20)}</div>
            {prices ? (
              prices.length > 1 ? (
                <span className="product-currency">{`${currency} ${prices[0]} -
                  ${prices[1]}`}</span>
              ) : (
                <span className="product-currency">{`${currency} ${prices[0]}`}</span>
              )
            ) : null}
            <Rating rate={rating.rate} reviews={rating.reviews} />
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
