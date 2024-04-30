
import { Link } from 'react-router-dom'
import { useQueryListadoContactos } from '../../../Queris/QueryAgenda'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Filtro } from '../../Filtro'
import { useContext } from 'react'
import { Tipos } from '../../context'


export const Listado = () => {
    const  {tipoSeleccionado} = useContext(Tipos)

    const { isLoading: isLoadingListado, isError: isErrorListado, error: errorListado, data: listado } = useQueryListadoContactos()
  
    console.log(tipoSeleccionado)
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
        onSuccess: (data) => {
            console.log("Se ha borrado el contacto");
            queryClient.setQueryData(["contactos", "listado"], data)
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
        <Filtro/>
        <Link to="/"> <button >MENU</button></Link>
        <Link to="/agenda/agregar"> <button >AGREGAR</button></Link>
       
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
                  
                  if (!tipoSeleccionado) {
                    // Si no hay filtro, muestra todos los contactos
                    return (
                        <tr key={contacto.id} >
                            <td>{contacto.nombre}</td>
                            <td>{contacto.telefono}</td>
                            <td>{contacto.email}</td>
                            <td><Link to={`/agenda/detalles/${contacto.id}`}><button>VER DETALLES</button></Link></td>
                            <td><Link to={`/agenda/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                            <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                        </tr>
                    );
                } else {
                    // Si hay un filtro, verifica si el contacto coincide con el tipoSeleccionado
                    if (contacto.tipo === tipoSeleccionado) {
                        return (
                            <tr key={contacto.id} >
                                <td>{contacto.nombre}</td>
                                <td>{contacto.telefono}</td>
                                <td>{contacto.email}</td>
                                <td><Link to={`/agenda/detalles/${contacto.id}`}><button>VER DETALLES</button></Link></td>
                                <td><Link to={`/agenda/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                                <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                            </tr>
                        );
                    } else {
                        // Si no coincide, no renderiza nada
                        return null;
                    }
                }
                    
                })}
            </tbody>
        </table>
    </div>
)
}



