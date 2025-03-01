import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "../PageHeader";

describe("PageHeader Component", () => {
  it("renders the default title when no title prop is provided", () => {
    render(<PageHeader />);
    const headingElement = screen.getByRole("heading", { name: /pokereact/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("PokeReact");
  });

  it("renders the provided title when the title prop is passed", () => {
    const customTitle = "Custom Title";
    render(<PageHeader title={customTitle} />);
    const headingElement = screen.getByRole("heading", { name: customTitle });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(customTitle);
  });

  it("has the correct styles applied", () => {
    render(<PageHeader />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("bg-blue-500", "p-4");

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveClass("text-2xl", "font-bold", "text-white");
  });
});
