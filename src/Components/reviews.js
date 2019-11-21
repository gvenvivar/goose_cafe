import React, {useState, useEffect} from 'react';
import FirebaseContext from '../Firebase/context.js';
import reviews_bg from '../img/reviews_bg.jpg'

const reviewbackgroundImage = {
  backgroundImage: `url(${reviews_bg})`
}

const Reviews = ()=> {
  const firebase = React.useContext(FirebaseContext);
  const [review, setreview] = useState([]);
  const [showRiviews, setshowRiviews] = useState(2);

  function calculateRating(item){
    const rate = (item.price + item.ambiance + item.service + item.food)/4;
    return rate;
  }

  function loadMoreReviews(){
    console.log('load more');
    const first = firebase.firestore().collection('reviews').limit(showRiviews);
    first.get().then(function (documentSnapshots) {
      // Get the last visible document
      let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // Construct a new query starting at this document,
      // get the next 2;
      let next = firebase.firestore().collection('reviews')
              .startAfter(lastVisible)
              .limit(2);

      next.onSnapshot(snapshot =>{
        const newReviews = snapshot.docs.map(item =>{
          const rate = calculateRating(item.data());
          return({
            id: item.id,
            rating: rate,
            ...item.data()
          })
        })
        setreview(review.concat(newReviews))
        setshowRiviews(showRiviews + 2);
      })
    });

  }

  useEffect(()=>{
    const ref = firebase.firestore().collection('reviews').limit(2);
    const unsubscribe = ref.onSnapshot(snapshot => {
       const newReviews = snapshot.docs.map(item =>{
         const rate = calculateRating(item.data());
         return({
           id: item.id,
           rating: rate,
           ...item.data()
         })
       })
       setreview(newReviews);
     })
     return () => unsubscribe();
   }, [setreview])

   console.log(review);


  return(
    <section className="reviews" style={reviewbackgroundImage}>
      <h2>Reviews</h2>
      <div className="review-item-wrap">
        {review.map((item)=>
          (
            <div className="review-item" key={item.id}>
              <div className="review-top-block">
                <div className="total_rate" style={{'--rating': `${item.rating}`}}>
                </div>
                <div className="reviewer">- {item.reviewer}</div>
              </div>
              <div className="rates">
                <div className="rate-block">
                  <div className="rate-name">Food</div>
                  <div className="rate-mark">{item.food}</div>
                </div>
                <div className="rate-block">
                  <div className="rate-name">Service</div>
                  <div className="rate-mark">{item.service}</div>
                </div>
                <div className="rate-block">
                  <div className="rate-name">Ambiance</div>
                  <div className="rate-mark">{item.ambiance}</div>
                </div>
                <div className="rate-block">
                  <div className="rate-name">Price</div>
                  <div className="rate-mark">{item.price}</div>
                </div>
              </div>
              <div className="review-text">{item.text}</div>
            </div>
          )
        )}
      </div>

      <button className="load-more" onClick={()=>loadMoreReviews()}>Load more</button>
    </section>
  )
}
export default Reviews;
