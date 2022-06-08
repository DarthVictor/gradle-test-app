import { useReducer, useEffect } from "react";

import { LoadingState, RepositoryType, ApiResponse } from "../../types";

type ReposListState = {
    loadingState: LoadingState;
    error: string | null;
    data: RepositoryType[];
};

type ReposListAction =
    | { type: "loading" }
    | { type: "error"; error: string }
    | { type: "success"; repos: RepositoryType[] };

const reposInitialState: ReposListState = {
    loadingState: LoadingState.LOADING,
    error: null,
    data: [],
};

const reposReducer = (
    state: ReposListState,
    action: ReposListAction
): ReposListState => {
    switch (action.type) {
        case "loading":
            return {
                loadingState: LoadingState.LOADING,
                error: null as string | null,
                data: [] as RepositoryType[],
            };
        case "error":
            return {
                loadingState: LoadingState.ERROR,
                error: action.error,
                data: [] as RepositoryType[],
            };
        case "success":
            return {
                loadingState: LoadingState.SUCCESS,
                error: null,
                data: action.repos,
            };
    }
};

export const useRepos = (
    apiFetch: () => Promise<ApiResponse>,
    deps?: React.DependencyList | undefined
) => {
    const [state, dispatch] = useReducer(reposReducer, reposInitialState);
    const refresh = async () => {
        dispatch({ type: "loading" });
        const response = await apiFetch();
        if (response.result === "ok") {
            dispatch({ type: "success", repos: response.payload });
        } else {
            dispatch({ type: "error", error: response.error });
        }
    };

    useEffect(() => {
        refresh();
    }, deps);

    return { state, refresh };
};
