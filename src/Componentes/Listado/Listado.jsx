
export const Listado = ({ contactos, setContactos, setContactoSeleccionadoListar, setContactoSeleccionadoModificar}) => {
    

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
                            <td><button onClick={() => setContactoSeleccionadoListar(contacto.id)}>VER DETALLES</button></td>
                            <td><button onClick={() => setContactoSeleccionadoModificar(contacto.id)}>MODIFICAR</button></td>
                            <td><button onClick={() => setContactos(contactos.filter(contactoFiltrado => contactoFiltrado.id !== contacto.id))}>BORRAR</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
