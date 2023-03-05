import { ReactNode, FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleClose: () => void,
  children: ReactNode,
}

export const ModalOverlay: FC<IModalOverlayProps> = ({children, handleClose }) => {
  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
}
