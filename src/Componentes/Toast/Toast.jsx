import { useReducer } from "react"

export const Toast = ({mensaje, vilibilidad}) =>{

    return (
        <div style={{ display: vilibilidad ? 'block' : 'none', position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: 10, borderRadius: 5 }}>
            {mensaje}
        </div>
    )
}