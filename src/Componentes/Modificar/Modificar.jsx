import { useState, useEffect } from "react"
import { FormularioModificar } from '../Formulario/FormularioModificar'
import { useFetcher } from "react-router-dom"

export const Modificar = ({ contactoEntrante, funcion, showToast, accionModificar }) => { 
    

    return(
        <>
        {/* accionModificar &&  */}
        <h2>Mlodificar contacto</h2>
        {<FormularioModificar contactoEntrante={contactoEntrante} funcion={funcion}  titulo={"Modificar contacto"} nombreBoton={"Modificar"}  showToast={showToast} mensajeToast={"Contaco modificado"}/>}
        </>
    )
}
