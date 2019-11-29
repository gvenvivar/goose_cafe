import React,{useState, useEffect} from 'react';
import './App.css';
import FirebaseContext from './Firebase/context.js';
import Header from './Components/header.js'
import Footer from './Components/footer.js'
import Home from './Components/home.js'
import Admin from './Adminpanel/admin.js'
import Contacts from './Adminpanel/contacts.js'
import MenuAdmin from './Adminpanel/menu.js'
import ReviewsAdmin from './Adminpanel/reviews.js'
import DishDetails from './Components/dish-details'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const firebase = React.useContext(FirebaseContext);
  const [contacts, setcontacts] = useState({});

  useEffect(()=>{
    const ref = firebase.firestore().collection('contacts').doc('all');
    const unsubscribe =
      ref.get().then(doc=>{
        const data = doc.data();
        setcontacts(data);
      })
  }, [setcontacts])
console.log(contacts);


  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/menu/all/:category/:dishname">
          <Header contacts={contacts}/>
          <DishDetails />
          <Footer contacts={contacts}/>
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/adminpanel/contacts">
          <Contacts />
        </Route>
        <Route path="/adminpanel/menu">
          <MenuAdmin />
        </Route>
        <Route path="/adminpanel/reviews">
          <ReviewsAdmin />
        </Route>
        <Route path="/">
          <Header contacts={contacts}/>
          <Home />
          <Footer contacts={contacts}/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
