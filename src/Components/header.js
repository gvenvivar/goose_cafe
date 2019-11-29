import React from 'react'
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import {
  Link
} from "react-router-dom";

const Header = (props)=> {
  return (
    <header className="header">
      <div className="inner-header">
        <Link to='/' className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</Link>
        <div className='header-right'>
          <div className="open_hours">
            <span>Open hours:</span>
            <span>8am-10pm</span>
          </div>
          <div className='tel'><FontAwesomeIcon className="tel-icon" icon={faPhone} />{props.contacts.phone}</div>
        </div>
      </div>
    </header>
  )
}

export default Header;
