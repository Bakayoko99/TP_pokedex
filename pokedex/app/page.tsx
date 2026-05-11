"use client";

import { useEffect } from "react";
import TypeFilter from "./components/TypeFilter";
import { PokemonProvider, usePokemonContext } from "./context/PokemonContext";
import PokedexHome from "./components/PokedexHome";

function PokedexContent() {

  const { setSelectedTypes, setNameFilter, setPage, setHasMore, debouncedName, nameFilter, selectedTypes, setPokemons, types } = usePokemonContext();

  useEffect(() => {
    setPokemons([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedName, selectedTypes]);


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="sticky top-0 z-20 bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
              alt="Pokédex"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Pokédex</h1>
          </div>

          <input
            type="text"
            placeholder="Rechercher un pokémon..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full max-w-md rounded-full border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <TypeFilter
            types={types}
            selected={selectedTypes}
            onChange={setSelectedTypes}
          />
        </div>
      </header>

      <PokedexHome />

    </div>
  );
}

export default function Home() {
  return (
    <PokemonProvider>
      <PokedexContent />
    </PokemonProvider>
  );
}
