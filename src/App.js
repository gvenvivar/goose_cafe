import React,{useState, useEffect} from 'react';
import './App.css';
import logo from './img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'
import FirebaseContext from './Firebase/context.js';
import Home from './Components/home.js'
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
      <header className="header">
        <div className="inner-header">
          <Link to='/' className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</Link>
          <div className='header-right'>
            <div className="open_hours">
              <span>Open hours:</span>
              <span>8am-10pm</span>
            </div>
            <div className='tel'><FontAwesomeIcon className="tel-icon" icon={faPhone} />{contacts.phone}</div>
          </div>
        </div>
      </header>
      <Switch>
        <Route path="/menu/all/:category/:dishname">
          <DishDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <footer>
        <div className="inner-header">
          <a href="#" className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</a>
          <div className='address'>
            Address: {contacts.address}
          </div>
          <div className="socials">
            <a href={contacts.facebook}><FontAwesomeIcon className="facebook-icon" icon={faFacebookSquare}/></a>
            <a href={contacts.instagram}><FontAwesomeIcon className="instagram-icon" icon={faInstagram} /></a>
          </div>
          <div className='header-right'>
            <div className="open_hours">
              <span>Open hours:</span>
              <span>8am-10pm</span>
            </div>
            <div className='tel'><FontAwesomeIcon className="tel-icon" icon={faPhone} />1234-555-3254</div>
          </div>
        </div>
      </footer>
    </div>
    </Router>
  );
}

export default App;
