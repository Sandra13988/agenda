import { FormularioModificarTipos } from "./FormulariosTipos/FormularioModificarTipos"

export const ModificarTipos = ({ funcion, tipoModificar }) => {


    return (
        <>
            <div>
                <h3>MODIFICAR TIPOS</h3>
                <FormularioModificarTipos funcion={funcion} tipoModificar={tipoModificar} />
            </div>
        </>
    )
} 