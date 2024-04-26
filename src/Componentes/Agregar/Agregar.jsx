import { useEffect, useState } from "react";
import { FormularioAgregar } from '../Formulario/FormularioAgregar'

export const Agregar = ({funcion, showToast, accionAgregar}) => { 


    return(
       
        <>
        <h2>Agregar contacto</h2>
        {<FormularioAgregar  accionAgregar={accionAgregar}/>}
        </>
    )
}





