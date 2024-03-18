export const Detalle = (contacto) => { 
    
    
    function detallar(contacto){
        <table>
            <tr>
                <td>{contacto.id}</td>
                <td>{contacto.dni}</td>
                <td>{contacto.nombre}</td>
                <td>{contacto.telefono}</td>
                <td>{contacto.mail}</td>
                <td>{contacto.cp}</td>
                <td>{contacto.localidad}</td>
            </tr>
        </table>
    }
}