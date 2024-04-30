import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoUsuarios } from '../../../Queris/QueryUsuario';
import jsonpath from 'jsonpath';

export const FormularioModificarUsuarios = () => {

const navegar = useNavigate()
const { id } = useParams()
   

   
    const { isLoading: isLoadingListadoUsuarios, isError: isErrorListadoUsuarios, error: errorListadoUsuarios, data: listadoUsuarios } = useQueryListadoUsuarios()

    const queryClient = useQueryClient()

    const mutationModificarUsuarios = useMutation({
        mutationFn: async (valoresNuevos) => {
            const nuevosDatos = listadoUsuarios.record.map(usuario => {
                if (usuario.id === valoresNuevos.id) {
                    return valoresNuevos;
                }
                return usuario; 
            });

            const response = await fetch('https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'usuarios'
                },
                body: JSON.stringify(nuevosDatos)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: (nuevosDatos) => {
            queryClient.invalidateQueries({ queryKey: ["usuarios", "listado"] })
            console.log("Se ha modificado el tipo");
        },
    });

    if(isLoadingListadoUsuarios){
        return <h3>Cargando...</h3>
    }

    if(isErrorListadoUsuarios ){
        return <h3>Ha habido unerror ....</h3>
    }
    
    return(
        <>
           <Formik
            initialValues={jsonpath.query(listadoUsuarios.record, `$[?(@.id == ${id})]`)[0] }

            validationSchema={Yup.object({
                
                name: Yup.string()
                    .required("El nombre es requerido"),
                email: Yup.string()
                    .required("El email es requerido"),
                password: Yup.string()
                    .required("La contraseña es requerido"),
                rol: Yup.string()
                    .required("El rol es requerido")
            })}

            enableReinitialize={true}
            
            onSubmit={(values, { resetForm }) => {
                mutationModificarUsuarios.mutate(values)
                resetForm()
                navegar("/usuarios")
                
            }}>

            {({
                isValid,
                values,
            }) => (

                <Form>
                     <div>
                        <label htmlFor="name">Name: </label>
                        <Field name="name" id="name" type="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <Field name="email" id="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <Field name="password" id="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="rol">Rol: </label>
                        <Field as="select" name="rol" id="rol" type="rol" >
                            <option value="Admin" name="Admin">Admin</option>
                            <option value="User" name="User">Usuario</option>
                        </Field>
                        {/* <Field as="select" name="tipo" id="tipo" type="tipo">
                            <option value="">Tipos</option>
                            <option key={tipo.name} value={tipo.name}>{tipo.name}</option>
                        </Field> */}
                        <ErrorMessage name="rol" component="div" />
                    </div>
                    <div>
                    <input
                        type="submit"
                        value={"Modificar"}
                        disabled={!isValid}
                    />
                    <Link to="/usuarios"><input
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