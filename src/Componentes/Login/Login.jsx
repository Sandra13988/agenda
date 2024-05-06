import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
// import { showToast } from '../../../Utiles/Toast';
import { useNavigate, Link } from 'react-router-dom'


export const Login = ({ handleLogin }) => {
    const navegar = useNavigate()
    return (
        <>
            
                <div className="contenedorLogin">
                    <div>
                        <h2>Login</h2>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}

                            validationSchema={Yup.object({

                                email: Yup.string()
                                    .required("El email es requerido"),
                                password: Yup.string()
                                    .required("La contraseña es requerido"),

                            })}


                            onSubmit={(values, { }) => {

                                console.log(values)
                                handleLogin(values)

                            }}>

                            {({
                                isValid,
                            }) => (

                                <Form>

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
                                        <input
                                            type="submit"
                                            value={"Login"}
                                            disabled={!isValid}
                                        />

                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div>
                        <h3>Aun no estas registrado?</h3>
                        <Link to="/registro"> <button >Registrate</button></Link>
                    </div>
                    <div>
                        <h3>Has olvidado la contraseña?</h3>
                        <Link to="/OlvidaPassword"> <button >Cambiar contraseña</button></Link>
                    </div>
                </div>
            
        </>
    );
}