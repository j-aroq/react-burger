import React from 'react';
import PropTypes from 'prop-types';
import burgerComponentsStyles from './burger-components.module.css';
import {ingredientType} from '../../utils/type';
import {Modal} from '../modal/modal';
import {OrderDetails} from '../order-details/order-details';
import {DragIcon, Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientPriceMedium(props) {
  return (
    <div className={burgerComponentsStyles.flex}>
      <p className="text text_type_digits-medium mr-2">{props.total}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

IngredientPriceMedium.propTypes = {
  total: PropTypes.number.isRequired
}; 

const BurgerComponent = ({ componentData, bunType, isLocked, bunTypeName}) => {
  function isDragIcon () {
    if (bunType === "") {
      return <DragIcon type="primary" />              
    }
  }
  return (
    <div className={burgerComponentsStyles.component}>
      {isDragIcon()}
      <div className={burgerComponentsStyles.component_width}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={componentData.name + bunTypeName} 
          price={componentData.price}
          thumbnail={componentData.image}
        />
      </div>      
    </div>
  );
}; 

BurgerComponent.propTypes = {
  componentData: ingredientType.isRequired,
  bunType: PropTypes.string.isRequired,
  bunTypeName: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
}; 

export function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const bun = props.ingredientsData.find(function (element) { 
    return element.type === "bun";
  });

  let totalSum = 0;

  function findComponentByID (componentID) {
    const burgerComponentData = props.ingredientsData.find(function (element) { 
      return element._id === componentID;
    });
    return burgerComponentData;        
  }
  
  return (
    <div>
      <section className={`${burgerComponentsStyles.components} mt-25 ml-4`}>
        <BurgerComponent componentData={bun} bunType={"top"} isLocked={true} bunTypeName={" (верх)"} />
        <div className={`${burgerComponentsStyles.components_between_buns} pr-2`}> 
          {props.ingredientsData.map((element) => { 
            if (element.type !== "bun") {
              totalSum += element.price;
              return (<BurgerComponent componentData={findComponentByID(element._id)} bunType={""} isLocked={false} bunTypeName={""} key={element._id} />);
            }
          })}
        </div>
        <BurgerComponent componentData={bun} bunType={"bottom"} isLocked={true} bunTypeName={" (низ)"} />
        <div className={`${burgerComponentsStyles.components_total} mt-10`}>
          <IngredientPriceMedium total={totalSum + bun.price * 2} />
          <Button type="primary" size="large" htmlType="button" onClick={() => setIsOpen(true)}>Оформить заказ</Button>
        </div>
      </section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={""}>
        <OrderDetails />
      </Modal>
   </div>
  )
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.array.isRequired  
}
