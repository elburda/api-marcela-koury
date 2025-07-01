import React from 'react'
import './Toast.scss'


export const Toast = ({message, state, position="top-right"}) => {
    
    return (
    <div className={`toast-container toast-${state} position-${position}`}>
        <p>{message}</p>
    </div>
)
}

export default Toast