import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrders, getOrdersAuth } from "../../utils/state";
import { useLocation } from "react-router";

const modalRoot = document.getElementById("modals");

export function Modal({ children, handleClose, title }) {
  const { id } = useParams("");
  let isOrderModal = false;
  const location = useLocation();
  const ordersArr = useSelector(getOrders);
  const ordersAuthArr = useSelector(getOrdersAuth);

  const orders = location.pathname.startsWith("/feed")
    ? ordersArr
    : ordersAuthArr;

  const order = React.useMemo(
    () => orders.find((order) => order._id === id) || null,
    [orders, id]
  );
  if (title === "order_number") {
    title = order ? `#${order.number}` : "";
    isOrderModal = true;
  }
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
    <>
      <ModalOverlay handleClose={handleClose}>
        <div
          className={`${styles.modal_window} pt-10 pr-10 pb-15 pl-10`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${styles.modal_header} pt-3 pb-3`}>
            {isOrderModal ? (
              <p
                className={`${styles.modal_title_number} text text_type_digits-default`}
              >
                {title}
              </p>
            ) : (
              <p className={`${styles.modal_title} text text_type_main-large`}>
                {title}
              </p>
            )}
            <button className={styles.close_button} onClick={handleClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func,
};
