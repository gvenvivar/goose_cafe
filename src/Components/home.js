import React, {useEffect, useState} from 'react';
import menu_logo from '../img/menu_logo.png'
import menu_bg from '../img/menu_bg.jpg'
import board from '../img/board.jpg'
import gooseWings from '../img/goose_3.png'
import Reviews from '../Components/reviews.js'
import FirebaseContext from '../Firebase/context.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const backgroundImage = {
  backgroundImage: `url(${menu_bg})`
}
const boardImg = {
  backgroundImage: `url(${board})`
}

const MobileMenu = ({collection, view}) => {
  return(
    <div className="mobile-menu">
      {collection.map(collection=>
        <MenuCategory url={collection.name} view='mobile' key={`${collection.name}-${view}`}/>
      )}
    </div>
  )
}

const Menu = ({collection, view}) => {
  return(
    <div className="board-menu-list">
      {collection.map(collection=>
        <MenuCategory url={collection.name} view='desktop' key={`${collection.name}-${view}`}/>
      )}
    </div>
  )
}

const MenuCategory = ({url, view})=> {
  const [menu, setmenu] = useState([]);
  const firebase = React.useContext(FirebaseContext);

  useEffect(()=>{
    const ref = firebase.firestore().collection(`menu/all/${url.toLowerCase()}`);
    const unsubscribe = ref.onSnapshot(snapshot => {
       const newmenu = snapshot.docs.map(item =>{
         return({
           ...item.data()
         })
       })
       setmenu(newmenu);
     })
     return ()=> unsubscribe();
  },[setmenu])

  return (
    <div className="board-menu-category">
      <h2>{url}</h2>
      <ul className='menu_list'>
      {menu.map((item) => (
        <li className="menu_item" key={`${item.name}-${view}`}>
          <>
            <Link to={`menu/all/${url.toLowerCase()}/${item.name}`} className="dish_name">{item.name}</Link>
            <span className='price'>{item.price}$</span>
          </>
        </li>
      ))}
      </ul>
    </div>
  )
}


const Home = (props)=> {
  const firebase = React.useContext(FirebaseContext);
  const [collection, setcollection] = useState([]);
  const [menu, setmenu] = useState([]);

  useEffect(()=>{
    const collections = firebase.firestore().collection('collections');
    const unsubscribe = collections.onSnapshot(snapshot => {
       const collections = snapshot.docs.map(item =>{
         return({
           ...item.data()
         })
       })
       setcollection(collections);
     })
     return ()=> unsubscribe();
  }, [setcollection])

  return(
    <>
    <section className='menu' style={backgroundImage}>
      <div className="board-menu-wrap">
        <div className="board-menu" style={boardImg}>
          <div className="board-header">
            <img className='gooseWings' src={gooseWings} alt='gooseWings'/>
            <h1>Pesky goose cafe</h1>
          </div>
          <Menu collection={collection} view='desktop'/>
        </div>
      </div>
      <div className="mobile-h1">
        <img src={menu_logo} alt="goose cafe logo" className='menu_logo'/>
        <h1>Pesky goose cafè menu</h1>
      </div>
    </section>
    <MobileMenu collection={collection} view='mobile'/>
    <Reviews />
    </>
  )
}



export default Home;
