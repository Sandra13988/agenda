import { useQuery, useMutation } from "@tanstack/react-query"
import jsonpath from 'jsonpath';


export function useQueryListadoContactos() {
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'defaultContactos'
  };

  return useQuery({
    queryKey: ["contactos", "listado"], queryFn: async () => await fetch("https://api.jsonbin.io/v3/b/6628d405ad19ca34f85f0ccd", { headers })
      .then(res => {
        if (!res.ok) throw new Error('Error en la petición')
        const data = res.json()
        return data
      })
  })
}


export function useQueryContactoDetalle({ id }) {
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'defaultContactos'
  };

  return useQuery({
    queryKey: ["contacto", "detalle", "ID", id],
    queryFn: async () => {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/6628d405ad19ca34f85f0ccd`, { headers });
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();

        // Filtrar el objeto por ID utilizando JSONPath
        const objetoConId = jsonpath.query(data.record, `$[?(@.id == ${id})]`);
        if (!objetoConId || objetoConId.length === 0) {
          throw new Error('No se encontró el objeto con el ID especificado');
        }

        return objetoConId[0]; // Devolver el primer objeto encontrado (debería ser único por ID)
      } catch (error) {
        throw new Error('Error en la petición');
      }
    }
  });
}





//HASTA AQUI ESTA CORRECTO 

