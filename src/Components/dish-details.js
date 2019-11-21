import React, {useEffect, useState} from 'react';
import bg from '../img/dish-details.jpg';
import dishExample from '../img/dish-example.jpg'
import FirebaseContext from '../Firebase/context.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const backgroundImage = {
  backgroundImage: `url(${bg})`
}
const dishExampleImg = {
  backgroundImage: `url(${dishExample})`
}

const DishDetails = ()=>{
  const firebase = React.useContext(FirebaseContext);
  const {category, dishname} = useParams();
  const [item, setitem] = useState([]);

  useEffect(()=>{
    let ref = firebase.firestore().collection(`menu/all/${category}`).doc(`${dishname}`);
    const x = ref.get().then(doc=>{
      const data = doc.data();
      setitem(data);
    })
    console.log(typeof(x))
  },[setitem])

  return(
    <section className="dish-details" style={backgroundImage}>
      <div className="dish-details-inner-wrap">
        <Link to='/' className='back'>Back to menu</Link>

        <div className="dish-wrapper">
          <div className="left">
            <div className="left-header">
              <h3>{item.name}</h3>
              <div className='price'>{item.price}$</div>
            </div>
            <p className="desc">{item.description}</p>
            <div className='ingridients'>
              <span>Ingridients:</span>
              <p>{item.ingridients}</p>
            </div>
            <p>Cooking time: {item.time} min</p>
            <p>Grams:  {item.gramms}</p>
          </div>
          <div className="right" style={dishExampleImg}></div>
        </div>
      </div>
    </section>
  )
}

export default DishDetails;
