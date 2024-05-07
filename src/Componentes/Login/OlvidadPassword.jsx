import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from 'react'
import { Autenticacion } from '../../Contextos/contextLogin';

export const OlvidaPassword = () => {

    const navegar = useNavigate()


    const { usuarioLogueado } = useContext(Autenticacion)


    const queryClient = useQueryClient()

    const mutationModificarUsuarios = useMutation({
        mutationFn: async (valoresNuevos) => {
            
               

            const response = await fetch('https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'usuarios'
                },
                body: JSON.stringify(valoresNuevos)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: (nuevosDatos) => {
            queryClient.invalidateQueries({ queryKey: ["usuarios", "listado"] })
            console.log("Se ha modificado el usuario");
        },
    });


    
    const pregunta = usuarioLogueado.pregunta
    const respuesta = usuarioLogueado.respuesta
    const passAntigua = usuarioLogueado.password
    console.log(usuarioLogueado.respuesta)


    return (
        <>
            <Formik
                initialValues={{
                    name: usuarioLogueado.name,
                    email: usuarioLogueado.email,
                    password: usuarioLogueado.password,
                    pregunta: '',
                    respuesta: '',
                    rol: usuarioLogueado.rol
                }}

                validationSchema={Yup.object({

                    name: Yup.string()
                        .required("El nombre es requerido"),
                    email: Yup.string()
                        .required("El email es requerido"),
                    oldPassword: Yup.string().test(
                        'match-oldPassword',
                        'La contraseña no es correcta',
                        function (value) {
                            return value === passAntigua;
                        }
                    ).required("La respuesta es requerida"),
                    newPassword: Yup.string()
                        .required("La contraseña es requerido"),
                    pregunta: Yup.string().test(
                        'match-pregunta',
                        'La pregunta no es correcta',
                        function (value) {
                            return value === pregunta;
                        }
                    ).required("La respuesta es requerida"),
                    respuesta: Yup.string().test(
                        'match-respuesta',
                        'La respuesta no es correcta',
                        function (value) {
                            return value === respuesta;
                        }
                    ).required("La respuesta es requerida"),
                    rol: Yup.string()
                        .required("El rol es requerido"),
                    permiso: Yup.boolean()
                        .required("Especifique el permiso deseado")
                })}

                enableReinitialize={true}

                onSubmit={(values, { resetForm }) => {

                    mutationModificarUsuarios.mutate(values)
                    resetForm()
                    navegar("/")

                }}>

                {({
                    isValid,
                    values,
                }) => (

                    <Form>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <Field name="email" id="email" type="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="oldPassword">Antigua Password: </label>
                            <Field name="oldPassword" id="oldPassword" type="oldPassword" />
                            <ErrorMessage name="oldPassword" component="div" />
                        </div>
                        <div>
                            <label htmlFor="newPassword">Nueva Password: </label>
                            <Field name="newPassword" id="newPassword" type="newPassword" />
                            <ErrorMessage name="newPassword" component="div" />
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
                        {usuarioLogueado.rol === "Admin" &&<div>
                            <label htmlFor="rol">Rol: </label>
                            <Field as="select" name="rol" id="rol" type="rol" >
                                <option value="Admin" name="Admin">Admin</option>
                                <option value="User" name="User">Usuario</option>
                            </Field>
                            <ErrorMessage name="rol" component="div" />
                        </div>}
                        <div>
                            <input
                                type="submit"
                                value={"Cambiar"}
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