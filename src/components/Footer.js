import { Link } from 'react-router-dom'
import logo from "../img/logoGym.png"
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Footer = () => {

  const { handleNavigate } = useContext(DataContext);

  return (

    <footer className='footer'>

      <figure className='footer__figure-logo'>
        <Link to={"/gym-planner-app"} className='footer__a-logo' onClick={()=> handleNavigate(0)}>
          <img className='footer__logo' src={logo} alt="logo-image" />
        </Link>
      </figure>

    </footer>

  )

}

export default Footer
