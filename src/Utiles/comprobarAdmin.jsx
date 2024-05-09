
import { useContext, useEffect } from "react";
import { Autenticacion } from "../Contextos/contextLogin";
import { useNavigate } from "react-router-dom";



export function comprobarAdmin ()  {

    const { usuarioLogueado , setUsuarioLogueado } = useContext(Autenticacion)
    const navegar = useNavigate()

    useEffect(()=>{
        if(usuarioLogueado.rol !== "Admin"){
            setUsuarioLogueado()
            navegar("/")
        }
    },[usuarioLogueado])

    
  };
  

  