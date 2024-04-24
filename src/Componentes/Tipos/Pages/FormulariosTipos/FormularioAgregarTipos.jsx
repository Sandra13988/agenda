import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'

export const FormularioAgregarTipos = ({funcion}) => {
    const navegar = useNavigate()

    

    return(
        <>
           <Formik
            initialValues={{
               
                name: '',
            }}

            validationSchema={Yup.object({
                
                name: Yup.string()
                    .required("El nombre del tipo es requerido"),
            })}


            onSubmit={(values, { resetForm }) => {
                funcion(values) 
                resetForm()
                navegar("/")
                
            }}>

            {({
                isValid,
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
                        value={"Agregar"}
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