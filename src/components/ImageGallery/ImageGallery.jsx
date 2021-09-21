import React from "react";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { Gallery, Spinner } from "./ImageGallery.styled";

function ImageGallery(p) {
  const { hits, visible, onSelect } = p;

  return (
    <>
      <Gallery>
        {hits.map(({ webformatURL, tags, largeImageURL, id }) => (
          <ImageGalleryItem
            onClick={onSelect}
            key={`${id}+${webformatURL}`}
            largeImageURL={largeImageURL}
            src={webformatURL}
            alt={tags}
          />
        ))}
      </Gallery>

      {visible && (
        <Spinner>
          <Loader
            // visible={visible}
            type="ThreeDots"
            color="Orange"
            height={100}
            width={100}
            timeout={7000}
          />
        </Spinner>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  onSelect: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  hits: PropTypes.array.isRequired,
};

export default ImageGallery;
