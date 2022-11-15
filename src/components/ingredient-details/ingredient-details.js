import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientEnergyValue(props) {
    return (
      <div className={ingredientDetailsStyles.energy_value_element}>
        <p className="text text_type_main-default text_color_inactive mb-2">{props.type}</p>
        <p className="text text_type_digits-default text_color_inactive">{props.amount}</p>
      </div>
    )
  }  

export function IngredientDetails(props) {
  return(
    <div className={ingredientDetailsStyles.ingredient_info}>
      <img className={ingredientDetailsStyles.ingredient_image} src={props.item.image} alt={props.item.name}></img>
      <p className="text text_type_main-medium mt-4 mb-8">{props.item.name}</p>
      <div className={ingredientDetailsStyles.energy_value_block}>
        <IngredientEnergyValue type={"Калории, ккал"} amount={props.item.calories} />
        <IngredientEnergyValue type={"Белки, г"} amount={props.item.proteins} />
        <IngredientEnergyValue type={"Жиры, г"} amount={props.item.fat} />
        <IngredientEnergyValue type={"Углеводы, г"} amount={props.item.carbohydrates} />
      </div>
    </div>  
  )    
}
