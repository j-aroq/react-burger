import modalOverlayStyles from './modal-overlay.module.css';

export function ModalOverlay({children, handleClose}) {
  return(
    <div className={modalOverlayStyles.overlay} onClick={handleClose}>
        {children}
    </div>  
  )    
}
