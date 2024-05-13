import { Link } from 'react-router-dom'
import { useQueryListadoTipos } from '../../../Queris/QueryTipo'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin'
import { useQueryListadoTiposPrueba } from '../../../Queris/QueryTipo'
import { useQueryListadoContactosPrueba } from '../../../Queris/QueryAgenda'
import { UsuarioSeleccionado } from '../../../Contextos/contextUsuarioSeleccionad'

export const ListarTipos = () => {

    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { isLoading: isLoadingListadoTiposPrueba, isError: isErrorListadoTiposPrueba, error: errorListadoTiposPrueba, data: listadoTiposPrueba } = useQueryListadoTiposPrueba()
    const { isLoading: isLoadingUsuariosPrueba, isError: isErrorUsuariosPrueba, error: errorUsuariosPrueba, data: contactosPrueba } = useQueryListadoContactosPrueba()
    const { usuarioLogueado } = useContext(Autenticacion)
    const { usuarioSeleccionado } = useContext(UsuarioSeleccionado)

    const queryClient = useQueryClient()


    const mutationBorrarTipo = useMutation({
        mutationFn: async (tipo) => {
            let actualizacion = { ...listadoTiposPrueba.record } //Lista de tipos intacta
            let actualizacionContactos = { ...contactosPrueba.record } // Lista de contactos intacta
            let nuevaAgenda;
            let nuevosContactos;

            let contactosBorrados = []
            console.log(usuarioLogueado)
            const comprobarSiCoincidenUsuarios = () => {
                
                let hayCoincidencias = false;
                contactosPrueba.record[usuarioLogueado.id].map(contacto => {
                    console.log("Comparando con contacto:", contacto);
                    if (contacto.tipo === tipo.nombre) {
                        console.log("Coincidencia encontrada");
                        contactosBorrados.push(contacto);
                        hayCoincidencias = true;
                    }
                });
                
                return hayCoincidencias;
            };
            
      
            
            const comprobacion = comprobarSiCoincidenUsuarios()

            
            if (comprobacion) {
                const respuesta = confirm("Tiene contactos con el tipo " + tipo.nombre + ". Si borra el tipo, se procederá a borrar los contactos asociados, desea borrarlos?")
                if (respuesta === true) {
                    nuevaAgenda = listadoTiposPrueba.record[usuarioLogueado.id].filter(contacto => contacto.id !== tipo.id);
                    nuevosContactos = contactosPrueba.record[usuarioLogueado.id].filter(contacto => !contactosBorrados.includes(contacto));
                    actualizacion[usuarioLogueado.id] = nuevaAgenda
                    actualizacionContactos[usuarioLogueado.id] = nuevosContactos



                } else {
                    actualizacion = { ...listadoTiposPrueba.record }
                    actualizacionContactos = { ...contactosPrueba.record }
                }


            } else {
                console.log("Entra por aqui")
                nuevaAgenda = listadoTiposPrueba.record[usuarioLogueado.id].filter(contacto => contacto.id !== tipo.id);
                actualizacion[usuarioLogueado.id] = nuevaAgenda

            }


            const responseTipo = await fetch('https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'tipos'
                },
                body: JSON.stringify(actualizacion)
            });

            if (!responseTipo.ok) {
                throw new Error('Error en la eliminacion del tipo');
            }
            const dataTipo = await responseTipo.json();

            // Endpoint 2: Borrar contactos asociados
            const responseContactos = await fetch('https://api.jsonbin.io/v3/b/6639d66bad19ca34f865ad53', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'pruebaContactos'
                },
                body: JSON.stringify(actualizacionContactos)
            });

            if (!responseContactos.ok) {
                throw new Error('Error en la eliminacion de los contactos asociados');
            }
            const dataContactos = await responseContactos.json();

            return { tipo: dataTipo, contactos: dataContactos };
        },
        onSuccess: ({ tipo, contactos }) => {
            console.log("Se ha borrado el tipo y los contactos asociados");
            queryClient.setQueryData(["tiposPrueba", "listado"], tipo)
            queryClient.setQueryData(["contactosPrueba", "listado"], contactos)
            navegar('/tipos')
        },
    });

    // const nuevaAgenda =  usuariosPrueba.record[usuarioLogueado.id].filter(contacto => !usuariosBorrado.includes(contacto));
    // actualizacion[usuarioLogueado.id] = nuevaAgenda

    
    if (isLoadingListadoTipos || isLoadingListadoTiposPrueba) {
        return <h3>Cargando tipos...</h3>
    }


    if (isErrorListadoTipos || isErrorListadoTiposPrueba || !listadoTipos || !listadoTiposPrueba) {
        return <h3>Ha habido un error .... {errorListado.message}</h3>
    }

    return (
        <div className='mainContenido'>

{console.log(contactosPrueba)}
            <Link to="/tipos/agregar"> <button type="button">AGREGAR</button></Link>
            <h3>LISTA DE TIPOS</h3>
            <table>

                <tbody>

                    {listadoTiposPrueba.record[usuarioLogueado.id] && listadoTiposPrueba.record[usuarioLogueado.id].length > 0 ? (
                        listadoTiposPrueba.record[usuarioLogueado.id].map(tipo => (
                            <tr key={tipo.id}>
                                <td>{tipo.nombre}</td>
                                <td><Link to={`/tipos/modificar/${tipo.id}`}><button type="button">MODIFICAR</button></Link></td>
                                <td>{<button type="button" onClick={() => mutationBorrarTipo.mutate(tipo)}>BORRAR</button>}</td>
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