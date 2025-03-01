import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonList from "../PokemonList";
import { useGetPokemonListQuery } from "../../store/api/pokemonApi";
import { useNavigate } from "react-router-dom";

// Mock the hooks
vi.mock("../../store/api/pokemonApi", () => ({
  useGetPokemonListQuery: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../components/PageHeader", () => ({
  default: () => <div>PageHeader</div>,
}));

describe("PokemonList Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
  });

  it("renders loading state initially", () => {
    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<PokemonList />);
    expect(screen.getByText("Loading Pokémon...")).toBeInTheDocument();
  });

  it("renders error state when there is an error", () => {
    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: undefined,
      error: { message: "Error loading Pokémon!" },
      isLoading: false,
    });

    render(<PokemonList />);
    expect(screen.getByText("Error loading Pokémon!")).toBeInTheDocument();
  });
  it("renders no Pokémon found state when data is empty", () => {
    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: { results: [] },
      error: undefined,
      isLoading: false,
    });

    render(<PokemonList />);
    expect(screen.getByText("No Pokémon found")).toBeInTheDocument();
  });

  it("renders Pokémon list when data is available", async () => {
    const mockData = {
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };

    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonList />);

    // Check if Pokémon are rendered
    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
  });

  it("filters Pokémon based on search term", async () => {
    const mockData = {
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };

    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonList />);

    // Type into the search input
    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "pikachu");

    // Check if only "pikachu" is displayed
    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    });
  });

  it("navigates to Pokémon details page when a Pokémon is clicked", async () => {
    const mockData = {
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      ],
    };

    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonList />);

    // Click on the Pokémon card
    const pokemonCard = screen.getByTestId("pokemon-card-pikachu");
    await userEvent.click(pokemonCard);

    // Check if navigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/pikachu");
  });

  it('loads more Pokémon when "Load More" button is clicked', async () => {
    const mockData = {
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      ],
    };

    (useGetPokemonListQuery as vi.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    render(<PokemonList />);

    // Click the "Load More" button
    const loadMoreButton = screen.getByTestId("load-more-button");
    await userEvent.click(loadMoreButton);

    // Check if the limit was increased
    expect(useGetPokemonListQuery).toHaveBeenCalledWith(40);
  });
});
