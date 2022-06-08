import { fireEvent, render, waitFor } from "@testing-library/react";

import fetchMock from "jest-fetch-mock";
import { Router } from "react-router-dom";
import { mockedSuccessResponse } from "../__mocks__/fetchApi.mock";
import { createMemoryHistory } from "history";
import { App } from "../components/App/App";

describe("App", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("renders first page", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory();

        const { getByTestId } = render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        );

        await waitFor(() => expect(getByTestId("repos_list")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        fireEvent.click(getByTestId("to_details"));

        expect(history.location.pathname).toBe("/details");
    });

    it("renders second page", async () => {
        fetchMock.mockResponse(mockedSuccessResponse);
        const history = createMemoryHistory({ initialEntries: ["/details"] });

        const { getByTestId } = render(
            <Router location={history.location} navigator={history}>
                <App />
            </Router>
        );

        await waitFor(() => expect(getByTestId("authors_tree")).toBeTruthy());

        expect(fetchMock).toBeCalledTimes(1);
        fireEvent.click(getByTestId("to_root"));

        expect(history.location.pathname).toBe("/");
    });
});
