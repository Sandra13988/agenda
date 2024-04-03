import { useEffect, useState } from "react";
import { Formulario2 } from '../Formulario/Formulario2'

export const Agregar = ({funcion, inputRef, showToast, accionAgregar}) => { 
        
    return(
       
        <>
        <h2>Agregar contacto</h2>
        {accionAgregar && <Formulario2 funcion={funcion} nombreBoton={"Agregar"} inputRef={inputRef} showToast={showToast} mensajeToast={"Contaco Agregado"}/>}
        </>
    )
}





