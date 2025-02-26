import { useQuery } from "@tanstack/react-query"
import jsonpath from 'jsonpath';


export function useQueryListadoUsuarios() {
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'usuarios'
  };

  return useQuery({
    queryKey: ["usuarios", "listado"],
    queryFn: async () => {
      const res = await fetch("https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972", { headers });
      if (!res.ok) throw new Error('Error en la petición de listado de usuarios');
      const data = await res.json(); // Ahora esperamos la respuesta json
      console.log(data.record);
      return data.record;
    }
  });
}



export function useQueryUsuariosDetalle({ id }) {
  const headers = {
    'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
    'X-Collection-Name': 'usuarios'
  };

  return useQuery({
    queryKey: ["usuarios", "detalle", "ID", id],
    queryFn: async () => {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/6630dcd4ad19ca34f8627972`, { headers });
        if (!response.ok) {
          throw new Error('Error en la petición de detalles de usuario');
        }
        const data = await response.json();

        // Filtrar el objeto por ID utilizando JSONPath
        const objetoConId = jsonpath.query(data.record, `$[?(@.id == ${id})]`);
        if (!objetoConId || objetoConId.length === 0) {
          throw new Error('No se encontró el objeto con el ID especificado');
        }

        return objetoConId[0]; // Devolver el primer objeto encontrado (debería ser único por ID)
      } catch (error) {
        throw new Error('Error en la petición de detalles de usuario');
      }
    }
  });
}