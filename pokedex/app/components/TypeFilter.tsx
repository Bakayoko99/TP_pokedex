import Image from "next/image";
import { PokemonType } from "../types/pokemon";

interface TypeFilterProps {
  types: PokemonType[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

export default function TypeFilter({ types, selected, onChange }: TypeFilterProps) {
  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => {
        const active = selected.includes(type.id);
        return (
          <button
            key={type.id}
            onClick={() => toggle(type.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
              ${
                active
                  ? "bg-red-500 border-red-600 text-white shadow"
                  : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 hover:border-red-400"
              }`}
          >
            <Image src={type.image} alt={type.name} width={16} height={16} className="rounded-full" />
            {type.name}
          </button>
        );
      })}
    </div>
  );
}
