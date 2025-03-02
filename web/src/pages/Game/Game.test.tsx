import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "./Game";
import useGetPokemon from "../../hooks/useGetPokemon";
import { Pokemon } from "../../service/PokemonService.interface";
import { capitalizeFirstLetter } from "../../utils/utils";

// Mock the useGetPokemon hook
jest.mock("../../hooks/useGetPokemon", () => jest.fn());

const mockedUseGetPokemon = useGetPokemon as jest.MockedFunction<typeof useGetPokemon>;


describe("Game Component", () => {
    let mockData: Pokemon[];

    beforeEach(() => {
        mockData = [
            { id: 1, name: "pikachu", mysteryPokemon: true, image: "pikachu.png" },
            { id: 2, name: "bulbasaur", mysteryPokemon: false, image: "bulbasaur.png" },
            { id: 3, name: "charmander", mysteryPokemon: false, image: "charmander.png" },
        ];

        mockedUseGetPokemon.mockReturnValue({
            data: mockData,
            isLoading: false,
            error: undefined,
        });
    });

    test("renders loading spinner when isLoading is true", () => {
        mockedUseGetPokemon.mockReturnValueOnce({
            data: [],
            isLoading: true,
            error: undefined,
        });

        render(<Game />);
        expect(screen.getByRole("status")).toHaveClass("spinner_container");
    });

    test("renders error message if error occurs", () => {
        mockedUseGetPokemon.mockReturnValueOnce({
            data: [],
            isLoading: false,
            error: "Failed to fetch data",
        });

        render(<Game />);
        expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
    });

    test("renders the mystery Pokémon and options", () => {
        render(<Game />);

        // Check mystery Pokémon is rendered
        expect(screen.getByAltText(/pikachu/i)).toHaveAttribute("src", "pikachu.png");

        // Check options are rendered
        mockData.forEach((pokemon) => {
            expect(screen.getByText(capitalizeFirstLetter(pokemon.name))).toBeInTheDocument();
        });
    });

    test("updates score and displays success when correct option is selected", () => {
        render(<Game />);

        // Select the correct Pokémon
        const correctOption = screen.getByText(/Pikachu/i);
        fireEvent.click(correctOption);

        // Click submit
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        // Check if the score is updated
        expect(screen.getByText("Score: 1/10")).toBeInTheDocument();

        // Check if the success style is applied
        expect(correctOption).toHaveClass("success");
    });

    test("does not update score and displays fail when incorrect option is selected", () => {
        render(<Game />);

        // Select an incorrect Pokémon
        const incorrectOption = screen.getByText(/Bulbasaur/i);
        fireEvent.click(incorrectOption);

        // Click submit
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        expect(screen.getByText("Score: 0/10")).toBeInTheDocument();

        expect(incorrectOption).toHaveClass("fail");
    });

    test("moves to the next round when Next button is clicked", () => {
        render(<Game />);

        const option = screen.getByText(/pikachu/i);
        fireEvent.click(option);

        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        expect(screen.getByText("Score: 1/10")).toBeInTheDocument();
    });
});
