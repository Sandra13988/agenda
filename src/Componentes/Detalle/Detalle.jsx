import { useEffect } from "react";

export const Detalle = ({ dato }) => { 

    
    
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
                    <td>{dato.id}</td>
                    <td>{dato.dni}</td>
                    <td>{dato.nombre}</td>
                    <td>{dato.telefono}</td>
                    <td>{dato.mail}</td>
                    <td>{dato.cp}</td>
                    <td>{dato.localidad}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
    }
