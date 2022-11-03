import React from 'react';
import PropTypes from 'prop-types';
import burgerComponentsStyles from './burger-components.module.css';
import ingredientsDataArr from '../../utils/data';
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
  total: PropTypes.number
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
      <ConstructorElement
        type={bunType}
        isLocked={isLocked}
        text={componentData.name + bunTypeName} 
        price={componentData.price}
        thumbnail={componentData.image}
      />      
    </div>
  );
}; 

BurgerComponent.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  bunType: PropTypes.string,
  bunTypeName: PropTypes.string,
  isLocked: PropTypes.bool,
}; 

class BurgerConstructor extends React.Component {
    render() {
      const bun = ingredientsDataArr.find(function (element) { 
        return element.type === "bun";
      });

      function findComponentByID (componentID) {
        const burgerComponentData = ingredientsDataArr.find(function (element) { 
          return element._id === componentID;
        });
        return burgerComponentData;        
      }
      return (
        <section className={`${burgerComponentsStyles.components} mt-25 ml-4`}>
        <BurgerComponent componentData={bun} bunType={"top"} isLocked={true} bunTypeName={" (верх)"} />
          <div className={`${burgerComponentsStyles.components_between_buns} pr-2`}> 
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9b9")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9b4")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9bc")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9bb")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9bb")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9bd")} bunType={""} isLocked={false} bunTypeName={""} />
            <BurgerComponent componentData={findComponentByID("60666c42cc7b410027a1a9be")} bunType={""} isLocked={false} bunTypeName={""} />
          </div>
          <BurgerComponent componentData={bun} bunType={"bottom"} isLocked={true} bunTypeName={" (низ)"} />
          <div className={`${burgerComponentsStyles.components_total} mt-10`}>
            <IngredientPriceMedium total={10498} />
            <Button type="primary" size="large">Оформить заказ</Button>
          </div>
        </section>
      )
    }
  }

  export default BurgerConstructor;