import { Link, useParams } from 'react-router-dom'
import { useQueryUsuariosDetalle } from '../../../Queris/QueryUsuario';
import { comprobarAdmin } from '../../../Utiles/comprobarAdmin';

export const DetalleUsuario = () => {
    comprobarAdmin()

    const { id } = useParams(); // Obtener el parámetro de la URL que indica el ID del usuario


    const { isLoading: isLoadingUsuario, isError: isErrorUsuario, error: errorUsuario, data: usuario } = useQueryUsuariosDetalle({ id: id })


    if (isLoadingUsuario) {
        return <h2>Cargando ...</h2>
    }

    if (isErrorUsuario || !usuario) {
        return <h2>{errorUsuario.message}</h2>
    }

    return (
        <div className='mainContenido'>
            <h2>Detalles</h2>
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>MAIL</th>
                        <th>PASSWORD</th>
                        <th>PERMISO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{usuario.id}</td>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.password}</td>
                        <td>{usuario.permiso ? <h2>Si</h2> : <h2>No</h2>}</td>
                    </tr>
                </tbody>

            </table>


            <Link to="/usuarios"><input
                type="submit"
                value={"Volver"}
            /></Link>
        </div>

    )
}