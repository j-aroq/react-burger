import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modals");

export function Modal({ children, handleClose, title }) {
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(
    <div>
      <ModalOverlay handleClose={handleClose}>
        <div
          className={`${modalStyles.modal_window} pt-10 pr-10 pb-15 pl-10`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${modalStyles.modal_header} pt-3 pb-3`}>
            <p className="text text_type_main-large">{title}</p>
            <button className={modalStyles.close_button} onClick={handleClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func,
};
