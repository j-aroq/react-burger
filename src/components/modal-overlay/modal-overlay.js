import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

export function ModalOverlay({ children, handleClose }) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
