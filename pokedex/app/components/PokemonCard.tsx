import Image from "next/image";
import { Pokemon } from "../types/pokemon";

const TYPE_COLORS: Record<string, string> = {
  Poison: "bg-purple-500",
  Plante: "bg-green-500",
  Eau: "bg-blue-500",
  Feu: "bg-orange-500",
  Insecte: "bg-lime-500",
  Vol: "bg-sky-400",
  Normal: "bg-gray-400",
  Sol: "bg-yellow-700",
  "Électrik": "bg-yellow-400",
  Fée: "bg-pink-400",
  Roche: "bg-stone-500",
  Glace: "bg-cyan-300",
  Psy: "bg-pink-600",
  Acier: "bg-slate-400",
  Ténèbres: "bg-gray-700",
  Combat: "bg-red-700",
  Dragon: "bg-indigo-700",
  Spectre: "bg-violet-800",
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col items-center p-4 gap-2 border border-zinc-100 dark:border-zinc-700">
      <span className="self-start text-xs font-bold text-zinc-400">
        #{String(pokemon.pokedexId).padStart(3, "0")}
      </span>
      <div className="relative w-28 h-28">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          className="object-contain drop-shadow-md"
          sizes="112px"
        />
      </div>
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 capitalize">
        {pokemon.name}
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <span
            key={type.id}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${
              TYPE_COLORS[type.name] ?? "bg-zinc-500"
            }`}
          >
            <Image
              src={type.image}
              alt={type.name}
              width={12}
              height={12}
              className="rounded-full"
            />
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
