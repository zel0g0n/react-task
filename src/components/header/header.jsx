import { navbarList } from '../../constants/app'
import Language from '../language/language'
import './header.scss'  

const Header = () => {

  return (
    <>
    
      <div className='header'>
        <nav>
            <ul className="navbar">
              
              {navbarList.map(item => (
                <li key={item.path} className="navbar__item">
                  <a href='#'>{item.text}</a>
                </li>
              ))}
              
            </ul>
        </nav>
        <div className="bars-menu"><i className="fa-solid fa-bars"></i></div>
        <div className="header__btns">
          <Language></Language>
          <button  className="header__button btn">Sinovdan otish</button>
        </div>
      </div>
      <div className="stroke"></div>
    </>
  )
}

export default Header