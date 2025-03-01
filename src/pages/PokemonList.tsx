import { useState } from "react";
import { useGetPokemonListQuery } from "../store/api/pokemonApi";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const PokemonList = () => {
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetPokemonListQuery(limit);
  const navigate = useNavigate();

  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  const filteredPokemon = data?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return <div className="flex justify-center p-8">Loading Pokémon...</div>;
  if (error)
    return <div className="text-red-500 p-8">Error loading Pokémon!</div>;
  if (!data) return <div className="p-8">No Pokémon found</div>;

  return (
    <div className="h-full flex flex-col">
      <PageHeader />
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          data-testid="search-input"
        />
      </div>

      <div className="overflow-y-auto flex-grow">
        {filteredPokemon?.length === 0 && (
          <div className="text-center p-8">
            No Pokémon found matching "{searchTerm}"
          </div>
        )}

        {filteredPokemon?.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon.name)}
            className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
            data-testid={`pokemon-card-${pokemon.name}`}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                .split("/")
                .filter(Boolean)
                .pop()}.png`}
              alt={pokemon.name}
              className="w-12 h-12 mr-4"
            />
            <span className="text-lg capitalize">{pokemon.name}</span>
          </div>
        ))}

        {filteredPokemon?.length !== 0 &&
          filteredPokemon?.length === data.results.length && (
            <div className="p-4 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                data-testid="load-more-button"
              >
                Load More
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default PokemonList;
