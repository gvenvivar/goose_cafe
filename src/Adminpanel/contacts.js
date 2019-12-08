import React, {useEffect, useState} from 'react'
import FirebaseContext from '../Firebase/context.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Contacts = ()=> {
  const firebase = React.useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [contacts, setcontacts] = useState({
    address: '',
    phone: '',
    facebook: '',
    instagram: '',
  });
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
    <div className="admin-panel-content">
      <form onSubmit={onSubmit}>
      <div className="admin-panel-content-head">
        <div>Editing Contacts</div>
        <button type="submit" className="save-changes large" disabled={disable}>Save changes</button>
      </div>
      <div className="admin-panel-content-main">
        <label>Restraunt adress</label>
        <input
          name="address"
          value={contacts.address}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="adress"
        />
        <label>Phone number</label>
        <input
          name="phone"
          value={contacts.phone}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="phone"
        />
        <label>Facebook page</label>
        <input
          name="facebook"
          value={contacts.facebook}
          onChange={(e)=>updateInput(e.currentTarget)}
          type="text"
          placeholder="facebook"
        />
        <label>Instagram page</label>
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
  )
}

export default Contacts;
