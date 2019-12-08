import React, {useEffect, useState} from 'react';
import FirebaseContext from '../Firebase/context.js';
import {
  Link
} from "react-router-dom";

const ReviewList = ()=> {
  const firebase = React.useContext(FirebaseContext);
  const [reviewList, setreviewList] = useState([]);


  useEffect(()=>{
    const ref = firebase.firestore().collection('reviews');
    const unsubscribe = ref.onSnapshot(snapshot => {
       const collections = snapshot.docs.map(item =>{
         return({
           id: item.id,
           ...item.data()
         })
       })
       setreviewList(collections);
     })
     return ()=> unsubscribe();
  }, [setreviewList])


  return(
    <div className="admin-panel-content">
    <div className="admin-panel-content-head">
      <div>List of reviews</div>
      <Link to='/adminpanel/reviews/addnew-review' className="add-new large">Add new review</Link>
    </div>
    <div className="admin-panel-menu-list-wrapper">
      <div className="admin-panel-menu-list-header flex-table">
        <div className='flex-row'>#</div>
        <div className='flex-row'>Reviewer</div>
        <div className='flex-row description'>Text</div>
        <div className='flex-row'>Ambiance</div>
        <div className='flex-row'>Food</div>
        <div className='flex-row'>Price</div>
        <div className='flex-row'>Service</div>
      </div>
      <ReviewRow collection={reviewList}/>
    </div>
    </div>
  )
}

const ReviewRow = ({collection}) =>{
  const firebase = React.useContext(FirebaseContext);
  const deleteItem = (item) =>{
    const ref = firebase.firestore().collection('reviews');
    ref.doc(item).delete().then(()=>{
      console.log(`Document ${item} successfully deleted!`);
    })
    .catch(e =>{
      console.log(e);
    })
  }

  return(
    <>
      {collection.map(collection=>
        <div className="admin-panel-menu-list-row flex-table" key={collection.id}>
          <div className='flex-row editing'>
            <Link to={`/adminpanel/reviews/${collection.id}`} className='edit-btn'>Edit</Link>
            <button className='delete' onClick={()=>{deleteItem(collection.id)}}>Delete</button>
          </div>
          <div className='flex-row'>{collection.reviewer}</div>
          <div className='flex-row description'>{collection.text.length>200?`${collection.text.substring(0,200)}...`:collection.text}</div>
          <div className='flex-row'>{collection.ambiance}</div>
          <div className='flex-row'>{collection.food}</div>
          <div className='flex-row'>{collection.price}</div>
          <div className='flex-row'>{collection.service}</div>
        </div>
      )}
    </>
  )
}



export default ReviewList;
