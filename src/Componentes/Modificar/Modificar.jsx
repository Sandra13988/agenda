import { useState, useEffect } from "react"
import { Formulario2 } from '../Formulario/Formulario2'
// import { Formulario2 } from '../Componentes/Formulario/Formulario2'

export const Modificar = ({ contactoEntrante, funcion, inputRef, showToast, accionModificar }) => { 
   
    

    const [contacto, setContacto] = useState(contactoEntrante)

    useEffect(() => {
        setContacto(contactoEntrante)
    }, [contactoEntrante])

    console.log(contacto)

    return(
        <>
        {/* accionModificar &&  */}
        <h2>Mlodificar contacto</h2>
        {<Formulario2 contactoEntrante={contacto} funcion={funcion}  titulo={"Modificar contacto"} nombreBoton={"Modificar"} inputRef={inputRef} showToast={showToast} mensajeToast={"Contaco modificado"}/>}
       
       
       
        </>
    )
}
