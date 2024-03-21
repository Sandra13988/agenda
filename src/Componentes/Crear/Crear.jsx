import {Formulario} from "../Formulario/Formulario.jsx";

export const Crear = ({ onCreate }) => {

  return(
    <div>
      <h2>Insertar contacto</h2>
      <Formulario onSubmit={onCreate} buttonLabel="Crear"/>
    </div>
  )
}
