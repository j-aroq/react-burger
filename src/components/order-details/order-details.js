import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import orderConfirmationImage from "../../images/graphics.svg";

export function OrderDetails(props) {
  return (
    <div className={styles.order_details_block}>
      <p className="text text_type_digits-large mt-4 mb-8">
        {props.orderNumber}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        className={styles.image}
        src={orderConfirmationImage}
        alt="галочка подтверждения заказа"
      ></img>
      <p className="text text_type_main-default mt-15 nb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};
