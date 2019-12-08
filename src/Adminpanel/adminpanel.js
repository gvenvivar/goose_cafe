import React, {useEffect, useState} from 'react'
import FirebaseContext from '../Firebase/context.js';
import Admin from '../Adminpanel/admin.js'
import Contacts from '../Adminpanel/contacts.js'
import Menu from '../Adminpanel/menu.js'
import ReviewList from '../Adminpanel/reviewList.js'
import Editdish from '../Adminpanel/dish.js'
import Review from '../Adminpanel/review.js'
import '../css/admin.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


const Adminpanel = (props)=> {
  const firebase = React.useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [disable, setdisable] = useState(true);
  const history = useHistory();

  let rightCol = null;

  if(props.section === 'contacts'){
    rightCol = <Contacts />
  }
  if(props.section === 'menu'){
    rightCol = <Menu />
  }
  if(props.section === 'reviews'){
    rightCol = <ReviewList />
  }
  if(props.section === 'edit-dish'){
    rightCol = <Editdish loadData={true}/>
  }
  if(props.section === 'addnewdish'){
    rightCol = <Editdish loadData={false}/>
  }
  if(props.section === 'addNewReview'){
    rightCol = <Review loadData={false}/>
  }
  if(props.section === 'edit-review'){
    rightCol = <Review loadData={true}/>
  }



  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user.email.split('@')[0]);
    })
  }, [setUser])

  function signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      setUser(false);
      console.log('signOut successful')
      history.push('/admin');
    }).catch(function(error) {
      // An error happened.
      console.log(console.error())
    })
  }

  return (
    user
      ?<div className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-panel-name">Admin Panel</div>
          <div className="admin-panel-user" onClick={(e)=>signOut(e)}>{user}</div>
        </div>
        <div className="admin-panel-main">
          <AdminpanelSections section={props.section}/>
          {rightCol}
        </div>
      </div>
      : <Admin />

  )
}


const AdminpanelSections = (props) => {
  const [active, setactive] = useState(0);
  const data = [
    { id: 1, name: "contacts", text: "Contacts" },
    { id: 2, name: "menu", text: "Menu" },
    { id: 3, name: "reviews", text: "Reviews" },
  ]

  useEffect(()=>{
    if(props.section === 'contacts'){
      setactive(1)
    }
    if(props.section === 'menu' || props.section === 'edit-dish' || props.section === 'addnewdish'){
    setactive(2)
    }
    if(props.section === 'reviews' || props.section === 'edit-review' || props.section === 'addNewReview'){
      setactive(3)
    }
  },[])

  function onClickTab(id) {
    setactive(id);
  }

  let tabs = data.map(tab=> {
    return <AdminTab
      key={`tab-${tab.id}`}
      id={tab.id}
      active={active}
      url={tab.name}
      name={tab.text}
      onClickTab={onClickTab}
    />
  })

  return (
    <div className="admin-panel-sections">
      <div className='admin-panel-section dark'>Sections</div>
      {tabs}
    </div>
  )
}

const AdminTab = (props) =>{
  const active = props.active === props.id ? true : false;
  return(
    <Link onClick={() => props.onClickTab(props.id)} to={`/adminpanel/${props.url}`} className={active ? 'admin-panel-section active': 'admin-panel-section' }>{props.name}</Link>
  )
}

export default Adminpanel;
