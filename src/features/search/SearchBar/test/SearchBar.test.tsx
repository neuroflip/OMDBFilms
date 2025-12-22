import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SearchBar from "../SearchBar";

const mockOnQueryChange = vi.fn();
const mockOnTypeChange = vi.fn();
const mockOnSearch = vi.fn();

vi.mock("../hooks/useSearchBar", () => ({
  default: vi.fn(() => [
    mockOnQueryChange,
    mockOnTypeChange,
    "batman",
    "movie",
  ]),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders input and select with values from hook", () => {
    render(<SearchBar
        onSearchQueryChange={vi.fn()}
        onTypeQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />);

    const input = screen.getByPlaceholderText("Search for a film, serie, episode...") as HTMLInputElement;
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("batman");
    expect(select.value).toBe("movie");
  });

  it("calls onQueryChange when typing in input", () => {
    render(<SearchBar
        onSearchQueryChange={vi.fn()}
        onTypeQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "matrix" } });

    expect(mockOnQueryChange).toHaveBeenCalled();
  });

  it("calls onTypeChange when selecting a type", () => {
    render(<SearchBar
        onSearchQueryChange={vi.fn()}
        onTypeQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "series" } });

    expect(mockOnTypeChange).toHaveBeenCalled();
  });

  it("calls onSearch when pressing Enter", () => {
    render(<SearchBar
        onSearchQueryChange={vi.fn()}
        onTypeQueryChange={vi.fn()}
        onSearch={mockOnSearch}
      />);

    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalled();
  });
});
