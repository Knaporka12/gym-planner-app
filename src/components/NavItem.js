import { Link } from 'react-router-dom'

const NavItem = ({ link, handleNavigate }) => {

    const { id, page, isSelected, text } = link;

    return (

        <Link
            className={isSelected ? 'nav-item selected' : 'nav-item'}
            to={page}
            onClick={() => { handleNavigate(id) }}
        >
            <li>{text}</li>
        </Link>

    )

}

export default NavItem
