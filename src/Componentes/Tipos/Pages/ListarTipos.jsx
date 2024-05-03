import { Link } from 'react-router-dom'
import { useQueryListadoTipos } from '../../../Queris/QueryTipo'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin'

export const ListarTipos = () => {

    const {isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { usuarioLogueado} = useContext(Autenticacion)
    
    const queryClient = useQueryClient()
    
    const mutationBorrarTipo = useMutation({
        mutationFn: async (id) => {
            const nuevaLista = listadoTipos.record.filter(tipo => tipo.id !== id);
            const response = await fetch('https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'tipos'
                },
                body: JSON.stringify(nuevaLista)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Se ha borrado el contacto");
            // queryClient.invalidateQueries(["tipos", "listado"]);
            queryClient.setQueryData(["tipos", "listado"], data)
            navegar('/tipos')
        },
    });



    if (isLoadingListadoTipos) {
        return <h3>Cargando tipos...</h3>
    }

    
    if (isErrorListadoTipos || !listadoTipos) {
        return <h3>Ha habido un error .... {errorListado.message}</h3>
    }
    
    return(
        <>
        <div>
        <Link to="/menu"> <button >MENU</button></Link>
        <Link to="/tipos/agregar"> <button >AGREGAR</button></Link>
            <h3>LISTA DE TIPOS</h3>
            <table>
           
            <tbody>
                
                {listadoTipos.record.map(tipo => {
                    if(tipo.tokenUsuario === usuarioLogueado.token){
                        return (
                            <tr key={tipo.id}>
                                <td >{tipo.name}</td>
                                <td ><Link to={`/tipos/modificar/${tipo.id}`}><button>MODIFICAR</button></Link></td>
                                <td >{<button onClick={() =>mutationBorrarTipo.mutate(tipo.id)}>BORRAR</button>}</td>
                            </tr>
                            )
                    }
                       
                    })}
            </tbody>
            </table>
            </div>
        </>
    )
} 