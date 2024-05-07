
import { useContext, useEffect } from "react";
import { Autenticacion } from "../Contextos/contextLogin";
import { useNavigate } from "react-router-dom";



export function comprobarConectado (usuario)  {


    const navegar = useNavigate()

    useEffect(()=>{
        if(!usuario){
            navegar("/error")
        }
    },[usuario])

    
  };
  

  