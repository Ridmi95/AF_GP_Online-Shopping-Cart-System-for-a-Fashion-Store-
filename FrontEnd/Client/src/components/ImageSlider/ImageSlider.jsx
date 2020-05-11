// @flow
import React, { PureComponent, Fragment } from "react";

import Row from "components/Row";
import Col from "components/Col";
import Icon from "components/icon";
import ImagePlaceHolder from "assets/image/product-image-placeholder.png";

import "./styles.scss";

type ImageSliderProps = {
  images: Array<any>
};

type ImageSliderState = {
  selectedImage: Array<any>,
  currentIndex: Number,
  interval: null | Number
};

class ImageSlider extends PureComponent<ImageSliderProps, ImageSliderState> {
  SELECT_IMAGE = {
    up: "up",
    down: "down"
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedImage: { ...this.props.images[0], index: 0 },
      currentIndex: 0,
      interval: null
    };

    // $FlowFixMe
    this.imageSelectHandler = this.imageSelectHandler.bind(this);
    // $FlowFixMe
    this.changeImageHandler = this.changeImageHandler.bind(this);
  }

  imageSelectHandler(image, index) {
    this.setState({
      ...this.state,
      selectedImage: { ...image, index: index },
      currentIndex: index
    });
  }

  changeImageHandler(key) {
    const { currentIndex } = this.state;
    const { images } = this.props;

    switch (key) {
      case this.SELECT_IMAGE.up:
        this.setState({
          ...this.state,
          selectedImage: {
            ...images[currentIndex >= images.length - 1 ? 0 : currentIndex + 1],
            index: currentIndex >= images.length - 1 ? 0 : currentIndex + 1
          },
          currentIndex: currentIndex >= images.length - 1 ? 0 : currentIndex + 1
        });
        break;
      case this.SELECT_IMAGE.down:
        this.setState({
          ...this.state,
          selectedImage: {
            ...images[
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            ],
            index: currentIndex === 0 ? images.length - 1 : currentIndex - 1
          },
          currentIndex:
            currentIndex === 0 ? images.length - 1 : currentIndex - 1
        });
        break;
      default:
        return null;
    }
  }

  render() {
    const { images } = this.props;
    const { selectedImage } = this.state;

    return (
      <Fragment>
        <div className="img-container">
          <Row className="single-image-row-container">
            <Col>
              <div className="single-image-row">
                <Row className="single-images">
                  <Col className="icon-navigation" size="1">
                    <Icon
                      icon="chevron-left"
                      onClick={() =>
                        this.changeImageHandler(this.SELECT_IMAGE.down)
                      }
                    />
                  </Col>
                  <Col className="single-img-container">
                    <div className="main-image-container">
                      <img
                        src={
                          selectedImage.url
                            ? selectedImage.url
                            : ImagePlaceHolder
                        }
                        alt="main-img"
                        className="single-image"
                      />
                    </div>
                  </Col>
                  <Col className="icon-navigation" size="1">
                    <Icon
                      icon="chevron-right"
                      onClick={() =>
                        this.changeImageHandler(this.SELECT_IMAGE.up)
                      }
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="img-list-container">
            {images.length > 0 &&
              images.map((img, i) => (
                <Col
                  key={img.id}
                  className={` ${
                    i === selectedImage.index
                      ? "product-image-selected"
                      : "other-product-images"
                  }`}
                >
                  <div
                    className="product-image-wrap"
                    onClick={() => this.imageSelectHandler(img, i)}
                  >
                    <img
                      src={img.url}
                      alt="product"
                      className="product-image"
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default ImageSlider;
