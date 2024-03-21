import {useEffect, useRef, useState} from "react";
import {CustomInput} from "./CustomInput.jsx";

export const Formulario = ({ data, onSubmit, buttonLabel }) => {

    const [formContacto, setFormContacto] = useState({
        id: '',
        nombre: '',
        dni: '',
        telefono: '',
        mail: '',
        direccion: '',
        cp: '',
        localidad: ''
    });

    const formRef = useRef()

    useEffect(() => {
        if (data !== undefined){
            setFormContacto({
                id: data.id,
                nombre: data.nombre,
                dni: data.dni,
                telefono: data.telefono,
                mail: data.mail,
                direccion: data.direccion,
                cp: data.cp,
                localidad: data.localidad
            })

            formRef.current.reset()
        }

    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormContacto({ ...formContacto, [name]: value });
    }

    return(
      <form action="" ref={formRef} onSubmit={e => {
          e.preventDefault();
          onSubmit(formContacto)
      }}>


          <CustomInput label="DNI" name="dni" value={formContacto.dni} onchange={handleChange} />
          <CustomInput label="NOMBRE" name="nombre" value={formContacto.nombre} onchange={handleChange} />
          <CustomInput label="TELEFONO" name="telefono" value={formContacto.telefono} onchange={handleChange} />
          <CustomInput label="E-MAIL" name="mail" value={formContacto.mail} onchange={handleChange} />
          <CustomInput label="DIRECCION" name="direccion" value={formContacto.direccion} onchange={handleChange} />
          <CustomInput label="CP" name="cp" value={formContacto.cp} onchange={handleChange} />
          <CustomInput label="LOCALIDAD" name="localidad" value={formContacto.localidad}  onchange={handleChange} />
          <button>{buttonLabel}</button>
      </form>
    )
}
