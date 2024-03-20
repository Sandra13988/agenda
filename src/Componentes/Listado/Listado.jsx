
export const Listado = ({ contactos, getContacto, onUpdate, onView, onDelete}) => {


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
                            <td><button onClick={() => onView(getContacto(contacto))}>VER DETALLES</button></td>
                            <td><button onClick={() => onUpdate(getContacto(contacto))}>MODIFICAR</button></td>
                            <td><button onClick={() => onDelete(contacto.id)}>BORRAR</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
