import React from 'react'
import logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'

const Footer = (props)=> {
  return(
    <footer>
      <div className="inner-header">
        <a href="#" className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</a>
        <div className='address'>
          Address: {props.contacts.address}
        </div>
        <div className="socials">
          <a href={props.contacts.facebook}><FontAwesomeIcon className="facebook-icon" icon={faFacebookSquare}/></a>
          <a href={props.contacts.instagram}><FontAwesomeIcon className="instagram-icon" icon={faInstagram} /></a>
        </div>
        <div className='header-right'>
          <div className="open_hours">
            <span>Open hours:</span>
            <span>8am-10pm</span>
          </div>
        </div>
        <div className='tel'><FontAwesomeIcon className="tel-icon" icon={faPhone} />{props.contacts.phone}</div>
      </div>
    </footer>
  )
}

export default Footer;
