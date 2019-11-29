import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import FirebaseContext from '../Firebase/context.js'
import {uiConfig} from '../Firebase/firebase.js'

const Admin = ()=> {
  const firebase = React.useContext(FirebaseContext);

  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    </>
  )
}

export default Admin;
