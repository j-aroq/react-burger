import React from "react";
import { useDispatch, useSelector  } from "../../hooks";
import styles from "./burger-ingredients.module.css";
import { getIngredients } from "../../services/actions/ingredients";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import { getItems } from "../../utils/state";
import { TIngredient } from "../../services/types/data";

export function BurgerIngredients() {
  const items: TIngredient[] = useSelector(getItems);
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("bun");

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const buns = React.useMemo(
    () => items.filter((item) => item.type === "bun"),
    [items]
  );
  const sauces = React.useMemo(
    () => items.filter((item) => item.type === "sauce"),
    [items]
  );
  const mains = React.useMemo(
    () => items.filter((item) => item.type === "main"),
    [items]
  );

  const scrollCategories = () => {
    const containerTop = document
      .getElementById("container")
      ?.getBoundingClientRect().top ?? 0;
    const bunTop = document.getElementById("bun")?.getBoundingClientRect().top ?? 0;
    const sauceTop = document
      .getElementById("sauce")
      ?.getBoundingClientRect().top ?? 0;

    if (bunTop + containerTop > containerTop + 60) {
      setCurrent("bun");
    } else if (sauceTop + containerTop > 110) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };
  
  const onClickTab = (value: string) => {
      setCurrent(value);
      const element = document.getElementById(value);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    };
    
  return (
    <section className={`${styles.burger_ingredients} mr-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <nav className={styles.flex}>
        <Tab active={current === "bun"} value="bun" onClick={onClickTab}>Булки</Tab>
        <Tab active={current === "sauce"} value="sauce" onClick={onClickTab}>Соусы</Tab>
        <Tab active={current === "main"} value="main" onClick={onClickTab}>Начинки</Tab>
      </nav>
      <div
        id="container"
        className={styles.burger_ingredients_types}
        onScroll={scrollCategories}
      >
        <IngredientsCategory id="bun" type={"Булки"} typeArray={buns} />
        <IngredientsCategory id="sauce" type={"Соусы"} typeArray={sauces} />
        <IngredientsCategory id="main" type={"Начинки"} typeArray={mains} />
      </div>
    </section>
  );
}
