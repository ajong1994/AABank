import { Link } from 'react-router-dom';

const List = ({ulclassName, ulID, id, liClassname, location, children}) => {
    
    return (           
            <ul className={ulclassName} id={ulID}>
                <li><Link id={id} className={liClassname} to={location}>{children}</Link></li>
            </ul>
        
    )
}

export default List