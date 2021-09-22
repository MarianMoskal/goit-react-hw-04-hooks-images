import PropTypes from "prop-types";
import { Overlay, ModalEl } from "./Modal.styled";
import { useEffect, useCallback } from "react";

function Modal({ selectedImage: { src, alt }, closeModal }) {
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

  const handleOverlayClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      closeModal();
    }
  };

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
