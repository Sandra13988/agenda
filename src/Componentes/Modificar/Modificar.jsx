import { FormularioModificar } from '../Formulario/FormularioModificar'

export const Modificar = ({ contactos, contactoEntrante, funcion, showToast, accionModificar }) => { 
    

    return(
        <>
        <h2>Mlodificar contacto</h2>
        {<FormularioModificar contactos = {contactos} contactoEntrante={contactoEntrante} funcion={funcion}  titulo={"Modificar contacto"} nombreBoton={"Modificar"}  showToast={showToast} mensajeToast={"Contaco modificado"}/>}
        </>
    )
}
