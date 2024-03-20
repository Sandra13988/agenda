
export const Listado = ({ contactos, borrarDato, setElementoSeleccionado}) => {

    

    

    return (
        <div>
            <h2>Listar contactos</h2>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>TELEFONO</th>
                        <th>E-MAIL</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>    
                <tbody>
                    
                    {contactos.map(contacto => {
                        return(
                        <tr key={contacto.id}>
                            
                            <td>{contacto.nombre}</td>
                            <td>{contacto.telefono}</td>
                            <td>{contacto.mail}</td>
                            <td><button onClick={() => setElementoSeleccionado(contacto)}>VER DETALLES</button></td>
                            <td><button onClick={() => setElementoSeleccionado(contacto)}>MODIFICAR</button></td>
                            <td><button onClick={() => borrarDato(contacto.id)}>BORRAR</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
