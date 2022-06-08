import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import fetchMock from "jest-fetch-mock";
import { MemoryRouter, Router } from "react-router-dom";
import {
    mockedLogicErrorResponse,
    mockedNetworErrorResponse,
    mockedSuccessResponse,
} from "../__mocks__/fetchApi.mock";
import { AuthorsTree } from "../components/AuthorsTree/AuthorsTree";
import { createMemoryHistory } from "history";

describe("AuthorsTree", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("shows preloader, renders correct response and use filter", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory();

        const { getByTestId, getAllByTestId, queryByTestId } = render(
            <Router location={history.location} navigator={history}>
                <AuthorsTree />
            </Router>
        );

        expect(getByTestId("spinner")).toBeTruthy();

        await waitFor(() => expect(queryByTestId("filter")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        expect(getAllByTestId("author").length).toBe(7);
        expect(getAllByTestId("repo").length).toBe(20);

        userEvent.selectOptions(getByTestId("filter"), "TypeScript");

        await waitFor(() => expect(getAllByTestId("repo").length).toBe(4));
        expect(getAllByTestId("author").length).toBe(4);

        expect(history.location.search).toBe("?lang=TypeScript");
    });

    it("renders with filter from search parameter and resets select", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory({
            initialEntries: ["/details?lang=TypeScript"],
        });

        const { getByTestId, getAllByTestId, queryByTestId } = render(
            <Router location={history.location} navigator={history}>
                <AuthorsTree />
            </Router>
        );

        expect(getByTestId("spinner")).toBeTruthy();

        await waitFor(() => expect(queryByTestId("filter")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        expect(getAllByTestId("repo").length).toBe(4);
        expect(getAllByTestId("author").length).toBe(4);
        userEvent.selectOptions(getByTestId("filter"), "");

        await waitFor(() => expect(getAllByTestId("author").length).toBe(7));
        expect(getAllByTestId("repo").length).toBe(20);
    });

    it("renders error with refresh button", async () => {
        fetchMock.mockResponseOnce(mockedLogicErrorResponse);

        const { getByTestId, queryByTestId } = render(<AuthorsTree />, {
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
