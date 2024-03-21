import {Formulario} from "../Formulario/Formulario.jsx";

export const Modificar = ({ data, onUpdate}) => {

    return(
        <div>
            <h2>Modificar contacto</h2>
            <Formulario data={data} onSubmit={onUpdate} buttonLabel="Modificar" />
        </div>
    )
}
