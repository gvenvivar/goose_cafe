import React, {useEffect, useState} from 'react'
import FirebaseContext from '../Firebase/context.js';
import '../css/admin.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Contacts = ()=> {
  const firebase = React.useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [contacts, setcontacts] = useState({});
  const [disable, setdisable] = useState(true);

  useEffect(()=>{
    const ref = firebase.firestore().collection('contacts').doc('all');
    const unsubscribe =
      ref.get().then(doc=>{
        const data = doc.data();
        setcontacts(data);
      })
  }, [setcontacts])

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user.email.split('@')[0]);
    })
  }, [setUser])

  function updateInput(value){
    const newData = ({
      ...contacts,
    })
    newData[value.name] = value.value;
    setcontacts(newData);
    setdisable(false);
  }

  function onSubmit (e){
    e.preventDefault();
    firebase.firestore().collection('contacts').doc('all').set({
      address: contacts.address,
      phone: contacts.phone,
      facebook: contacts.facebook,
      instagram: contacts.instagram,
    })
    .then(() => {
      console.log('data Updated')
      setdisable(true);
    });
  }
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div className="admin-panel-name">Admin Panel</div>
        <div className="admin-panel-user">{user}</div>
      </div>
      <div className="admin-panel-main">
        <div className="admin-panel-sections">
          <div className='admin-panel-section dark'>Sections</div>
          <Link to='/adminpanel/contacts' className="admin-panel-section active">Contacts</Link>
          <Link to='/adminpanel/menu' className="admin-panel-section">Menu</Link>
          <Link to='/adminpanel/reviews' className="admin-panel-section">Reviews</Link>
        </div>
        <div className="admin-panel-content">
          <form onSubmit={onSubmit}>
          <div className="admin-panel-content-head">
            <div>Editing Contacts</div>
            <button type="submit" className="save-changes" disabled={disable}>Save changes</button>
          </div>
          <div className="admin-panel-content-main">
            <lable>Restraunt adress</lable>
            <input
              name="address"
              value={contacts.address}
              onChange={(e)=>updateInput(e.currentTarget)}
              type="text"
              placeholder="adress"
            />
            <lable>Phone number</lable>
            <input
              name="phone"
              value={contacts.phone}
              onChange={(e)=>updateInput(e.currentTarget)}
              type="text"
              placeholder="phone"
            />
            <lable>Facebook page</lable>
            <input
              name="facebook"
              value={contacts.facebook}
              onChange={(e)=>updateInput(e.currentTarget)}
              type="text"
              placeholder="facebook"
            />
            <lable>Instagram page</lable>
            <input
              name="instagram"
              value={contacts.instagram}
              onChange={(e)=>updateInput(e.currentTarget)}
              type="text"
              placeholder="instagram"
            />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contacts;
