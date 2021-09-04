
const Header = ({id, classname, children}) => {
    return (        
        <header id={id} className={classname}>
            {children}
        </header>
    )
}

export default Header
