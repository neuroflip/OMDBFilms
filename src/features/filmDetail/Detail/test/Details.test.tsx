import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, cleanup, act } from "@testing-library/react";
import Detail from "../Detail";
import type { Film } from "../../../../components/FilmCard/FilmCard.types";
import { renderWithProviders } from "../../../../../test/test-utils";

vi.mock("../../../components/Spinner/Spinner", () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock("../store/slice/filmSlice", () => ({
  setImdb: vi.fn((imdb: string) => ({ type: "setImdb", payload: imdb })),
  searchFilm: vi.fn(() => ({ type: "searchFilm" })),
}));

vi.mock("../store/selectors/filmSelectors", () => ({
  selectFilm: vi.fn(),
  selectIsLoading: vi.fn(),
  selectError: vi.fn(),
}));


const navigateMock = vi.fn();
vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => navigateMock
  }
})
import { MemoryRouter } from "react-router";

const mockFilm: Film = {
  imdbID: "tt123",
  Title: "Test Film",
  Year: "2023",
  Type: "movie",
  Poster: "http://url.to.img",
  Plot: "Plot text",
  Genre: "Drama",
  Rated: "PG",
  Production: "Test",
  Director: "Director",
  Actors: "Actors",
  Awards: "Awards",
  imdbRating: "8.5",
} as Film;

const originalViteEnv = import.meta.env.VITE_OMDB_APIKEY;

describe("Detail", () => {
  describe("Details fetch film", ()=>{
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, "fetch").mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockFilm),
            } as Response);
        });
        cleanup();
        import.meta.env.VITE_OMDB_APIKEY = originalViteEnv
    });

    it("does the api call on mount", () => {
      import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);

      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith('https://www.omdbapi.com/?i=tt123&apikey=myApiKey');
    });

    it("renders spinner when loading", () => {
      import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);
      const spinner = document.getElementById("spinner");

      expect(spinner).toBeInTheDocument();
    });

    it("renders film details when film is loaded", async () => {
      import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);
      
      expect(await screen.findByText(/Plot text/i)).toBeInTheDocument();
      expect(await screen.findByText(/Drama/i)).toBeInTheDocument();
    });

    it("navigates back when clicking Back link", async () => {
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);
      const backLink = await screen.findByText(/Back/i)

      act(() => {
        fireEvent.click(backLink);
      });

      expect(navigateMock).toHaveBeenCalledWith(-1);
    });
  });

  describe("Details fetch error", ()=>{
    beforeEach(() => {
        vi.clearAllMocks();
        const mockResponse = {
            Response: "False",
            Error: "Movie not found!"
        };
        vi.spyOn(window, "fetch").mockImplementationOnce(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            } as Response);
        });     
        import.meta.env.VITE_OMDB_APIKEY = originalViteEnv
    });

    it("renders error when error exists: movie not found", async () => {
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);
      
      expect(await screen.findByText(/Movie not found!/i)).toBeInTheDocument();
    });
  });

    describe("Details fetch error", ()=>{
    beforeEach(() => {
        vi.clearAllMocks();
        const mockResponse = {
            status: "500",
            Error: "Server error!"
        };

        vi.clearAllMocks();
        vi.spyOn(window, "fetch").mockImplementationOnce(() => {
            return Promise.resolve(
              new Response(JSON.stringify(mockResponse), {
                status: 500,
                statusText: "Server error!",
                headers: { "Content-Type": "application/json" }
              })
            );
        });    
        import.meta.env.VITE_OMDB_APIKEY = originalViteEnv
    });

    it("renders error when error exists: movie not found", async () => {
      renderWithProviders(<MemoryRouter><Detail imdb="tt123" /></MemoryRouter>);
      
      expect(await screen.findByText(/Error loading film: 500 - Server error!/i)).toBeInTheDocument();
    });
  });
});