
import { useState, useEffect, useRef } from "react"
import { Field, ErrorMessage, Formik, Form } from 'formik'
import { useNavigate, Link, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { useQueryListadoContactos } from "../../../Queris/QueryAgenda";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showToast } from '../../../Utiles/Toast'
import jsonpath from 'jsonpath';
import { useQueryListadoTipos } from "../../../Queris/QueryTipo";

export const FormularioModificar = () => {

    const inputRefModificar = useRef(null)
    const navegar = useNavigate()
    const [lugares, setLugares] = useState([])
    const [longitudCp, setLongitudCp] = useState(0)
    const { id } = useParams(); // Obtener Id
    const queryClient = useQueryClient()

    const { isLoading: isLoadingListado, isError: isErrorListado, error: errorListado, data: listado } = useQueryListadoContactos()
    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()


    const mutation = useMutation({
        mutationFn: async (valoresNuevos) => {
            const nuevosDatos = listado.record.map(contacto => {
                if (contacto.id === valoresNuevos.id) {
                    return valoresNuevos;
                }
                return contacto;
            });

            const response = await fetch('https://api.jsonbin.io/v3/b/6628d405ad19ca34f85f0ccd', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'defaultContactos'
                },
                body: JSON.stringify(nuevosDatos)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        },
        onSuccess: () => {
            console.log("Se ha modificado el contacto");
            queryClient.invalidateQueries(["contactos", "listado"]);
            navegar('/agenda')
        },
    });


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


    if (isLoadingListado || isLoadingListadoTipos) {
        return <h3>Cargando...</h3>
    }

    if (isErrorListado || !listado || isErrorListadoTipos || !listadoTipos) {
        return <h3>Ha habido unerror ....</h3>
    }


    return (
        <Formik
            // enableReinitialize={true} //Reinicia el formulario con los valores nuevos
            initialValues={jsonpath.query(listado.record, `$[?(@.id == ${id})]`)[0]}

            validationSchema={Yup.object({
                // id: Yup.string()
                //     .required("El id del usuario es requerido"),
                tipo: Yup.string()
                    .required("El tipo es requerido"),
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


            onSubmit={(values, { }) => {
                mutation.mutate(values)
                showToast("Contacto modificado")

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
                        <label htmlFor="tipo">Tipo</label>
                        <Field as="select" name="tipo" id="tipo" type="tipo">
                            <option value="">Tipos</option>
                            {listadoTipos.record.map(tipo => (
                                <option key={tipo.name} value={tipo.name}>{tipo.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="tipo" component="div" />
                    </div>

                    <div>
                        <label htmlFor="id">ID</label>
                        <Field name="id" id="id" type="id" innerRef={inputRefModificar} />
                        <ErrorMessage name="id" component="div" />
                    </div>
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
                        <label htmlFor="sexo">Sexo</label>
                        <Field as="select" name="sexo" id="sexo" type="sexo">
                            <option value=""></option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                        </Field>
                        <ErrorMessage name="localidad" component="div" />
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
                            {/* <option value="" >{values.localidad}</option> */}
                            {lugares.map(lugar => (
                                <option key={lugar} value={lugar}>{lugar}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="localidad" component="div" />
                    </div>

                    <input
                        type="submit"
                        value={"Modificar"}
                        disabled={touched && errors.length > 0}
                    />
                    <Link to="/agenda"><input
                        type="submit"
                        value={"Volver"}
                    /></Link>
                </Form>
            )}
        </Formik>

    );

}