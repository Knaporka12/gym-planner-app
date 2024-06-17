import { Link } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const NoMatching = ({missing, link, linkText}) => {

  const {navList, handleNavigate} = useContext(DataContext);

  let matchingNavLinkId = 0;

  navList.map((item) => {
    if (item.page === link) {
      matchingNavLinkId = item.id;
      return;
    }
  })

  console.log(matchingNavLinkId);
  


  return (

    <section className='no-matching'>
     
      <h2>No matching {missing} with given id</h2>
      <Link to={link} onClick={() => handleNavigate(matchingNavLinkId)}>Go to {linkText}</Link>
      
    </section>

  )

}

export default NoMatching
