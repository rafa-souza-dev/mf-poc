import { useQuery } from "@tanstack/react-query"

async function fetchDitto() {
    return fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(res => res.json())
}

export default function useDitto() {
    return useQuery({
        queryKey: ['ditto'],
        queryFn: fetchDitto
    })
}
