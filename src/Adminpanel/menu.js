import React, {useEffect, useState} from 'react';
import FirebaseContext from '../Firebase/context.js';
import dishExample from '../img/dish-example.jpg';
import {
  Link
} from "react-router-dom";


const MenuAdmin = ()=> {
  const firebase = React.useContext(FirebaseContext);
  const [collection, setcollection] = useState([]);

  useEffect(()=>{
    const collections = firebase.firestore().collection('collections').orderBy('order');
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
    <div className="admin-panel-content">
    <div className="admin-panel-content-head">
      <div>Editing Menu</div>
      <Link to='/adminpanel/menu/addnewdish' className="add-new large">Add new dish</Link>
    </div>
    <div className="admin-panel-menu-list-wrapper">
      <div className="admin-panel-menu-list-header flex-table">
        <div className='flex-row'>#</div>
        <div className='flex-row'>Name</div>
        <div className='flex-row img-thumb'>Photo</div>
        <div className='flex-row'>Price</div>
        <div className='flex-row'>Gramms</div>
        <div className='flex-row'>Time</div>
        <div className='flex-row'>Ingridients</div>
        <div className='flex-row description'>Description</div>
      </div>
      <MenuCollection collection={collection}/>
    </div>
    </div>
  )
}

const MenuCollection = ({collection}) =>{
  return(
    <>
    {collection.map(collection=>
      <MenuRow url={collection.name} key={`${collection.name}`}/>
    )}
    </>
  )
}

const MenuRow = ({url}) =>{
  const [menu, setmenu] = useState([]);
  const firebase = React.useContext(FirebaseContext);
  const ref = firebase.firestore().collection(`menu/all/${url.toLowerCase()}`);

  const deleteItem = (item) =>{
    console.log(item.name);
    ref.doc(item.name).delete().then(()=>{
      console.log(`Document ${item.name} successfully deleted!`);
    })
    .catch(e =>{
      console.log(e);
    })
  }

  useEffect(()=>{
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

  return(
    <>
    {menu.map((item) => (
    <div className="admin-panel-menu-list-row flex-table" key={`${item.name}-list-row`}>
      <div className='flex-row editing'>
        <Link to={`/adminpanel/menu/${url.toLowerCase()}/${item.name}`} className='edit-btn'>Edit</Link>
        <button className='delete' onClick={()=>{deleteItem(item)}}>Delete</button>
      </div>
      <div className='flex-row'>{item.name}</div>
      <div className='flex-row img-thumb' style={{backgroundImage: `url(${item.url})`}}></div>
      <div className='flex-row'>{item.price}</div>
      <div className='flex-row'>{item.gramms}</div>
      <div className='flex-row'>{item.time}</div>
      <div className='flex-row'>{item.ingridients}</div>
      <div className='flex-row description'>{item.description.length>200?`${item.description.substring(0,200)}...`:item.description}</div>
    </div>
    ))}
    </>
  )
}

export default MenuAdmin;
