import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoTipos } from '../../../Queris/QueryTipo';
import jsonpath from 'jsonpath';

export const FormularioModificarTipos = () => {

const navegar = useNavigate()
const { id } = useParams()
   

   
    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()

    const queryClient = useQueryClient()

    const mutationModificarTipo = useMutation({
        mutationFn: async (valoresNuevos) => {
            const nuevosDatos = listadoTipos.record.map(contacto => {
                if (contacto.id === valoresNuevos.id) {
                    return valoresNuevos;
                }
                return contacto; 
            });

            const response = await fetch('https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'tipos'
                },
                body: JSON.stringify(nuevosDatos)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: (nuevosDatos) => {
            console.log("Se ha modificado el tipo");

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
        <>
           <Formik
            initialValues={jsonpath.query(listadoTipos.record, `$[?(@.id == ${id})]`)[0] }

            validationSchema={Yup.object({
                
                name: Yup.string()
                    .required("El nombre del tipo es requerido"),
            })}

            enableReinitialize={true}
            
            onSubmit={(values, { resetForm }) => {
                mutationModificarTipo.mutate(values)
                resetForm()
                navegar("/")
                
            }}>

            {({
                isValid,
                values,
            }) => (

                <Form>
                    <div>
                        <label htmlFor="name">Nombre: </label>
                        <Field name="name" id="name" type="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                    <input
                        type="submit"
                        value={"Modificar"}
                        disabled={!isValid}
                    />
                    <Link to="/"><input
                        type="submit"
                        value={"Volver"}
                    /></Link>
                     </div>
                </Form>
            )}
        </Formik>
        </>
    )
} 