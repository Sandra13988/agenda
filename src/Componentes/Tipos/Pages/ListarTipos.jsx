import { Link } from 'react-router-dom'
import { useQueryListadoTipos } from '../../../Queris/QueryTipo'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin'
import { useQueryListadoTiposPrueba } from '../../../Queris/QueryTipo'

export const ListarTipos = () => {

    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { isLoading: isLoadingListadoTiposPrueba, isError: isErrorListadoTiposPrueba, error: errorListadoTiposPrueba, data: listadoTiposPrueba } = useQueryListadoTiposPrueba()
    const { usuarioLogueado } = useContext(Autenticacion)

    const queryClient = useQueryClient()

    const mutationBorrarTipo = useMutation({
        mutationFn: async (id) => {
            const nuevaAgenda = listadoTiposPrueba.record[usuarioLogueado.id].filter(contacto => contacto.id !== id);


            const actualizacion = { ...listadoTiposPrueba.record }
            console.log(actualizacion)

            actualizacion[usuarioLogueado.id] = nuevaAgenda
            console.log(actualizacion)

            const response = await fetch('https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'tipos'
                },
                body: JSON.stringify(actualizacion)
            });

            if (!response.ok) {
                throw new Error('Error en la eliminacion del tipo');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Se ha borrado el tipo");
            // queryClient.invalidateQueries(["tipos", "listado"]);
            queryClient.setQueryData(["tiposPrueba", "listado"], data)
            navegar('/tipos')
        },
    });



    if (isLoadingListadoTipos || isLoadingListadoTiposPrueba) {
        return <h3>Cargando tipos...</h3>
    }


    if (isErrorListadoTipos || isErrorListadoTiposPrueba || !listadoTipos || !listadoTiposPrueba) {
        return <h3>Ha habido un error .... {errorListado.message}</h3>
    }

    return (
        <div className='mainContenido'>


            <Link to="/tipos/agregar"> <button >AGREGAR</button></Link>
            <h3>LISTA DE TIPOS</h3>
            <table>

                <tbody>

                    {listadoTiposPrueba.record[usuarioLogueado.id] && listadoTiposPrueba.record[usuarioLogueado.id].length > 0 ? (
                        listadoTiposPrueba.record[usuarioLogueado.id].map(tipo => (
                            <tr key={tipo.id}>
                                <td>{tipo.nombre}</td>
                                <td><Link to={`/tipos/modificar/${tipo.id}`}><button>MODIFICAR</button></Link></td>
                                <td>{<button onClick={() => mutationBorrarTipo.mutate(tipo.id)}>BORRAR</button>}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">
                                <h2>No hay tipos registrados</h2>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div >
    )
} 