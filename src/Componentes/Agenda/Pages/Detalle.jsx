import { Link, useParams } from 'react-router-dom'
import { useQueryContactoDetalle } from '../../../Queris/QueryAgenda';

export const Detalle = () => {

    const { id } = useParams(); // Obtener el parámetro de la URL que indica el ID del usuario
  

    const { isLoading: isLoadingContacto, isError: isErrorContacto, error: errorContacto, data: contacto } = useQueryContactoDetalle({id: id})

    
    if(isLoadingContacto){
        return <h2>Cargando ...</h2>
    }

    if(isErrorContacto || !contacto){
        return  <h2>{errorContacto.message}</h2>
    }

    return (
        <>
            <div>
                <h2>Detalles</h2>
                <table >
                    <thead>
                        <tr>
                            <th>TIPO</th>
                            <th>ID</th>
                            <th>DNI</th>
                            <th>NOMBRE</th>
                            <th>SEXO</th>
                            <th>TELEFONO</th>
                            <th>MAIL</th>
                            <th>CP</th>
                            <th>LOCALIDAD</th>
                        </tr>
                    </thead>
                    {<tbody>
                        <tr>
                            <td>{contacto.tipo}</td>
                            <td>{contacto.id}</td>
                            <td>{contacto.dni}</td>
                            <td>{contacto.nombre}</td>
                            <td>{contacto.sexo}</td>
                            <td>{contacto.telefono}</td>
                            <td>{contacto.email}</td>
                            <td>{contacto.cp}</td>
                            <td>{contacto.localidad}</td>
                        </tr>

                    </tbody>}
                </table>

            </div>
            <Link to="/agenda"><input
                type="submit"
                value={"Volver"}
            /></Link>

        </>
    )
}