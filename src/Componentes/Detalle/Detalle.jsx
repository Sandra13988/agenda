import { useEffect } from "react";

export const Detalle = ({ contactoVer }) => { 
    if (!contactoVer) {
        return (
            <div>
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
                </table>
            </div>
        )
       
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
                    <td>{contactoVer.id}</td>
                    <td>{contactoVer.dni}</td>
                    <td>{contactoVer.nombre}</td>
                    <td>{contactoVer.telefono}</td>
                    <td>{contactoVer.mail}</td>
                    <td>{contactoVer.cp}</td>
                    <td>{contactoVer.localidad}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
    }
