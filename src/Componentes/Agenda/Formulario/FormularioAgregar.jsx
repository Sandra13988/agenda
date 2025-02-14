import { useState, useRef } from "react"
import { Field, ErrorMessage, Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoTipos } from "../../../Queris/QueryTipo";
import { useContext } from 'react'
import { Autenticacion } from "../../../Contextos/contextLogin";
import { UsuarioSeleccionado } from "../../../Contextos/contextUsuarioSeleccionad";
import { useQueryListadoContactosPrueba } from "../../../Queris/QueryAgenda";


export const FormularioAgregar = () => {
    const inputRefAgregar = useRef(null)
    const navegar = useNavigate()
    const [lugares, setLugares] = useState([])
    const [longitudCp, setLongitudCp] = useState(0)
    const { usuarioLogueado } = useContext(Autenticacion)
    const { usuarioSeleccionado } = useContext(UsuarioSeleccionado)

    const { isLoading: isLoadingListadoContactos, isError: isErrorListadoContactos, error: errorListadoContactos, data: listado } = useQueryListadoContactosPrueba()
    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { isLoading: isLoadingUsuariosPrueba, isError: isErrorUsuariosPrueba, error: errorUsuariosPrueba, data: usuariosPrueba } = useQueryListadoContactosPrueba()
    

    const queryClient = useQueryClient()

    // useEffect(() => {
    //     inputRefAgregar.current.focus()
    // }, [])



    //Funcion que ejecuta la mutacion
    const mutationAgregarContacto = useMutation({
        mutationFn: async (nuevoContacto) => {
            console.log(nuevoContacto)
            const actualizacion = { ...usuariosPrueba.record };

       
            if(usuarioLogueado.rol === "User"){
                if (!actualizacion[usuarioLogueado.id]) {
                    actualizacion[usuarioLogueado.id] = [];
                }
                actualizacion[usuarioLogueado.id].push(nuevoContacto);
            }

            if(usuarioLogueado.rol === "Admin"){
                if (!actualizacion[usuarioSeleccionado]) {
                    actualizacion[usuarioSeleccionado] = [];
                }
                actualizacion[usuarioSeleccionado].push(nuevoContacto);
            }
           
           


            const response = await fetch('https://api.jsonbin.io/v3/b/6639d66bad19ca34f865ad53', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    // 'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
                    'X-Collection-Name': 'pruebaContactos'

                },
                body: JSON.stringify(actualizacion)
            });

            if (!response.ok) {
                throw new Error('Error en la agregacion de contacto');
            }
            return response.json()

        },
        onSuccess: () => {

            console.log("Se ha insertado el contacto")
            queryClient.invalidateQueries({ queryKey: ["contactosPrueba", "listado"] })
            navegar("/agenda")

        },
    })



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
        fetchDataLocalidad(cp);
        console.log(cp)

    };

    if (isLoadingListadoTipos || isLoadingListadoContactos || isLoadingUsuariosPrueba) {
        return <h3>Cargando...</h3>
    }

    if (isErrorListadoTipos || isErrorListadoContactos || isErrorUsuariosPrueba || !listadoTipos || !usuariosPrueba || !listado) {
        return <h3>Ha habido unerror ....</h3>
    }


    return (

        <Formik
            initialValues={{
                id: '',
                tipo: '',
                dni: '',
                nombre: '',
                sexo: '',
                telefono: '',
                email: '',
                direccion: '',
                cp: '',
                localidad: '',
                tokenUsuario: usuarioLogueado.token
            }}

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
                cp: Yup.number("El formato debe de ser numerico")
                    .required("El codigo postal es requerido")
                    .min(4, "Minimo 5 numeros"),
                sexo: Yup.string()
                    .required("El sexo es requerida"),
                localidad: Yup.string()
                    .required("La localidad es requerida"),
            })}


            onSubmit={(values, { }) => {
                console.log(values)
                //Asignar ID -> averigua cual es el mas alto que hay en la list ay le suma 1

                // ESTO HAY QUE CORREGIRLO PORQUE SIEMPRE SERÁ 1, TOCARLO PARA QUE SE AUTOINCREMENTE
                const idsExistentes = Object.values(listado.record)
                .flat() // Aplanar el array de contactos
                .map(contacto => contacto.id) // Extraer solo los IDs
                .filter(id => !isNaN(id)); // Asegurarse de que sean números válidos
        
                const nuevoId = idsExistentes.length > 0 ? Math.max(...idsExistentes) + 1 : 1;
                values.id = nuevoId;

                //Llamada a la funcion de mutacion
                mutationAgregarContacto.mutate(values)
                navegar('/agenda') // Esto hay que cambiarlo porque manda a /agregar
                // showToast("Contacto agregado")

            }}


        >
            {({
                setFieldValue,// setear un valor en un atributo de formik
                setFieldTouched, // marcar un atributo de formik como tocado
                values,
                errors,
                touched,
                isValid,
            }) => (
                <Form className="form-container">
                    <div>
                        <label htmlFor="tipo">Tipo</label>
                        {listadoTipos && <Field as="select" name="tipo" id="tipo" type="tipo">
                            <option value="">Tipos</option>
                            {listadoTipos.record[usuarioLogueado.id].map(tipo => (
                                <option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>
                            ))}
                        </Field>}
                        <ErrorMessage name="tipo" component="div" />
                    </div>

                    <div>
                        <label htmlFor="dni">DNI</label>
                        <Field name="dni" id="dni" type="dni" innerRef={inputRefAgregar} />
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

                        }} autoComplete="country" />

                        <ErrorMessage name="cp" component="div" />
                    </div>

                    <div>
                        <label htmlFor="localidad">Localidad</label>
                        <Field as="select" name="localidad" id="localidad" type="localidad" disabled={longitudCp < 5}>
                            <option value="">Localidades</option>
                            {lugares.map(lugar => (
                                <option key={lugar} value={lugar}>{lugar}</option>

                            ))}
                        </Field>
                        <ErrorMessage name="localidad" component="div" />
                    </div>


                    <input
                        type="submit"
                        value={"Agregar"}
                        disabled={!isValid}
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
