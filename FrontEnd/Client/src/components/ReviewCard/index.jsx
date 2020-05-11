// @flow
import type { ReviewType } from "containers/review/types";
import React from "react";

import Rate from "components/Rate";
import Card, { CardBody } from "components/Card";

import "./styles.scss";

export default function ReviewCard(props: ReviewType) {
  const { profilePic, rating, comment, name } = props;
  return (
    <Card className="review-card">
      <div className="review-card-container">
        <CardBody>
          <div className="reviewer-image">
            <img alt={name} src={profilePic} />
          </div>
          <div className="reviewer-rating">
            <Rate value={rating} size="small" />
          </div>
          <div className="reviewer-name">{name}</div>
          <div className="review-comment">{comment}</div>
          <br />
        </CardBody>
      </div>
    </Card>
  );
}
