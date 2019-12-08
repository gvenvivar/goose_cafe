import React,{useState, useEffect} from 'react';
import './App.css';
import FirebaseContext from './Firebase/context.js';
import Header from './Components/header.js'
import Footer from './Components/footer.js'
import Home from './Components/home.js'
import Admin from './Adminpanel/admin.js'
import Adminpanel from './Adminpanel/adminpanel.js'
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
          <Adminpanel section='contacts'/>
        </Route>
        <Route path="/adminpanel/menu/addnewdish">
          <Adminpanel section='addnewdish'/>
        </Route>
        <Route path="/adminpanel/menu/:category/:dishname">
          <Adminpanel section='edit-dish'/>
        </Route>
        <Route path="/adminpanel/menu">
          <Adminpanel section='menu'/>
        </Route>
        <Route path="/adminpanel/reviews/addnew-review">
          <Adminpanel section='addNewReview' />
        </Route>
        <Route path="/adminpanel/reviews/:id">
          <Adminpanel section='edit-review' />
        </Route>
        <Route path="/adminpanel/reviews">
          <Adminpanel section='reviews' />
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
