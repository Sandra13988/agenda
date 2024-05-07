import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryListadoTipos } from '../../../Queris/QueryTipo';
import { useContext } from 'react'
import { Autenticacion } from '../../../Contextos/contextLogin';
import { useQueryListadoTiposPrueba } from '../../../Queris/QueryTipo';
// import { showToast } from '../../../Utiles/Toast';

export const FormularioAgregarTipos = () => {

    const navegar = useNavigate()
    const { usuarioLogueado} = useContext(Autenticacion)

    const { isLoading: isLoadingListadoTipos, isError: isErrorListadoTipos, error: errorListadoTipos, data: listadoTipos } = useQueryListadoTipos()
    const { isLoading: isLoadingListadoTiposPrueba, isError: isErrorListadoTiposPrueba, error: errorListadoTiposPrueba, data: listadoTiposPrueba } = useQueryListadoTiposPrueba()


    const queryClient = useQueryClient()

    const mutationAgregarTipo = useMutation({
        mutationFn: async (nuevoTipo) => {
            
            const actualizacion = { ...listadoTiposPrueba.record };

       
            if (!actualizacion[usuarioLogueado.id]) {
                actualizacion[usuarioLogueado.id] = [];
            }
            actualizacion[usuarioLogueado.id].push(nuevoTipo);

            const response = await fetch('https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': `$2a$10$8Ls7wNx8qPs98jugz8slSeaydaYTVGx6/Ctqlk7FhMuYPNKF4nNNu`,
                    'X-Collection-Name': 'tipos'
                    
                },
                body: JSON.stringify(actualizacion)
            });
    
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json()
    
        },
        onSuccess: () => {
            console.log("Se ha insertado el tipo")
            queryClient.invalidateQueries({ queryKey:["tiposPrueba", "listado"]})
        },
    })

    
    if(isLoadingListadoTipos){
        return <h3>Cargando...</h3>
    }

    if(isErrorListadoTipos ){
        return <h3>Ha habido unerror ....</h3>
    }


    return(
    
           <Formik
            initialValues={{
                id: '',
                name: ''
                
            }}

            validationSchema={Yup.object({
                
                name: Yup.string()
                    .required("El nombre del tipo es requerido"),
            })}


            onSubmit={(values, { }) => {
                console.log(values)
                mutationAgregarTipo.mutate(values)
                const lastId = listadoTipos.record[usuarioLogueado.id].reduce((maxId, contacto) => Math.max(maxId, contacto.id), 0);
                values.id = lastId + 1;
                navegar('/tipos')
                // showToast("Tipo agregado")
            }}>

            {({
                isValid,
            }) => (

                <Form>
                   
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <Field name="nombre" id="nombre" type="nombre" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                    <input
                        type="submit"
                        value={"Agregar"}
                        disabled={!isValid}
                    />
                    <Link to="/tipos"><input
                        type="submit"
                        value={"Volver"}
                    /></Link>
                     </div>
                    
                </Form>
            )}
        </Formik>
        
    )
} 