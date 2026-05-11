import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from './PokemonCard';

export default function PokedexHome() {
    const { pokemons, loaderRef, loading, hasMore } = usePokemonContext();

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 py-8">
                {pokemons.length === 0 && !loading && (
                    <p className="text-center text-zinc-400 mt-20 text-lg">Aucun pokémon trouvé.</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>

                <div ref={loaderRef} className="flex justify-center items-center py-10">
                    {loading && (
                        <div className="w-10 h-10 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
                    )}
                    {!hasMore && pokemons.length > 0 && (
                        <p className="text-zinc-400 text-sm">Tous les pokémons sont chargés !</p>
                    )}
                </div>
            </main>
        </>
    )
}
