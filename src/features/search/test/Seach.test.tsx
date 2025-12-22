import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import Search from "../Seach/Search";
import { renderWithProviders } from "../../../../test/test-utils";
import { MemoryRouter } from "react-router";
import { act } from "react";

const mockResponse = {
    Search: [{ imdbID: "1", Title: "Film 1", Year: "2020", Poster: "http://url.to.img", Type: "movie" }],
    totalResults: "1",
    Response: "True"
};

vi.mock("../../../hooks/useIntersectionObserver", () => ({
  default: () => {
    const div = document.createElement("div");

    return {
        current: div
    }
  }
}));

const originalViteEnv = import.meta.env.VITE_OMDB_APIKEY;

describe("Search integration tests with results and no error", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, "fetch").mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            } as Response);
        });        
        cleanup();
        import.meta.env.VITE_OMDB_APIKEY = originalViteEnv
    });

    it("on change search query term, calls to fetch results", async () => {
        import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
        renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
        const queryTerm = screen.getByRole("textbox");

        act(() => {
            fireEvent.change(queryTerm, { target: { value: "batman" } });
            fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
        })

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith('https://www.omdbapi.com/?s=batman&page=1&apikey=myApiKey');
    })

    it("on change type and term query term, calls to fetch results", () => {
        import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
        renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
        const queryTerm = screen.getByRole("textbox");
        const typeSelect = screen.getByRole("combobox");

        act(() => {
            fireEvent.change(typeSelect, { target: { value: "movie" } });
            fireEvent.change(queryTerm, { target: { value: "batman" } });
            fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
        });

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith('https://www.omdbapi.com/?s=batman&page=1&type=movie&apikey=myApiKey');
    })

    it("on change type and term query term, calls to fetch results (2)", () => {
        import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
        renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
        const queryTerm = screen.getByRole("textbox");
        const typeSelect = screen.getByRole("combobox");

        act(() => {
            fireEvent.change(typeSelect, { target: { value: "series" } });
            fireEvent.change(queryTerm, { target: { value: "batman" } });
            fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
        });
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith('https://www.omdbapi.com/?s=batman&page=1&type=series&apikey=myApiKey');
    })

    it("on fetch search results, sets the spinner", () => {
        import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
        renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
        const queryTerm = screen.getByRole("textbox");

        act(() => {
            fireEvent.change(queryTerm, { target: { value: "batman" } });
            fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
        });
        const spinner = document.getElementById("spinner");

        expect(spinner).toBeInTheDocument();
    })

    it("on fetch search results, and finish load, the spinner is not there and there is a film", async () => {
        import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
        renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
        const queryTerm = screen.getByRole("textbox");

        act(() => {
            fireEvent.change(queryTerm, { target: { value: "batman" } });
            fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
        });

        expect(await screen.findByText("Film 1")).toBeInTheDocument();
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    })
});
