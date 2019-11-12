import React from 'react';
import bg from '../img/dish-details.jpg';
import dishExample from '../img/dish-example.jpg'

const backgroundImage = {
  backgroundImage: `url(${bg})`
}
const dishExampleImg = {
  backgroundImage: `url(${dishExample})`
}

const DishDetails = ()=>{
  return(
    <section className="dish-details" style={backgroundImage}>
      <div className="dish-details-inner-wrap">
        <a href='#' className='back'>Back to menu</a>
        <div className="dish-wrapper">
          <div className="left">
            <div className="left-header">
              <h3>Pancakes de lemon</h3>
              <div className='price'>12$</div>
            </div>
            <p className="desc">
              A pancake (or hotcake, griddlecake, or flapjack, not to be confused with oat bar flapjacks) is a flat cake, often thin and round, prepared from a starch-based batter that may contain eggs, milk and butter and cooked on a hot surface such as a griddle or frying pan, often frying with oil or butter. Archaeological evidence suggests that pancakes were probably the earliest and most widespread cereal food eaten in prehistoric societies.
            </p>
            <div className='ingridients'>
              <span>Ingridients:</span>
              <p>Flour, milk, eggs, sugar, butter and seasoned berries.</p>
            </div>
            <p>Cooking time: 10 min</p>
            <p>Grams:  300g</p>
          </div>
          <div className="right" style={dishExampleImg}></div>
        </div>
      </div>
    </section>
  )
}

export default DishDetails;
