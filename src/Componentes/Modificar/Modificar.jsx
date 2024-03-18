export const Modificar = ({ contactoSeleccionadoModificar, setDatosModificados}) => { 
    
    return(
       
        <div>
            <h2>Modificar contacto</h2>
            <form action="" onSubmit={e=>{
                e.preventDefault();
                const datosNuevos = {
                    id: e.target.idNuevo.value, 
                    dni: e.target.dniNuevo.value, 
                    nombre: e.target.nombreNuevo.value,
                    telefono: e.target.telefonoNuevo.value,
                    mail: e.target.mailNuevo.value,
                    direccion: e.target.direccionNueva.value,
                    cp: e.target.cpNuevo.value,
                    localidad: e.target.localidadNueva.value
                }
                setDatosModificados(datosNuevos)
            }}>
                <label >ID: <input type="text" name="idNuevo" id="idNuevo" value={contactoSeleccionadoModificar.id}/></label><br></br>
                <label >DNI: <input type="text" name="dniNuevo" id="dniNuevo" value={contactoSeleccionadoModificar.dni}/></label><br></br>
                <label >NOMBRE: <input type="text" name="nombreNuevo" id="nombreNuevo" value={contactoSeleccionadoModificar.nombre}/></label><br></br>
                <label >TELEFONO: <input type="text" name="telefonoNuevo" id="telefonoNuevo" value={contactoSeleccionadoModificar.telefono}/></label><br></br>
                <label >E-MAIL: <input type="text" name="mailNuevo" id="mailNuevo" value={contactoSeleccionadoModificar.mail}/></label><br></br>
                <label >DIRECCION: <input type="text" name="direccionNueva" id="direccionNueva" value={contactoSeleccionadoModificar.direccion}/></label><br></br>
                <label >CP: <input type="text" name="cpNuevo" id="cpNuevo" value={contactoSeleccionadoModificar.cp}/></label><br></br>
                <label >LOCALIDAD: <input type="text" name="localidadNueva" id="" value={contactoSeleccionadoModificar.localidad}/></label><br></br>
                <button>Enviar cambios</button>
            </form>
        </div>
    )
}