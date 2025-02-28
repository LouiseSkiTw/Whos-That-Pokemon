import { useState, useEffect } from 'react';
import { getPokemon } from '../service/PokemonService';
import { Pokemon } from '../service/PokemonService.interface';


const useGetPokemon = () => {
  const [data, setData] = useState<Pokemon[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const pokemon = await getPokemon();
        setData(pokemon);
      } catch (err) {
        setError('Failed to fetch Pokemon');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useGetPokemon;

