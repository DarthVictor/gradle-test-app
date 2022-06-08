export enum LoadingState {
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export type RepositoryType = {
    name: string;
    owner: string;
    languages: string[];
};

export type ApiResponse =
    | {
          result: "ok";
          payload: RepositoryType[];
      }
    | {
          result: "error";
          error: string;
      };
