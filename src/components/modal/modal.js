import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import {ModalOverlay} from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modals");

export function Modal({children, isOpen, handleClose, title}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) =>(e.key === "Escape" ? handleClose() : null)
    document.body.addEventListener("keydown", closeByEscape);
    return () => {
      document.body.removeEventListener("keydown", closeByEscape);  
    };
  }, [handleClose, isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal (
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={`${modalStyles.modal_window} pt-10 pr-10 pb-15 pl-10`} onClick={(e) => e.stopPropagation()}>
          <div className={`${modalStyles.modal_header} pt-3 pb-3`}>  
            <p className="text text_type_main-large">{title}</p> 
            <button className={modalStyles.close_button} onClick={handleClose}>
              <CloseIcon type="primary"/> 
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot
  )    
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func
}
