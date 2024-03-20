import { useEffect } from "react";

export const Detalle = ({ elementoSeleccionado }) => { 

    
    
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
                    <td>{elementoSeleccionado.id}</td>
                    <td>{elementoSeleccionado.dni}</td>
                    <td>{elementoSeleccionado.nombre}</td>
                    <td>{elementoSeleccionado.telefono}</td>
                    <td>{elementoSeleccionado.mail}</td>
                    <td>{elementoSeleccionado.cp}</td>
                    <td>{elementoSeleccionado.localidad}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
    }
