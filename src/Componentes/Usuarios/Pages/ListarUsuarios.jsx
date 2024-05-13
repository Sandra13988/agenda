import { Link } from 'react-router-dom'
import { useQueryListadoUsuarios } from '../../../Queris/QueryUsuario'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { comprobarAdmin } from '../../../Utiles/comprobarAdmin'

export const ListarUsuarios = () => {
    comprobarAdmin()

    const { isLoading: isLoadingListadoUsuarios, isError: isErrorListadoUsuarios, error: errorListadoUsuarios, data: listadoUsuarios } = useQueryListadoUsuarios()

    const queryClient = useQueryClient()

    const mutationBorrarUsuario = useMutation({
        mutationFn: async (id) => {
            const nuevaLista = listadoUsuarios.record.filter(tipo => tipo.id !== id);
            const response = await fetch('https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'usuarios'
                },
                body: JSON.stringify(nuevaLista)
            });

            if (!response.ok) {
                throw new Error('Error en la eliminacion del usuario');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Se ha borrado el contacto");
            queryClient.setQueryData(["uauarios", "listado"], data)
            navegar('/')
        },
    });



    if (isLoadingListadoUsuarios) {
        return <h3>Cargando tipos...</h3>
    }


    if (isErrorListadoUsuarios || !listadoUsuarios) {
        return <h3>Ha habido un error .... {errorListadoUsuarios.message}</h3>
    }

    return (

        <div className='mainContenido'>
            <Link to="/usuarios/agregar"> <button type="button">AGREGAR</button></Link>
            <h3>LISTA DE USUARIOS</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                    </tr>
                </thead>
                <tbody>

                    {listadoUsuarios.record.map(usuario => {
                        return (
                            <tr key={usuario.id}>
                                <td >{usuario.id}</td>
                                <td >{usuario.name}</td>
                                <td><Link to={`/usuarios/detalles/${usuario.id}`}><button type="button">DETALLE</button></Link></td>
                                <td ><Link to={`/usuarios/modificar/${usuario.id}`}><button type="button">MODIFICAR</button></Link></td>
                                <td>
                                    <button type="button" onClick={() => mutationBorrarUsuario.mutate(usuario.id)} disabled={usuario.rol === "Admin"}>
                                        BORRAR
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
} 