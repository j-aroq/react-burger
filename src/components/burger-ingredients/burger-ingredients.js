import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import ingredientsDataArr from '../../utils/data';
import {Counter, Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientPrice(props) {
  return (
    <div className={burgerIngredientsStyles.flex}>
      <p className="text text_type_digits-default mr-2">{props.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  )
}

IngredientPrice.propTypes = {
  price: PropTypes.number
}; 

const Ingredients = ({ ingredientData}) => {
    return (
      <div className={burgerIngredientsStyles.ingredient}>
        <Counter className={burgerIngredientsStyles.counter} count={1} size="default" />
        <img src={ingredientData.image} alt={ingredientData.name}></img>
        <IngredientPrice price={ingredientData.price} />
        <p className="text text_type_main-default mb-6">{ingredientData.name}</p>
      </div>
    );
  };  

IngredientPrice.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
}; 

     
class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={`${burgerIngredientsStyles.burger_ingredients} mr-10`}> 
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={burgerIngredientsStyles.flex}>
          <Tab>Булки</Tab>
          <Tab>Соусы</Tab>
          <Tab>Начинки</Tab>
        </div>
        <div className={burgerIngredientsStyles.burger_ingredients_types}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <div className={burgerIngredientsStyles.ingredient_type_block}>
            {ingredientsDataArr.map((element) => { 
              if (element.type === "bun") {
                return (<Ingredients ingredientData={element} />);
              }
            })}
          </div>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <div className={burgerIngredientsStyles.ingredient_type_block}>
            {ingredientsDataArr.map((element) => { 
              if (element.type === "sauce") {
                return (<Ingredients ingredientData={element} />);
              }
            })}
          </div>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <div className={burgerIngredientsStyles.ingredient_type_block}>
            {ingredientsDataArr.map((element) => { 
              if (element.type === "main") {
                return (<Ingredients ingredientData={element} />);
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;