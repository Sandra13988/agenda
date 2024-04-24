import { FormularioAgregarTipos } from "./FormulariosTipos/FormularioAgregarTipos"

export const AgregarTipos = ({ funcion }) => {


    return (
        <>
            <div>
                <h3>AGREGAR TIPOS</h3>
                <FormularioAgregarTipos funcion={funcion} />
            </div>

        </>
    )
} 