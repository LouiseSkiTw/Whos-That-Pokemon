import { render, screen } from "@testing-library/react";
import StartPage from "./StartPage";
import "@testing-library/jest-dom";

describe("StartPage Component", () => {
    it("renders the image with correct alt text", () => {
        render(<StartPage />);
        const image = screen.getByAltText("Who's that Pokemon");
        expect(image).toBeInTheDocument();
    });
});