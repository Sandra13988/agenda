import { useQuery } from "@tanstack/react-query"
import jsonpath from 'jsonpath';
import { useContext } from 'react'
import { Autenticacion } from "../Contextos/contextLogin";






export function useQueryContactoDetalle(iden) {
  const { usuarioLogueado } = useContext(Autenticacion)
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'pruebaContactos'
  };

  return useQuery({
    queryKey: ["contacto", "detalle", "ID", iden],
    queryFn: async () => {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/6639d66bad19ca34f865ad53`, { headers });
        if (!response.ok) {
          throw new Error(' API error');
        }
        const data = await response.json();

        //Filtrar el objeto por ID utilizando JSONPath
        const objetoConId = jsonpath.query(data.record[usuarioLogueado.id], `$[?(@.id == ${iden})]`)[0];

        console.log(objetoConId)
        if (!objetoConId || objetoConId.length === 0) {
          throw new Error('No se encontró el objeto con el ID especificado');
        }

        return objetoConId; // Devolver el primer objeto encontrado (debería ser único por ID)
      } catch (error) {
        throw new Error('Error en la petición de detalle');
      }
    }
  });
}


export function useQueryListadoContactosPrueba() {
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'pruebaContactos'
  };

  return useQuery({
    queryKey: ["contactosPrueba", "listado"], queryFn: async () => await fetch(`https://api.jsonbin.io/v3/b/6639d66bad19ca34f865ad53`, { headers })
      .then(res => {
        if (!res.ok) throw new Error('Error en la petición de listado de contactos')
        const data = res.json()
        return data
      })
  })
}


