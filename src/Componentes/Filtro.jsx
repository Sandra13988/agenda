import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useQueryListadoTipos } from '../Queris/QueryTipo';
// import { showToast } from '../../../Utiles/Toast';
import { useContext } from 'react'
import { Tipos } from '../Contextos/contextoTipo';

export const Filtro = () => {


    const  {tipoSeleccionado, setTipoSeleccionado} = useContext(Tipos)
    console.log(tipoSeleccionado)

    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()


    if (isLoadingListadoTipos) {
        return <h3>Cargando...</h3>
    }

    if (isErrorListadoTipos) {
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

                        <div>
                            <label htmlFor="tipo">Tipo</label>
                            <Field as="select" name="tipo" id="tipo" type="tipo">
                                <option value=""></option>
                                {listadoTipos.record.map(tipo => (
                                    <option key={tipo.name} value={tipo.name}>{tipo.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="tipo" component="div" />
                        </div>
                        <button
                        
                        >FILTRAR</button>
                   
                    </Form>
                )}
            </Formik>
        </>
    )
} 