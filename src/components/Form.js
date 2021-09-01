
const Form = ({classnames, children}) => {

    const submitForm = (event) => {
        event.preventDefault();
    }

    return (
        <form onClick={submitForm} className={classnames}>
            {children}
        </form>
    )
}

export default Form
