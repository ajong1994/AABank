import React from 'react'

const Button = ({children, onclick, classnames}) => {
    return (
        <button className={classnames} onClick={() => onclick()}>
            {children}
        </button>
    )
}

export default Button
