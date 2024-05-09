import { useState, createContext } from "react";


export const UsuarioSeleccionado = createContext()

export function Seleccionado (props){


    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(0)
    //Props que le pasas al resto de componentes para tener acceso a ellos
    //en este caso sería a la variable y su setter.
    const valor = {usuarioSeleccionado, setUsuarioSeleccionado}

   
    return(
        <UsuarioSeleccionado.Provider value={valor}>
            {/* Los props pueden ser en este caso tipoSeleccionad, setTipoSeleccionado o los dos */}
            {props.children} 
        </UsuarioSeleccionado.Provider>
    )
}