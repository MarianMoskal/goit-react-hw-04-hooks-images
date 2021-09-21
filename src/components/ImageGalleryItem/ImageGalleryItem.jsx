import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Image, Item } from "./ImageGalleryItem.styled";

function ImageGalleryItem(p) {
  const { alt, onClick, largeImageURL } = p;

  return (
    <Fragment>
      <Item>
        <Image
          onClick={(e) => onClick(largeImageURL, alt)}
          src={largeImageURL}
          alt={alt}
        />
      </Item>
    </Fragment>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
