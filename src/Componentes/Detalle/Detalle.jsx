export const Detalle = ({ contactoSeleccionadoDetalle }) => { 
    const comprobarExistencia = () =>{
        
    }
    
return(
    <div>
        <h2>Detalles</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>NOMBRE</th>
                    <th>TELEFONO</th>
                    <th>MAIL</th>
                    <th>CP</th>
                    <th>LOCALIDAD</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    
                    <td>{contactoSeleccionadoDetalle.id}</td>
                    <td>{contactoSeleccionadoDetalle.dni}</td>
                    <td>{contactoSeleccionadoDetalle.nombre}</td>
                    <td>{contactoSeleccionadoDetalle.telefono}</td>
                    <td>{contactoSeleccionadoDetalle.mail}</td>
                    <td>{contactoSeleccionadoDetalle.cp}</td>
                    <td>{contactoSeleccionadoDetalle.localidad}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
}