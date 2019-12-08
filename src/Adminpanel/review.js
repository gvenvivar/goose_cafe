import React, {useEffect, useState, useRef} from 'react'
import FirebaseContext from '../Firebase/context.js';
import dishExample from '../img/dish-example.jpg';
import {
  Link,
  useParams,
  Redirect,
  useHistory,
} from "react-router-dom";

const Review = (props) =>{
  const [review, setreview] = useState({
    reviewer: '',
    text: '',
    ambiance: '',
    food: '',
    price: '',
    service: ''
  })
  const [disable, setdisable] = useState(true);
  const firebase = React.useContext(FirebaseContext);
  const history = useHistory();
  let {id} = useParams();
  const ref = firebase.firestore().collection(`reviews/`);

  useEffect(()=>{
    if(props.loadData){
    const unsubscribe =
      ref.doc(id).get().then(doc=>{
        const data = doc.data();
        setreview(data);
      })
  }
  }, [setreview])

  function onSubmit(e){
    e.preventDefault();
    const obj = {
      reviewer: review.reviewer,
      text: review.text,
      ambiance: review.ambiance,
      food: review.food,
      price: review.price,
      service: review.service
    }
    if(props.loadData){
      ref.doc(id).update(obj)
      .then(() => {
        console.log('data Updated')
        history.push('/adminpanel/reviews/')
      });
    }
    else{
      ref.add(obj)
      .then(() => {
        console.log('new review save to database')
        history.push('/adminpanel/reviews/')
      });
    }
  }
  function deleteItem(e){
    e.preventDefault();
    ref.doc(id).delete().then(()=>{
      console.log(`Review successfully deleted!`);
      history.push('/adminpanel/reviews/')
    })
    .catch(e =>{
      console.log(e);
    })
  }
  function updateInput(value){
    const newData = ({
      ...review,
    })
    newData[value.name] = value.value;
    setreview(newData);
    setdisable(false);
  }
  return (
    <div className="admin-panel-content">
    <form onSubmit={onSubmit}>
    <div className="admin-panel-content-head">
      <Link to ='/adminpanel/reviews'>Back to reviews</Link>
        {props.loadData?<div>Editing review</div>:<div>Adding new review</div>}
      <div className="btn-right">
        {props.loadData&&<button className="delete large" onClick={(e)=>deleteItem(e)}>Delete Review</button>}
        <button type="submit" disabled={disable} className="save-changes large">Save changes</button>
      </div>
    </div>
    <div className="dish-edit-wrapper">
      <div className="dish-edit-col-left">
        <label>Reviewer name</label>
        <input
          name="reviewer"
          value={review.reviewer}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="Reviewer name"
        />
        <label>Review text</label>
        <textarea
          name="text"
          value={review.text}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="Review text"
        />
      </div>

      <div className="dish-edit-col-right">
        <label>Ambiance rate</label>
        <input
          name="ambiance"
          value={review.ambiance}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Ambiance rate"
          min='1'
          max='5'
        />
        <label>Food rate</label>
        <input
          name="food"
          value={review.food}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Food rate"
          min='1'
          max='5'
        />
        <label>Price rate</label>
        <input
          name="price"
          value={review.price}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Price rate"
          min='1'
          max='5'
        />
        <label>Service rate</label>
        <input
          name="service"
          value={review.service}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="number"
          placeholder="Service rate"
          min='1'
          max='5'
        />
        </div>
      </div>
    </form>
    </div>
  )
}

export default Review;
