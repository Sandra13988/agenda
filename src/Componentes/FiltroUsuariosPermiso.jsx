
import { useQueryListadoUsuarios } from '../Queris/QueryUsuario';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useContext } from 'react';
import { UsuarioSeleccionado } from '../Contextos/contextUsuarioSeleccionad';


export const FiltroUsuarioPermiso = () => {

    const { isLoading: isLoadingUsuarios, isError: isErrorUsuarios, error: errorUsuarios, data: usuarios } = useQueryListadoUsuarios()
    const { setUsuarioSeleccionado } = useContext(UsuarioSeleccionado)

    function usuariosConPermisos() {
        const usuariosConPermiso = []
        usuarios.record.map(usuario => {
            if (usuario.permiso === true) {
                usuariosConPermiso.push(usuario)
            }
        })
        return usuariosConPermiso
    }

    const usuariosPer = usuariosConPermisos()
    console.log(usuariosPer)

    if (isLoadingUsuarios) {
        return <h3>Cargando contactos...</h3>
    }

    if (!usuarios || isErrorUsuarios) {
        return <h3>Ha habido un error .... {errorUsuarios.message}</h3>
    }

    return (

        <Formik
            initialValues={{
                name: ''
            }}

            validationSchema={Yup.object({


            })}


            onSubmit={(values) => {
                setUsuarioSeleccionado(values.usuarioPermiso)
                console.log(values.usuarioPermiso)
            }}>

            {({
                isValid,
            }) => (

                <Form>


                    <label htmlFor="usuarioPermiso">Usuarios</label>
                    <Field as="select" name="usuarioPermiso" id="usuarioPermiso" type="usuarioPermiso">
                        <option value=""></option>
                        {usuariosPer.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="usuarioPermiso" component="div" />
                    <button>SELECCIONAR</button>



                </Form>
            )}
        </Formik>




    )
}



