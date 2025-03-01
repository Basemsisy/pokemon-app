import { useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../store/api/pokemonApi";
import PageHeader from "./PageHeader";
import PokemonDetailsRow from "./PokemonDetailsRow";

const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(name || "");

  if (isLoading)
    return (
      <div className="flex justify-center p-8">Loading Pokémon details...</div>
    );
  if (error)
    return (
      <div className="text-red-500 p-8">Error loading Pokémon details!</div>
    );
  if (!data) return <div className="p-8">No Pokémon found</div>;

  return (
    <div className="h-full flex flex-col">
      <PageHeader title={data.name} />
      <div className="p-4 flex-grow">
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              data.sprites.other["official-artwork"].front_default ||
              data.sprites.front_default
            }
            alt={data.name}
            className="w-64 h-64 object-contain"
            data-testid="pokemon-image"
          />
        </div>

        <div className="border-t border-b border-gray-200 py-4">
          <table className="w-full">
            <tbody>
              <PokemonDetailsRow label={"Name"} value={data.name} />
              <PokemonDetailsRow
                label={"Height"}
                value={`${(data.height / 10).toFixed(1)} m`}
              />
              <PokemonDetailsRow
                label={"Weight"}
                value={`${(data.weight / 10).toFixed(1)} kg`}
              />
              <PokemonDetailsRow
                label={"Types"}
                value={
                  <div className="flex flex-wrap justify-end gap-2">
                    {data.types.map((typeInfo) => (
                      <span
                        key={typeInfo.type.name}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize"
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                }
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
