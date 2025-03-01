import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonDetails from "../PokemonDetails";
import { useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../../store/api/pokemonApi";

// Mock the hooks and components
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("../../store/api/pokemonApi", () => ({
  useGetPokemonByNameQuery: vi.fn(),
}));

vi.mock("../../components/PageHeader", () => ({
  default: () => <div>PageHeader</div>,
}));

vi.mock("../../components/PokemonDetailsRow", () => ({
  default: ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
      {label}: {value}
    </div>
  ),
}));

describe("PokemonDetails Component", () => {
  const mockData = {
    name: "pikachu",
    height: 40, // Height in decimetres
    weight: 60, // Weight in hectograms
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
      },
    },
    types: [{ type: { name: "electric" } }, { type: { name: "flying" } }],
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useParams as vi.Mock).mockReturnValue({ name: "pikachu" });
    (useGetPokemonByNameQuery as vi.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });
  });

  it("renders loading state initially", () => {
    (useGetPokemonByNameQuery as vi.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<PokemonDetails />);
    expect(screen.getByText("Loading Pokémon details...")).toBeInTheDocument();
  });

  it("renders error state when there is an error", () => {
    (useGetPokemonByNameQuery as vi.Mock).mockReturnValue({
      data: undefined,
      error: { message: "Error loading Pokémon details!" },
      isLoading: false,
    });

    render(<PokemonDetails />);
    expect(
      screen.getByText("Error loading Pokémon details!")
    ).toBeInTheDocument();
  });

  it("renders no Pokémon found state when data is empty", () => {
    (useGetPokemonByNameQuery as vi.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonDetails />);
    expect(screen.getByText("No Pokémon found")).toBeInTheDocument();
  });

  it("renders Pokémon details when data is available", async () => {
    render(<PokemonDetails />);

    // Check if the Pokémon image is rendered
    const image = screen.getByTestId("pokemon-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      mockData.sprites.other["official-artwork"].front_default
    );

    // Check if the Pokémon details are rendered
    expect(screen.getByText("Name: pikachu")).toBeInTheDocument();
    expect(screen.getByText("Height: 4.0 m")).toBeInTheDocument();
    expect(screen.getByText("Weight: 6.0 kg")).toBeInTheDocument();
    expect(screen.getByText("Types:")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByText("flying")).toBeInTheDocument();
  });

  it("renders the default sprite if official artwork is not available", async () => {
    const mockDataWithoutOfficialArtwork = {
      ...mockData,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        other: {
          "official-artwork": {
            front_default: null,
          },
        },
      },
    };

    (useGetPokemonByNameQuery as vi.Mock).mockReturnValue({
      data: mockDataWithoutOfficialArtwork,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonDetails />);

    // Check if the default sprite is rendered
    const image = screen.getByTestId("pokemon-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockData.sprites.front_default);
  });
});
