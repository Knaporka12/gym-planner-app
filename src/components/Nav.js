import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { Link } from 'react-router-dom';
import logo from "../img/logoGym.png";
import NavItem from './NavItem';

const Nav = () => {

  const {navList, handleNavigate} = useContext(DataContext);

  return (

    <nav className='nav'>

      <figure className="nav__figure">
        <Link className='nav__a' to={"/gym-planner-app"} onClick={() => {handleNavigate(0)}} >
          <img className="nav__logo" src={logo} alt="Logo-Jim-Planner" />
        </Link>
      </figure>

      <ul className="nav__ul">

        {navList.map((link, index) => {

          return (
            <NavItem
              key={index}
              link={link}
              handleNavigate={handleNavigate}
            ></NavItem>
          )

        })}

      </ul>

    </nav>

  )

}

export default Nav
