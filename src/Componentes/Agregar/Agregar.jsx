import { useEffect, useState } from "react";
import { FormularioAgregar } from '../Formulario/FormularioAgregar'

export const Agregar = ({funcion, showToast, accionAgregar}) => { 


    return(
       
        <>
        <h2>Agregar contacto</h2>
        {<FormularioAgregar funcion={funcion} nombreBoton={"Agregar"} showToast={showToast} mensajeToast={"Contaco Agregado"} accionAgregar={accionAgregar}/>}
        </>
    )
}





