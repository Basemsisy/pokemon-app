import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonDetailsRow from "../PokemonDetailsRow";

describe("PokemonDetailsRow Component", () => {
  it("renders the label and value correctly", () => {
    const label = "Height";
    const value = "1.7 m";
    render(
      <table>
        <tbody>
          <PokemonDetailsRow label={label} value={value} />
        </tbody>
      </table>
    );

    // Check if the label is rendered
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-gray-600", "font-medium");

    // Check if the value is rendered
    const valueElement = screen.getByText(value);
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveClass("text-right");
  });

  it("renders ReactNode values correctly", () => {
    const label = "Types";
    const value = (
      <div>
        <span>Fire</span>
        <span>Flying</span>
      </div>
    );
    render(
      <table>
        <tbody>
          <PokemonDetailsRow label={label} value={value} />
        </tbody>
      </table>
    );

    // Check if the label is rendered
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    // Check if the ReactNode value is rendered
    const fireElement = screen.getByText("Fire");
    const flyingElement = screen.getByText("Flying");
    expect(fireElement).toBeInTheDocument();
    expect(flyingElement).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    const label = "Weight";
    const value = "85 kg";
    render(
      <table>
        <tbody>
          <PokemonDetailsRow label={label} value={value} />
        </tbody>
      </table>
    );

    // Check if the row has the correct border class
    const rowElement = screen.getByRole("row");
    expect(rowElement).toHaveClass("border-b", "border-gray-200");

    // Check if the label cell has the correct classes
    const labelCell = screen.getByText(label).closest("td");
    expect(labelCell).toHaveClass("py-3", "text-gray-600", "font-medium");

    // Check if the value cell has the correct classes
    const valueCell = screen.getByText(value).closest("td");
    expect(valueCell).toHaveClass("py-3", "text-right");
  });
});
