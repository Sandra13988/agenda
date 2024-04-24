import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { useQueryContactoDetalle } from '../../Queris/QueryAgenda'

export const Detalle = ({ contactos, contactoVer, innerRef, accion }) => {

    const { id } = useParams(); // Obtener el parámetro de la URL que indica el ID del usuario
    const [contactoDetalle, setContactoDetalle] = useState(contactoVer);

    const { isLoading: isLoadingContacto, isError: isErrorContacto, error: errorContacto, data: contacto } = useQueryContactoDetalle({id: id})

    console.log(contactos)

    useEffect(() => {
        setearContacto()
    }, [id, contactos]);

    const setearContacto = () => {
        // Buscar el contacto correspondiente en la lista de contactos
        const contactoEncontrado = contactos.find(contacto => contacto.id === parseInt(id));
        console.log(contactoEncontrado)
        if (contactoEncontrado) {
            setContactoDetalle(contactoEncontrado);
            console.log(contactoEncontrado)
        }
    }
    

    return (
        <>
            <div>
                <h2>Detalles</h2>
                <table ref={innerRef}>
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
                    {<tbody>
                        <tr>
                            <td>{contactoDetalle.id}</td>
                            <td>{contactoDetalle.dni}</td>
                            <td>{contactoDetalle.nombre}</td>
                            <td>{contactoDetalle.telefono}</td>
                            <td>{contactoDetalle.email}</td>
                            <td>{contactoDetalle.cp}</td>
                            <td>{contactoDetalle.localidad}</td>
                        </tr>

                    </tbody>}
                </table>

            </div>
            {/* <Link to="/"><input
                type="submit"
                value={"Volver"}
            /></Link> */}

        </>
    )
}
