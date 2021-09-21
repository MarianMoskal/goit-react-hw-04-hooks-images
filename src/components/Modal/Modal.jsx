import PropTypes from "prop-types";
import { Overlay, ModalEl } from "./Modal.styled";
import { useEffect, useCallback } from "react";

function Modal({ selectedImage, closeModal }) {
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    document.body.className = "noScrollWhileModal";
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.className = "";
    };
  }, [handleKeyPress]);

  // componentDidMount() {
  //   if (selectedImage !== null) {
  //     window.addEventListener("keydown", handleKeyPress);
  //     document.body.className = "noScrollWhileModal";
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", handleKeyPress);
  //   document.body.className = "";
  // }

  const handleOverlayClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      closeModal();
    }
  };

  const { src, alt } = selectedImage;
  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalEl>
        <img src={src} alt={alt} />
      </ModalEl>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
};

export default Modal;
