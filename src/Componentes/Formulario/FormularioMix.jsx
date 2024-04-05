
import { useState, useEffect} from "react"
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';


export const FormularioModificar = ({ contactoEntrante, funcion,   nombreBoton, inputRef, showToast, mensajeToast}) => {
    
    const [contacto, setContacto] = useState()

    useEffect(() => {
        setContacto(contactoEntrante)
    }, [contactoEntrante])
    
    console.log(contacto)
    return (
        
        <Formik
            initialValues={{
                dni: contacto ?  contacto.dni : '',
                nombre: contacto ?  contacto.nombre : '',
                telefono: contacto ?  contacto.telefono : '',
                email: contacto ?  contacto.email : '',
                direccion: contacto ?  contacto.direccion : '',
                cp: contacto ?  contacto.cp : '',
                localidad: contacto ?  contacto.localidad : ''
            }}

            validationSchema={Yup.object({
                // id: Yup.string()
                //     .required("El id del usuario es requerido"),
                dni: Yup.string()
                    .required("El DNI es requerido"),
                nombre: Yup.string()
                    .required("El nombre es requerido"),
                telefono: Yup.string()
                    // .matches(/^[6|9][0-9]{8}$/, "El número de teléfono no es válido")
                    .required("El teléfono es requerido"),
                email: Yup.string()
                    .required("El correo es obligatorio")
                    .email("El formato del mail no es correcto"),
                direccion: Yup.string()
                    .required("La direccion es requerida"),
                cp: Yup.number("El formato del codigo postal debe ser 5 numeros")
                    .required("El codigo postal es requerido"),
                localidad: Yup.string()
                    .required("La localidad es requerida"),
            })}


            onSubmit={(values) => {
                console.log(values)
                showToast(mensajeToast)
                funcion(values)
                showToast(mensajeToast)
            }}
        >
            {({
            setFieldValue,// setear un valor en un atributo de formik
            setFieldTouched, // marcar un atributo de formik como tocado
            values,
            errors,
            touched,
          }) => (
            <Form>
                
                <div>
                    <label htmlFor="dni">DNI</label>
                    <Field name="dni" id="dni" type="dni" innerRef={inputRef} />
                    <ErrorMessage name="dni" component="div" />
                </div>

                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <Field name="nombre" id="nombre" type="nombre" />
                    <ErrorMessage name="nombre" component="div" />
                </div>

                <div>
                    <label htmlFor="telefono">Telefono</label>
                    <Field name="telefono" id="telefono" type="telefono" />
                    <ErrorMessage name="telefono" component="div" />
                </div>


                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" id="email" type="email" autoComplete="on"/>
                    <ErrorMessage name="email" component="div" />
                </div>

                <div>
                    <label htmlFor="direccion">Direccion</label>
                    <Field name="direccion" id="direccion" type="direccion" />
                    <ErrorMessage name="direccion" component="div" />
                </div>

                <div>
                    <label htmlFor="cp">CP</label>
                    <Field name="cp" id="cp" type="cp" />
                    <ErrorMessage name="cp" component="div" />
                </div>

                <div>
                    <label htmlFor="localidad">Localidad</label>
                    <Field name="localidad" id="localidad" type="localidad" />
                    <ErrorMessage name="localidad" component="div" />
                </div>

                <pre>
                    <p>{JSON.stringify(values, null, 2)}</p>
                    <p>{JSON.stringify(errors, null, 2)}</p>               
                </pre>

                <input
                    type="submit"
                    value={nombreBoton}
                    disabled={touched && errors.length > 0}
                />
            </Form>
        )}
        </Formik>
          
    );

}