import { useState, createContext } from "react";


export const Autenticacion = createContext()

export function AutenticacionUsuario (props){


    const [usuarioLogueado, setUsuarioLogueado] = useState({})
    //Props que le pasas al resto de componentes para tener acceso a ellos
    //en este caso sería a la variable y su setter.
    const valor = {usuarioLogueado, setUsuarioLogueado}

   
    return(
        <Autenticacion.Provider value={valor}>
            {/* Los props pueden ser en este caso tipoSeleccionad, setTipoSeleccionado o los dos */}
            {props.children} 
        </Autenticacion.Provider>
    )
}