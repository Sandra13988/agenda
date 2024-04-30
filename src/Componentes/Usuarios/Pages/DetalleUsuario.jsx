import { Link, useParams } from 'react-router-dom'
import { useQueryUsuariosDetalle } from '../../../Queris/QueryUsuario';

export const DetalleUsuario = () => {

    const { id } = useParams(); // Obtener el parámetro de la URL que indica el ID del usuario
  

    const { isLoading: isLoadingUsuario, isError: isErrorUsuario, error: errorUsuario, data: usuario } = useQueryUsuariosDetalle({id: id})

    
    if(isLoadingUsuario){
        return <h2>Cargando ...</h2>
    }

    if(isErrorUsuario || !usuario){
        return  <h2>{errorusuario.message}</h2>
    }

    return (
        <>
            <div>
                <h2>Detalles</h2>
                <table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>MAIL</th>
                            <th>PASSWORD</th>
                            <th>TOKEN</th>
                        </tr>
                    </thead>
                    {<tbody>
                        <tr>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.password}</td>
                            <td>{usuario.token}</td>
                        </tr>

                    </tbody>}
                </table>

            </div>
            <Link to="/usuarios"><input
                type="submit"
                value={"Volver"}
            /></Link>

        </>
    )
}