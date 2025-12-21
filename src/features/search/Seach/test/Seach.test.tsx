import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Search from "../Search";
import React from "react";

const mockOnInfiniteScrollNextLoad = vi.fn();
const mockOnSearch = vi.fn();
const mockOnSearchQueryChange = vi.fn();
const mockOnSearchTypeChange = vi.fn();

const mockResponse = {
    Search: [{ imdbID: "1", Title: "Film 1", Year: "2020", Poster: "", Type: "movie" }],
    totalResults: "20",
    Response: "True"
};

vi.spyOn(window, "fetch").mockImplementationOnce(() => {
return Promise.resolve({
    json: () => Promise.resolve(mockResponse),
} as Response);
});

vi.mock("../../../../hooks/useIntersectionObserver", () => ({
  default: (_callback: () => void, _needsToCallback: boolean) => {
    const div = document.createElement("div");

    return React.useRef(div);
  }
}));

vi.mock("../../FilmList/FilmList", () => ({
  default: ({ films, totalFilms, totalPages, currentPage, isLoading, error }: any) => (
    <div data-testid="film-list">
      <span>{films.length}</span>
      <span>{totalFilms}</span>
      <span>{totalPages}</span>
      <span>{currentPage}</span>
      <span>{String(isLoading)}</span>
      <span>{error}</span>
    </div>
  ),
}));

vi.mock("../../SearchBar/SearchBar", () => ({
  default: ({ onSearchQueryChange, onTypeQueryChange, onSearch }: any) => (
    <div data-testid="search-bar">
        <div data-testid="search-bar-term" onClick={ () => onSearchQueryChange("batman") }>query</div>
        <div data-testid="search-bar-search" onClick={ () => onSearch() }>search</div>
        <div data-testid="search-bar-type" onClick={ () => onTypeQueryChange("movie") }>type</div>
    </div>
  ),
}));

vi.mock("../hooks/useSeach", () => ({
    default: () => [
        [{ imdbID: "1", Title: "Film 1", Year: "2020", Poster: "", Type: "movie" }], null, 2, 20, 1, false,
            mockOnInfiniteScrollNextLoad, mockOnSearch, mockOnSearchQueryChange, mockOnSearchTypeChange
    ]}
));

describe("Search", () => {
    describe("Search render UI", () => {
        beforeEach(() => {
            vi.clearAllMocks();
            cleanup();
        });

        it("renders SearchBar and FilmList", () => {
            render(<Search />);

            expect(screen.getByTestId("search-bar")).toBeInTheDocument();
            expect(screen.getByTestId("film-list")).toBeInTheDocument();
        });

        it("passes correct data to FilmList", () => {
            render(<Search />);

            const filmList = screen.getByTestId("film-list");

            expect(filmList).toHaveTextContent("1");
            expect(filmList).toHaveTextContent("20");
            expect(filmList).toHaveTextContent("2");
            expect(filmList).toHaveTextContent("1");
            expect(filmList).toHaveTextContent("false");
        });

        it("connects SearchBar callbacks correctly", () => {
            render(<Search />);

            screen.getByText("query").click();
            screen.getByText("search").click();
            screen.getByText("type").click();

            expect(mockOnSearchQueryChange).toHaveBeenCalledWith("batman");
            expect(mockOnSearch).toHaveBeenCalled();
            expect(mockOnSearchTypeChange).toHaveBeenCalledWith("movie");
        });
    });
});