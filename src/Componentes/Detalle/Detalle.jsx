import { useState, useEffect } from "react";

export const Detalle = ({ contactoVer, innerRef, accion}) => { 

    const [visible, setVisible] = useState()

    useEffect(() => {
        setVisible(accion);
    }, [accion]);

    
return(
    <div>
        <h2>Detalles</h2>
        <table className={visible ? "" : "escondido"} ref={innerRef}>
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
                    <td>{contactoVer.email}</td>
                    <td>{contactoVer.cp}</td>
                    <td>{contactoVer.localidad}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
    }
