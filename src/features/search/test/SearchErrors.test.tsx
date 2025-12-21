import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import Search from "../Seach/Search";
import { renderWithProviders } from "../../../../test/test-utils";
import { MemoryRouter } from "react-router";
import React, { act } from "react";

vi.mock("../../../hooks/useIntersectionObserver", () => ({
  default: (_callback: () => void, _needsToCallback: boolean) => {
    const div = document.createElement("div");

    return React.useRef(div);
  }
}));

const originalViteEnv = import.meta.env.VITE_OMDB_APIKEY;

describe("Search errors", () => {
    describe("shows the error response from api", () => {
        beforeEach(() => {
            const mockResponse = {
                Response: "False",
                Error: "Movie not found!"
            };

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

        it("shows the movie not found message if there is no movie found", async () => {
            import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
            renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
            const queryTerm = screen.getByRole("textbox");

            act(() => {
                fireEvent.change(queryTerm, { target: { value: "batman" } });
                fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
            });

            expect(await screen.findByText("Movie not found!")).toBeInTheDocument();
            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        })
    });

    describe("shoes the error if fetch response.ok is false", () => {
        beforeEach(() => {
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
            cleanup();
            import.meta.env.VITE_OMDB_APIKEY = originalViteEnv
        });

        it("shows the response error from api fetch", async () => {
            import.meta.env.VITE_OMDB_APIKEY = 'myApiKey';
            renderWithProviders(<MemoryRouter><Search /></MemoryRouter>);
            const queryTerm = screen.getByRole("textbox");

            act(() => {
                fireEvent.change(queryTerm, { target: { value: "batman" } });
                fireEvent.keyDown(queryTerm, { key: 'Enter', code: 'Enter' });
            });

            expect(await screen.findByText("Error loading film: 500 - Server error!")).toBeInTheDocument();
            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        })
    });
});