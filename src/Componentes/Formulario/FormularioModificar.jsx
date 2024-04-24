
import { useState, useEffect, useRef } from "react"
import { Field, ErrorMessage, Formik, Form } from 'formik';
import { useNavigate, Link, useParams } from 'react-router-dom'
import * as Yup from 'yup';


export const FormularioModificar = ({ contactos, contactoEntrante, funcion, nombreBoton, showToast, mensajeToast }) => {


    const inputRefModificar = useRef(null)
    const navegar = useNavigate()
    const [lugares, setLugares] = useState([])
    const [longitudCp, setLongitudCp] = useState(0)
    const { id } = useParams(); // Obtener Id
    const [contactoModificar, setContactoModificar] = useState(contactoEntrante);

    useEffect(() => {
        setearContacto()
    }, [id, contactos]);

    const setearContacto = () => {
        const contactoEncontrado = contactos.find(contacto => contacto.id === parseInt(id));
        if (contactoEncontrado) {
            setContactoModificar(contactoEncontrado);
        }
    }



    useEffect(() => {
        inputRefModificar.current.focus()
    }, [])

    function fetchDataLocalidad(cp) {
        // URL de la API que deseas consultar
        const apiUrl = 'http://api.zippopotam.us/ES/' + cp;

        // Realizar la solicitud GET a la API
        fetch(apiUrl)
            .then(response => {
                console.log(response)
                // Verificar si la solicitud fue exitosa (código de estado 200)
                if (!response.ok) {
                    throw new Error('Ocurrió un error al obtener los datos');
                }
                // Convertir la respuesta a formato JSON
                return response.json();
            })
            .then(data => {
                // Manipular los datos obtenidos de la API
                const arrayLugares = []
                data.places.forEach(place => {
                    arrayLugares.push(place['place name'])
                    console.log(data)
                    setLugares(arrayLugares)

                });

            })
            .catch(error => {
                // Capturar y manejar errores
                console.error('Error al obtener los datos:', error);
            });
    }

    const handleOnChange = (e) => {

        const cp = e.target.value;
        setLongitudCp(cp.length)
        if (cp) {
            fetchDataLocalidad(cp);

            console.log(cp)
        }
    };

    return (
        <Formik
            enableReinitialize={true} //Reinicia el formulario con los valores nuevos
            initialValues={contactoModificar}

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


            onSubmit={(values, { resetForm }) => {
                console.log("contacto en submit :", contactoEntrante);
                funcion(values)
                showToast(mensajeToast)
                navegar('/')
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
                        <Field name="dni" id="dni" type="dni" innerRef={inputRefModificar} />
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
                        <Field name="email" id="email" type="email" autoComplete="on" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="direccion">Direccion</label>
                        <Field name="direccion" id="direccion" type="direccion" />
                        <ErrorMessage name="direccion" component="div" />
                    </div>

                    <div>
                        <label htmlFor="cp">CP</label>
                        <Field name="cp" id="cp" type="cp" onChange={e => {
                            handleOnChange(e);
                            setFieldValue("cp", cp.value); //Tiene que venir aqui, no se puede meter en el handle idkw

                        }} />

                        <ErrorMessage name="cp" component="div" />
                    </div>

                    <div>
                        <label htmlFor="localidad">Localidad</label>
                        <Field as="select" name="localidad" id="localidad" type="localidad" disabled={longitudCp < 5}>
                            <option value="" >{values.localidad}</option>
                            {lugares.map(lugar => (
                                <option key={lugar} value={lugar}>{lugar}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="localidad" component="div" />
                    </div>

                    <input
                        type="submit"
                        value={nombreBoton}
                        disabled={touched && errors.length > 0}
                    />
                     <Link to="/"><input
                        type="submit"
                        value={"Volver"}
                    /></Link>
                </Form>
            )}
        </Formik>

    );

}