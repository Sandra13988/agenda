import { useQuery} from "@tanstack/react-query"


export  function useQueryListadoTipos  ()  {
    const headers = {
        'X-Access-Key': '$2a$10$AIjaA8Tho0hI8s8uxoMEBOfgSlgXj0TVHwaK0uHEPIIUe8zuDBISe',
        'X-Collection-Name': 'tipos'
      };

  return  useQuery({ queryKey: ["tipos", "listado"], queryFn: async () => await fetch("https://api.jsonbin.io/v3/b/6628f255acd3cb34a83d90c4", { headers })
       .then( res => {
         if (!res.ok) throw new Error('Error en la petición')
         const data =  res.json()
         return  data 
       }) })
 }

