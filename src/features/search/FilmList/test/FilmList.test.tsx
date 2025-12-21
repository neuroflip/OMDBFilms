import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FilmList from "../FilmList";
import type { Film } from "../../../../components/FilmCard/FilmCard.types";
import React from "react";

vi.mock("../../../../hooks/useIntersectionObserver", () => ({
  default: vi.fn(() => React.createRef<HTMLDivElement>()),
}));

vi.mock("../../../../components/FilmCard/FilmCard", () => ({
  default: ({ film }: { film: Film }) => (
    <div data-testid="film-card">{film.Title}</div>
  ),
}));

vi.mock("../../../../components/Spinner/Spinner", () => ({
  default: () => <div data-testid="spinner" />,
}));

const mockFilms: Film[] = [
  {
    imdbID: "tt001",
    Title: "Film 1",
    Year: "2020",
    Poster: "poster1.jpg",
    Type: "movie",
  },
  {
    imdbID: "tt002",
    Title: "Film 2",
    Year: "2021",
    Poster: "poster2.jpg",
    Type: "movie",
  },
];

describe("FilmList", () => {
  const defaultProps = {
    films: mockFilms,
    totalFilms: 2,
    currentPage: 1,
    totalPages: 2,
    isLoading: false,
    error: null,
    onInfiniteScrollNextLoad: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders total results when films are present", () => {
    render(<MemoryRouter><FilmList {...defaultProps} /></MemoryRouter>);

    expect(screen.getByText("2 results")).toBeInTheDocument();
  });

  it("renders a FilmCard for each film", () => {
    render(<MemoryRouter><FilmList {...defaultProps} /></MemoryRouter>);

    const cards = screen.getAllByTestId("film-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Film 1");
    expect(cards[1]).toHaveTextContent("Film 2");
  });

  it("renders error message when error exists", () => {
    render(<MemoryRouter><FilmList {...defaultProps}
        error="Something went wrong"
        films={[]} /></MemoryRouter>);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders spinner when loading", () => {
    render(<MemoryRouter><FilmList {...defaultProps}
            isLoading={true} /></MemoryRouter>);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("does not render intersection element when there are no films", () => {
    const { container } = render(<MemoryRouter><FilmList {...defaultProps}
            films={[]} /></MemoryRouter>);

    expect(container.querySelector("div[ref]")).toBeNull();
  });

  it("calls useIntersectionObserver with correct params", async () => {
    const useIntersectionObserver = await import("../../../../hooks/useIntersectionObserver");

    render(<MemoryRouter><FilmList {...defaultProps} /></MemoryRouter>);

    expect(useIntersectionObserver.default).toHaveBeenCalledWith(
      defaultProps.onInfiniteScrollNextLoad,
      true // currentPage + 1 <= totalPages → 2 <= 2
    );
  });
});
