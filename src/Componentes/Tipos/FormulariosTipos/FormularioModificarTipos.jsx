import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoTipos } from '../../../Queris/QueryTipo';
import { useQueryListadoTiposPrueba } from '../../../Queris/QueryTipo';
import jsonpath from 'jsonpath';
import { useContext } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin';
export const FormularioModificarTipos = () => {

const navegar = useNavigate()
const { id } = useParams()
   

   
    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { isLoading: isLoadingListadoTiposPrueba, isError: isErrorListadoTiposPrueba, error: errorListadoTiposPrueba, data: listadoTiposPrueba } = useQueryListadoTiposPrueba()
    const { usuarioLogueado } = useContext(Autenticacion)


    const queryClient = useQueryClient()

    const mutationModificarTipo = useMutation({
        mutationFn: async (valoresNuevos) => {
            
            const actualizacion = { ...listadoTiposPrueba.record }
       

            actualizacion[usuarioLogueado.id] = actualizacion[usuarioLogueado.id].map(tipo => {
                if (tipo.id === valoresNuevos.id) {
                    console.log("Coincide")
                    return valoresNuevos
                }
                return tipo
            });

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
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: (nuevosDatos) => {
            console.log("Se ha modificado el tipo");
            queryClient.invalidateQueries(["tipos", "listado"]);

            //Esto es para actualizar los datos de la cache a mano

            // queryClient.setQueryData(["tipos", "listado"], (oldData) => {
            //     if (!oldData) return [nuevosDatos]; 
            //     const updatedData = oldData.map(item => {
            //         if (item.id === nuevosDatos.id) {
            //             return nuevosDatos;
            //         }
            //         return item;
            //     });
            //     return updatedData;
            // });

            //---------------------------------------------------------

            // Es una de las maneras de recuperar los datos nuevos

            // Esto es para invalidar la query y hacer un refetch
            // queryClient.invalidateQueries(["contactos", "listado"]);
            
        },
    });

    
    return(
        
           <Formik
            initialValues={jsonpath.query(listadoTiposPrueba.record[usuarioLogueado.id], `$[?(@.id == ${id})]`)[0] }

            validationSchema={Yup.object({
                
                nombre: Yup.string()
                    .required("El nombre del tipo es requerido"),
            })}

            enableReinitialize={true}
            
            onSubmit={(values, { resetForm }) => {
                mutationModificarTipo.mutate(values)
                resetForm()
                navegar("/tipos")
                
            }}>

            {({
                isValid,
                values,
            }) => (

                <Form>
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <Field name="nombre" id="nombre" type="nombre" />
                        <ErrorMessage name="nombre" component="div" />
                    </div>
                    <div>
                    <input
                        type="submit"
                        value={"Modificar"}
                        disabled={!isValid}
                    />
                    <Link to="/tipos"><input
                        type="submit"
                        value={"Volver"}
                    /></Link>
                     </div>
                </Form>
            )}
        </Formik>
        
    )
} 