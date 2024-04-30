import { useState, createContext } from "react";

export const Tipos = createContext()

export function TipoProvider  (props){
    const [tipoSeleccionado, setTipoSeleccionado] = useState("")
    //Props que le pasas al resto de componentes para tener acceso a ellos
    //en este caso sería a la variable y su setter.
    const valor = {tipoSeleccionado, setTipoSeleccionado}

    return(
        <Tipos.Provider value={valor}>
            {/* Los props pueden ser en este caso tipoSeleccionad, setTipoSeleccionado o los dos */}
            {props.children} 
        </Tipos.Provider>
    )
}