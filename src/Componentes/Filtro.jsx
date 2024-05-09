import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useQueryListadoTipos } from '../Queris/QueryTipo';
// import { showToast } from '../../../Utiles/Toast';
import { useContext } from 'react'
import { Tipos } from '../Contextos/contextoTipo';
import { Autenticacion } from '../Contextos/contextLogin';
import { useQueryListadoTiposPrueba } from '../Queris/QueryTipo';

export const Filtro = ( {usuarioSeleccionado}) => {

    const { usuarioLogueado } = useContext(Autenticacion)
    const { tipoSeleccionado, setTipoSeleccionado } = useContext(Tipos)
    console.log(tipoSeleccionado)


    const { isLoading: isLoadingListadoTiposPrueba, isError: isErrorListadoTiposPrueba, error: errorListadoTiposPrueba, data: listadoTiposPrueba } = useQueryListadoTiposPrueba()


    if ( isLoadingListadoTiposPrueba) {
        return <h3>Cargando...</h3>
    }

    if (isErrorListadoTiposPrueba || !listadoTiposPrueba) {
        return <h3>Ha habido unerror ....</h3>
    }


    return (
        <>

            <Formik
                initialValues={{
                    tipo: ''
                }}

                validationSchema={Yup.object({


                })}


                onSubmit={(values) => {
                    setTipoSeleccionado(values.tipo)

                    // setTipoSeleccionado(values)

                }}>

                {({
                    isValid,
                }) => (

                    <Form>

                        {usuarioLogueado.rol === "Admin" && usuarioSeleccionado && listadoTiposPrueba.record[usuarioSeleccionado] !== undefined &&<div>
                            <label htmlFor="tipo">Tipo</label>
                            <Field as="select" name="tipo" id="tipo" type="tipo">
                                <option value=""></option>
                                {listadoTiposPrueba.record[usuarioSeleccionado].map(tipo => (
                                    <option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>

                                ))}
                            </Field>
                            <ErrorMessage name="tipo" component="div" />
                            <button>FILTRAR</button>
                        </div>}


                        {usuarioLogueado.rol === "User" && <div>
                            <label htmlFor="tipo">Tipo</label>
                            <Field as="select" name="tipo" id="tipo" type="tipo">
                                <option value=""></option>
                                {listadoTiposPrueba.record[usuarioLogueado.id] !== undefined &&listadoTiposPrueba.record[usuarioLogueado.id].map(tipo => (
                                    <option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>

                                ))}
                            </Field>
                            <ErrorMessage name="tipo" component="div" />
                            <button>FILTRAR</button>
                        </div>}


                    </Form>
                )}
            </Formik>
        </>
    )
} 