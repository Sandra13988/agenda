
import { Link } from 'react-router-dom'
import { useQueryListadoContactos } from "../../Queris/QueryAgenda"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const Listado = () => {

    const { isLoading: isLoadingListado, isError: isErrorListado, error: errorListado, data: listado } = useQueryListadoContactos()
    // const { isLoading: isLoadingBorrado, isError: isErrorBorrado, error: errorBorrado, data: borrado } = useQueryListadoContactos()
    const queryClient = useQueryClient()

    const mutationBorrar = useMutation({
        mutationFn: async (id) => {
            const nuevaLista = listado.record.filter(contacto => contacto.id !== id);
            const response = await fetch('https://api.jsonbin.io/v3/b/6628d405ad19ca34f85f0ccd', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'defaultContactos'
                },
                body: JSON.stringify(nuevaLista)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: () => {
            console.log("Se ha borrado el contacto");
            queryClient.invalidateQueries(["contactos", "listado"]);
            navegar('/')
        },
    });


if (isLoadingListado) {
    return <h3>Cargando contactos...</h3>
}

if (isErrorListado || !listado) {
    return <h3>Ha habido un error .... {errorListado.message}</h3>
}
return (
    <div>
        <Link to="/agregar"> <button >AGREGAR</button></Link>
        <h2>Listar contactos</h2>
        <table>
            <thead>
                <tr>
                    <th>NOMBRE</th>
                    <th>TELEFONO</th>
                    <th>E-MAIL</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {listado.record.map(contacto => {
                    return (
                        <tr key={contacto.id} >
                            <td>{contacto.nombre}</td>
                            <td>{contacto.telefono}</td>
                            <td>{contacto.email}</td>
                            <td><Link to={`/detalles/${contacto.id}`}><button>VER DETALLES</button></Link></td>
                            <td><Link to={`/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                            <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)
}



