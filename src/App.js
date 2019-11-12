import React from 'react';
import './App.css';
import logo from './img/logo.png'
import menu_logo from './img/menu_logo.png'
import menu_bg from './img/menu_bg.jpg'
import reviews_bg from './img/reviews_bg.jpg'
import board from './img/board.jpg'
import gooseWings from './img/goose_3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'
import DishDetails from './Components/dish-details'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const backgroundImage = {
  backgroundImage: `url(${menu_bg})`
}
const reviewbackgroundImage = {
  backgroundImage: `url(${reviews_bg})`
}
const boardImg = {
  backgroundImage: `url(${board})`
}

// const rewievsRate = {
//   '--rating': 4.5
// }


function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="inner-header">
          <a href="#" className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</a>
          <div className='header-right'>
            <div className="open_hours">
              <span>Open hours:</span>
              <span>8am-10pm</span>
            </div>
            <div className='tel'><FontAwesomeIcon className="tel-icon" icon={faPhone} />1234-555-3254</div>
          </div>
        </div>
      </header>

      <section className='menu' style={backgroundImage}>
        <div className="board-menu-wrap">
          <div className="board-menu" style={boardImg}>
            <div className="board-header">
              <img className='gooseWings' src={gooseWings} alt='gooseWings'/>
              <h1>Pesky goose cafe</h1>
            </div>
            <div className="board-menu-list">
              <div className="board-menu-category">
                <h2>Drinks</h2>
                <ul className='menu_list'>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Latte</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Americano</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Juice</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Tea</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Hot Chocolate</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Caffè crema</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Guillermo</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Frappé</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Latte</a>
                    <span className='price'>12$</span>
                  </li>
                </ul>
              </div>

              <div className="board-menu-category">
                <h2>Meals</h2>
                <ul className='menu_list'>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Latte</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Americano</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Juice</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Tea</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Hot Chocolate</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Caffè crema</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Guillermo</a>
                    <span className='price'>12$</span>
                  </li>
                </ul>
              </div>

              <div className="board-menu-category">
                <h2>Desserts</h2>
                <ul className='menu_list'>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Latte</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Americano</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Juice</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Tea</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Hot Chocolate</a>
                    <span className='price'>12$</span>
                  </li>
                  <li className='menu_item'>
                    <a href="" className="dish_name">Caffè crema</a>
                    <span className='price'>12$</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        <div className="mobile-h1">
          <img src={menu_logo} alt="goose cafe logo" className='menu_logo'/>
          <h1>Pesky goose cafè menu</h1>
        </div>
      </section>
      <div className="mobile-menu">
        <div className="menu-category">
          <h2>Drinks</h2>
          <ul className='menu_list'>
            <li className='menu_item'>
              <a href="" className="dish_name">Latte</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Americano</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Juice</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Tea</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Hot Chocolate</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Caffè crema</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Guillermo</a>
              <span className='price'>12$</span>
            </li>
            <li className='menu_item'>
              <a href="" className="dish_name">Frappé</a>
              <span className='price'>12$</span>
            </li>
          </ul>
        </div>

      </div>

      <section className="reviews" style={reviewbackgroundImage}>
        <h2>Reviews</h2>
        <div className="review-item-wrap">
          <div className="review-item">
            <div className="review-top-block">
              <div className="total_rate" style={{'--rating': 4.5}}>
              </div>
              <div className="reviewer">- Eric Maxwell</div>
            </div>
            <div className="rates">
              <div className="rate-block">
                <div className="rate-name">Food</div>
                <div className="rate-mark">5</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Service</div>
                <div className="rate-mark">4</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Ambiance</div>
                <div className="rate-mark">5</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Price</div>
                <div className="rate-mark">4</div>
              </div>
            </div>
            <div className="review-text">Best Peking duck in our city. Fattened ducks are slaughtered, plucked, eviscerated
            and rinsed thoroughly with water. Air is pumped under the skin through the neck cavity to separate the skin
            from the fat. Besides traditional methods to prepare Peking Duck, recipes have been compiled by chefs around
            the world to produce the dish at home.</div>
          </div>
          <div className="review-item">
            <div className="review-top-block">
              <div className="total_rate" style={{'--rating': 3.8}}>
              </div>
              <div className="reviewer">- Eric Maxwell</div>
            </div>
            <div className="rates">
              <div className="rate-block">
                <div className="rate-name">Food</div>
                <div className="rate-mark">3</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Service</div>
                <div className="rate-mark">4</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Ambiance</div>
                <div className="rate-mark">5</div>
              </div>
              <div className="rate-block">
                <div className="rate-name">Price</div>
                <div className="rate-mark">4</div>
              </div>
            </div>
            <div className="review-text">Hot chocolate, also known as drinking chocolate, cocoa, and as chocolate tea in Nigeria,
            is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually
            a sweetener. Hot chocolate may be topped with whipped cream or marshmallows.</div>
          </div>
        </div>

        <button className="load-more">Load more</button>
      </section>

      <footer>
        <div className="inner-header">
          <a href="#" className='goose_name'><img src={logo} alt="Pesky goose cafè logo" className="logo"/>Pesky goose cafe</a>
          <div className='address'>
            Address: 27 Alderwood Drive Flushing, NY 11355
          </div>
          <div className="socials">
            <a href="#facebook"><FontAwesomeIcon className="facebook-icon" icon={faFacebookSquare}/></a>
            <a href="#instagram"><FontAwesomeIcon className="instagram-icon" icon={faInstagram} /></a>
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
  );
}

export default App;
