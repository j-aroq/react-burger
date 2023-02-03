import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

export function ModalOverlay({ children, handleClose }) {
  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
