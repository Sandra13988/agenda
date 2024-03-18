
export const Listado = ({ contactos }) => {
    

    return (
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
                        <td><button onClick={() => a}>VER DETALLES</button></td>
                        <td><button onClick={() => a}>MODIFICAR</button></td>
                        <td><button onClick={() => a}>BORRAR</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
