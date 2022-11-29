import React from 'react';
import PropTypes from 'prop-types';
import burgerComponentsStyles from './burger-components.module.css';
import { ingredientType } from '../../utils/type';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { IngredientsDataContext, PriceContext, OrderNumberContext } from '../../services/appContext';
import { sendOrder } from '../../utils/api';
import { DragIcon, Button, CurrencyIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

const priceInitialState = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      // console.log(state.price);
      return { price: state.price + action.payload};
    case "delete":
      return { price: state.price - action.payload};
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

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
  const { priceDispatcher } = React.useContext(PriceContext);

  function isDragIcon () {
    if (bunType === "") {
      return <DragIcon type="primary" />              
    }
  }

  const sumPrice = () => {
    console.log(5);
    priceDispatcher({type: 'add', payload: componentData.price});
  };

  return (
    <div className={burgerComponentsStyles.component}>
      {/* {console.log(componentData.price)} */}
      {sumPrice}
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

export function BurgerConstructor() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const ingredientsData = React.useContext(IngredientsDataContext);
  const [priceState, priceDispatcher] = React.useReducer(reducer, priceInitialState);
  const bun = ingredientsData.find(function (element) { 
    return element.type === "bun";
  });
  const ingredientsID = [bun._id, bun._id];

  function findComponentByID (componentID) {
    const burgerComponentData = ingredientsData.find(function (element) { 
      return element._id === componentID;
    });
    return burgerComponentData;        
  }

  function makeOrder() {
    sendOrder(ingredientsID)
    .then((result) => {
      setOrderNumber(result.order.number);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      setIsOpen(true);             
    });
  }
  // console.log(orderNumber);
  return (
    <div>
      <section className={`${burgerComponentsStyles.components} mt-25 ml-4`}>
        <PriceContext.Provider value={{priceDispatcher}}>
          <BurgerComponent componentData={bun} bunType={"top"} isLocked={true} bunTypeName={" (верх)"} />
          {/* {priceDispatcher({type: 'add', payload: bun.price})} */}
          <div className={`${burgerComponentsStyles.components_between_buns} pr-2`}> 
            {ingredientsData.map((element) => { 
              if (element.type !== "bun") {
                ingredientsID.push(element._id);
                // {priceDispatcher({type: 'add', payload: element.price})}
                return (<BurgerComponent componentData={findComponentByID(element._id)} bunType={""} isLocked={false} bunTypeName={""} key={element._id} />);
              }
            })}
          </div>
          <BurgerComponent componentData={bun} bunType={"bottom"} isLocked={true} bunTypeName={" (низ)"} />
          {/* {priceDispatcher({type: 'add', payload: bun.price})} */}
        </PriceContext.Provider>
        <div className={`${burgerComponentsStyles.components_total} mt-10`}>
          <IngredientPriceMedium total={priceState.price} />
          <Button type="primary" size="large" htmlType="button" onClick={makeOrder}>Оформить заказ</Button>
        </div>
      </section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={""}>
        <OrderNumberContext.Provider value={orderNumber}>
          <OrderDetails />
        </OrderNumberContext.Provider>
      </Modal>
   </div>
  )
}

// BurgerConstructor.propTypes = {
//   ingredientsData: PropTypes.array.isRequired  
// }
