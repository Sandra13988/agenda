import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoUsuarios } from '../../../Queris/QueryUsuario';
// import { showToast } from '../../../Utiles/Toast';

export const FormularioAgregarUsuarios = () => {

    const navegar = useNavigate()
  

    const { isLoading: isLoadingListadoUsuarios, isError: isErrorListadoUsuarios, error: errorListadoUsuarios, data: listadoUsuarios } = useQueryListadoUsuarios()


    const queryClient = useQueryClient()

    const mutationAgregarUsuarios = useMutation({
        mutationFn: async (nuevoUsuario) => {
            
            const nuevosDatos = [...listadoUsuarios.record, nuevoUsuario]
            const response = await fetch('https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'usuarios'
                    
                },
                body: JSON.stringify(
                    nuevosDatos
                )
            });
    
            if (!response.ok) {
                throw new Error('Error en agregar el usuario');
            }
            return response.json()
    
        },
        onSuccess: () => {
            console.log("Se ha insertado un usuario nuevo")
            queryClient.invalidateQueries({ queryKey:["usuarios", "listado"]})
        },
    })

    function randomToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 15; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    }
    
    if(isLoadingListadoUsuarios){
        return <h3>Cargando...</h3>
    }

    if(isErrorListadoUsuarios ){
        return <h3>Ha habido unerror ....</h3>
    }


    return(
        
           <Formik
            initialValues={{
                id: '',
                name: '',
                email: '',
                password: '',
                pregunta: '',
                respuesta: '',
                rol: 'User',
                token: '',
                permiso: false
            }}

            validationSchema={Yup.object({
                
                name: Yup.string()
                    .required("El nombre es requerido"),
                email: Yup.string()
                    .required("El email es requerido"),
                password: Yup.string()
                    .required("La contraseña es requerido"),
                pregunta: Yup.string()
                    .required("La pregunta es requerido"),
                respuesta: Yup.string()
                    .required("La respuesta es requerido"),


                    
            })}


            onSubmit={(values, { }) => {
                console.log(values)
                mutationAgregarUsuarios.mutate(values)
                values.token = randomToken()
                const lastId = listadoUsuarios.record.reduce((maxId, contacto) => Math.max(maxId, contacto.id), 0);
                values.id = lastId + 1;
                navegar('/usuarios')
                // showToast("Tipo agregado")
            }}>

            {({
                isValid,
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
                        <label htmlFor="pregunta">Pregunta secreta: </label>
                        <Field as="select" name="pregunta" id="pregunta" type="pregunta" >
                            <option value="1" name="1">¿Como se llamaba tu primera mascota?</option>
                            <option value="2" name="2">¿Donde nació tu madre?</option>
                            <option value="3" name="3">¿Cuál era el nombre de tu mejor amigo/a de la infancia?</option>
                            <option value="4" name="4">¿Cuál era tu apodo en la escuela secundaria?</option>
                        </Field>
                        <ErrorMessage name="pregunta" component="div" />
                    </div>
                    <div>
                        <label htmlFor="respuesta">Respuesta secreta: </label>
                        <Field name="respuesta" id="respuesta" type="respuesta" />
                        <ErrorMessage name="respuesta" component="div" />
                    </div>
                    <div>
                    <input
                        type="submit"
                        value={"Agregar"}
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
        
    )
} 