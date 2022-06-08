import { ReposList } from "../components/ReposList/ReposList";

import { fireEvent, render, waitFor } from "@testing-library/react";

import fetchMock from "jest-fetch-mock";
import { MemoryRouter, Router } from "react-router-dom";
import {
    mockedLogicErrorResponse,
    mockedNetworErrorResponse,
    mockedSuccessResponse,
} from "../__mocks__/fetchApi.mock";
import { createMemoryHistory } from "history";

describe("ReposList", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("shows preloader, renders correct response and use filter", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory();

        const { getByTestId, getAllByTestId, queryByTestId } = render(
            <Router location={history.location} navigator={history}>
                <ReposList />
            </Router>
        );

        expect(getByTestId("spinner")).toBeTruthy();

        await waitFor(() => expect(queryByTestId("filter")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        expect(getAllByTestId("repo").length).toBe(20);
        fireEvent.change(getByTestId("filter"), {
            target: { value: "sh" },
        });
        await waitFor(() => expect(getAllByTestId("repo").length).toBe(8));
        expect(history.location.search).toBe("?owner=sh");
    });

    it("renders with filter from search parameter", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory({ initialEntries: ["/?owner=sh"] });

        const { getByTestId, getAllByTestId, queryByTestId } = render(
            <Router location={history.location} navigator={history}>
                <ReposList />
            </Router>
        );

        expect(getByTestId("spinner")).toBeTruthy();

        await waitFor(() => expect(queryByTestId("filter")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        expect(getAllByTestId("repo").length).toBe(8);
    });

    it("renders error with refresh button", async () => {
        fetchMock.mockResponseOnce(mockedLogicErrorResponse);

        const { getByTestId, queryByTestId } = render(<ReposList />, {
            wrapper: MemoryRouter,
        });

        expect(getByTestId("spinner")).toBeTruthy();

        await waitFor(() => expect(queryByTestId("refresh")).toBeTruthy());
        expect(fetchMock).toBeCalledTimes(1);
        fetchMock.mockResponseOnce(mockedNetworErrorResponse);

        fireEvent.click(getByTestId("refresh"));

        await waitFor(() => expect(fetchMock).toBeCalledTimes(2));
        await waitFor(() => expect(queryByTestId("refresh")).toBeTruthy());
    });
});
