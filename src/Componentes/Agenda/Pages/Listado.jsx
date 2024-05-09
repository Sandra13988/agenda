
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Filtro } from '../../Filtro'
import { useContext, useState } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin'
import { UsuarioSeleccionado } from '../../../Contextos/contextUsuarioSeleccionad'
import { Tipos } from '../../../Contextos/contextoTipo'
import { useQueryListadoContactosPrueba } from '../../../Queris/QueryAgenda'
import { useQueryListadoUsuarios } from '../../../Queris/QueryUsuario'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { FiltroUsuarioPermiso } from '../../FiltroUsuariosPermiso'



export const Listado = () => {

    const { usuarioLogueado } = useContext(Autenticacion)
    const { tipoSeleccionado } = useContext(Tipos)
    const { isLoading: isLoadingUsuariosPrueba, isError: isErrorUsuariosPrueba, error: errorUsuariosPrueba, data: usuariosPrueba } = useQueryListadoContactosPrueba()
    const { isLoading: isLoadingUsuarios, isError: isErrorUsuarios, error: errorUsuaros, data: usuarios } = useQueryListadoUsuarios()
    const { usuarioSeleccionado } = useContext(UsuarioSeleccionado)

    const queryClient = useQueryClient()

    const mutationBorrar = useMutation({
        mutationFn: async (id) => {
            const nuevaAgenda = usuariosPrueba.record[usuarioLogueado.id].filter(contacto => contacto.id !== id);


            const actualizacion = { ...usuariosPrueba.record }
            console.log(actualizacion)

            actualizacion[usuarioLogueado.id] = nuevaAgenda
            console.log(actualizacion)



            const response = await fetch('https://api.jsonbin.io/v3/b/6639d66bad19ca34f865ad53', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'pruebaContactos'
                },
                body: JSON.stringify(actualizacion)
            });

            if (!response.ok) {
                throw new Error('Error en la eliminacion del contacto');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Se ha borrado el contacto");
            queryClient.setQueryData(["contactosPrueba", "listado"], data)
            console.log(data)

        },
    });

    

    if (isLoadingUsuariosPrueba) {
        return <h3>Cargando contactos...</h3>
    }

    if (!usuariosPrueba || isErrorUsuariosPrueba) {
        return <h3>Ha habido un error .... {errorUsuariosPrueba.message}</h3>
    }

    return (
        <div className='mainContenido'>
            <div className='botonesAgenda'>

                <Link to="/agenda/agregar"> <button >AGREGAR</button></Link>
                <Filtro />
                {usuarioLogueado.rol === "Admin" && <FiltroUsuarioPermiso  />}
            </div>


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
                    {console.log(usuarioSeleccionado)}
                    {console.log(usuariosPrueba.record[0])}
                    {
                        usuarioLogueado.rol === "Admin" && usuarioSeleccionado &&
                        (
                            usuariosPrueba.record[usuarioSeleccionado] === undefined ?
                                <h2>Este usuario no tiene contactos registrados</h2> :
                                usuariosPrueba.record[usuarioSeleccionado].map(contacto => (
                                    (!tipoSeleccionado || contacto.tipo === tipoSeleccionado) && (
                                        <tr key={contacto.id}>
                                            <td>{contacto.nombre}</td>
                                            <td>{contacto.telefono}</td>
                                            <td>{contacto.email}</td>
                                            <td><Link to={`/agenda/detalles/${contacto.id}`}><button>DETALLE</button></Link></td>
                                            <td><Link to={`/agenda/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                                            <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                                        </tr>
                                    )
                                ))
                        )
                    }



                    {usuarioLogueado.rol === "User" && usuariosPrueba.record[usuarioLogueado.id].map(contacto => {
                        //VISUALIZAR CONTACOS SI ERES USUARIO Y NO TIENES NINGUN TIPO SELECCIONADO
                        if (!tipoSeleccionado) {
                            // Si no hay filtro, muestra todos los contactos
                            return (
                                <tr key={contacto.id} >
                                    <td>{contacto.nombre}</td>
                                    <td>{contacto.telefono}</td>
                                    <td>{contacto.email}</td>
                                    <td><Link to={`/agenda/detalles/${contacto.id}`}><button>DETALLE</button></Link></td>
                                    <td><Link to={`/agenda/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                                    <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                                </tr>
                            );
                        }

                        //VISUALIZAR CONTACTOS SI ERES USUARIO Y TIENES TIPO SELECCIONADO
                        if (contacto.tipo === tipoSeleccionado) {
                            return (
                                <tr key={contacto.id} >
                                    <td>{contacto.nombre}</td>
                                    <td>{contacto.telefono}</td>
                                    <td>{contacto.email}</td>
                                    <td><Link to={`/agenda/detalles/${contacto.id}`}><button>DETALLE</button></Link></td>
                                    <td><Link to={`/agenda/modificar/${contacto.id}`}><button> MODIFICAR</button></Link></td>
                                    <td><button onClick={() => mutationBorrar.mutate(contacto.id)}>BORRAR</button></td>
                                </tr>
                            );
                        }



                    }
                    )
                    }


                </tbody>
            </table>
        </div>
    )
}



