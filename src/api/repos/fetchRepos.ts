import { ApiResponse } from "../../types";

export const API_URL = "/api/repos";
export const fetchRepos = async (): Promise<ApiResponse> => {
    try {
        const res = await fetch(API_URL);
        const body = await res.json();
        if (!res.ok) {
            const { error } = body;

            return {
                result: "error",
                error,
            };
        }
        const { repositories } = body;

        return { result: "ok", payload: repositories };
    } catch (e) {
        return {
            result: "error",
            error: "Network error",
        };
    }
};
