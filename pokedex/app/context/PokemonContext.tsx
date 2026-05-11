'use client';

import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Pokemon, PokemonType } from "../types/pokemon";

interface PokemonContextType {
    pokemons: any[];
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    fetchPokemons: (page: number, limit: number, name: string, types: number[]) => Promise<Pokemon[]>;
    types: PokemonType[];
    setTypes: React.Dispatch<React.SetStateAction<PokemonType[]>>;
    selectedTypes: number[];
    setSelectedTypes: React.Dispatch<React.SetStateAction<number[]>>;
    setNameFilter: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    loaderRef: React.RefObject<HTMLDivElement | null>;
    nameTimeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
    debouncedName: string;
    setDebouncedName: React.Dispatch<React.SetStateAction<string>>;
    nameFilter: string;
    limit: number;
    loadMore: (currentPage: number) => Promise<void>;
}

interface Props {
    children: React.ReactNode
}

export const PokemonContext = createContext<PokemonContextType | null>(null);

const API_URL = "https://nestjs-pokedex-api.vercel.app";
const DEFAULT_LIMIT = 50;

export const PokemonProvider = ({ children }: Props) => {
    // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [nameFilter, setNameFilter] = useState("");
    const [limit] = useState(DEFAULT_LIMIT);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef<HTMLDivElement>(null);
    const nameTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [debouncedName, setDebouncedName] = useState("");

    useEffect(() => {
        fetchTypes().then(setTypes);
    }, []);

    useEffect(() => {
        if (hasMore) {
            loadMore(page);
        }
    }, [page, debouncedName, selectedTypes]);

    const fetchPokemons = async (
        page: number,
        limit: number,
        name: string,
        types: number[]
    ): Promise<Pokemon[]> => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (name) params.set("name", name);
        types.forEach((t) => params.append("types[]", String(t)));
        const res = await fetch(`${API_URL}/pokemons?${params.toString()}`);
        if (!res.ok) return [];
        return res.json();
    }

    const fetchTypes = async (): Promise<PokemonType[]> => {
        const res = await fetch(`${API_URL}/types`);
        if (!res.ok) return [];
        return res.json();
    }

    const loadMore = useCallback(
        async (currentPage: number) => {
            if (loading) return;
            setLoading(true);
            const data = await fetchPokemons(currentPage, limit, debouncedName, selectedTypes);
            setPokemons((prev) => {
                const ids = new Set(prev.map((p) => p.id));
                const newOnes = data.filter((p) => !ids.has(p.id));
                return [...prev, ...newOnes];
            });
            if (data.length < limit) setHasMore(false);
            setLoading(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [limit, debouncedName, selectedTypes]
    );

    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setPage((p) => p + 1);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [loading, hasMore]);

    useEffect(() => {
        if (nameTimeout.current) clearTimeout(nameTimeout.current);
        nameTimeout.current = setTimeout(() => {
            setDebouncedName(nameFilter);
        }, 400);
        return () => {
            if (nameTimeout.current) clearTimeout(nameTimeout.current);
        };
    }, [nameFilter]);



    return (
        <PokemonContext.Provider value={{
            pokemons,
            setPokemons,
            fetchPokemons,
            types,
            setTypes,
            selectedTypes,
            setSelectedTypes,
            nameFilter,
            setNameFilter,
            page,
            setPage,
            loading,
            setLoading,
            hasMore,
            setHasMore,
            loaderRef,
            nameTimeout,
            debouncedName,
            setDebouncedName,
            limit,
            loadMore
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => {
    const context = React.useContext(PokemonContext);
    if (!context) {
        throw new Error("usePokemonContext dois etre utilisé dans PokemonProvider");
    }
    return context;
};
