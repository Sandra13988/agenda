
export const Listado = () => {
    const contactos = [{ id: 1, dni: "48557240P", nombre: "Sandra", telefono: "722192843", mail: "sandra@gmail.com", direccion: "La Cruz 26B", CP: "03158", Localidad: "Catral" },
    { id: 2, dni: "48555550S", nombre: "Daniel", telefono: "722192666", mail: "daniel@gmail.com", direccion: "La Purisima 16", CP: "03158", Localidad: "Catral" },
    { id: 3, dni: "48222250R", nombre: "Jose", telefono: "722192666", mail: "jose@gmail.com", direccion: "La Purisima 16", CP: "03360", Localidad: "Callosa" }];

    const [estadoContactos, setContacto] = useState(contactos)

    return (
        <table>
            <tbody>
                <tr>
                    <th>NOMBRE</th>
                    <th>TELEFONO</th>
                    <th>E-MAIL</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {contactos.map(contacto => {
                    return <tr key={contacto.id}><td>{contacto.nombre}</td><td>{contacto.telefono}</td><td>{contacto.mail}</td>
                    <td><button onClick={() => a}>VER DETALLES</button></td>
                    <td><button onClick={() => a}>MODIFICAR</button></td>
                    <td><button onClick={() => a}>BORRAR</button></td></tr>
                })}
            </tbody>
        </table>
    )
}
