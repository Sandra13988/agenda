import {Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom'

export const FormularioModificarTipos = ({funcion, tipoModificar}) => {

const [tipo, setTipo] = useState()
const navegar = useNavigate()
const { id } = useParams()
    //EL VALUE DEL INPUT NAME NO RECOGE EL INITIAL VALUE

    useEffect(()=>{
        setTipo(tipoModificar)
    }, [id, tipoModificar])


    return(
        <>
           <Formik
            initialValues={{
                id: tipo ? tipo.id : "",
                name: tipo ? tipo.name : ""}}

            validationSchema={Yup.object({
                id: Yup.string()
                    .required("El id no se debe cambiar"),
                name: Yup.string()
                    .required("El nombre del tipo es requerido"),
            })}

            enableReinitialize={true}
            
            onSubmit={(values, { resetForm }) => {
                funcion(values) 
                resetForm()
                navegar("/")
                
            }}>

            {({
                isValid,
                values,
            }) => (

                <Form>
                   
                    <div>
                        <label htmlFor="id">ID: </label>
                        <Field name="id" id="id" type="id" />
                        <ErrorMessage name="id" component="div" />
                    </div>
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