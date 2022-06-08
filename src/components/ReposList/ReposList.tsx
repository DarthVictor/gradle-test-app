import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { LoadingState } from "../../types";
import { fetchRepos } from "../../api/repos/fetchRepos";
import { useRepos } from "../../api/repos/useRepos";

import { ErrorResult } from "../ErrorResult/ErrorResult";
import { Input } from "../Input/Input";
import { Languages } from "../Languages/Languages";
import { Spinner } from "../Spinner/Spinner";

import styles from "./ReposList.module.css";

export const ReposList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { state, refresh } = useRepos(fetchRepos, []);

    const [filter, setFilter] = useState<string | null>(
        searchParams.get("owner")
    );

    const filteredRepos = useMemo(() => {
        return !filter
            ? state.data
            : state.data.filter((repo) => repo.owner.includes(filter));
    }, [state.data, filter]);

    if (LoadingState.LOADING === state.loadingState) {
        return <Spinner />;
    }

    if (state.loadingState === LoadingState.ERROR) {
        return <ErrorResult error={state.error} onRefresh={refresh} />;
    }

    return (
        <>
            <Input
                className={styles.filter}
                type="text"
                placeholder="Owner"
                value={filter ?? ""}
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter(val);
                    setSearchParams({ owner: val });
                }}
                data-testid="filter"
            />
            <div className={styles.repos_list} data-testid="repos_list">
                {filteredRepos.map((repo) => (
                    <div
                        className={styles.repo}
                        key={repo.name}
                        data-testid="repo"
                    >
                        <h2 className={styles.repo_name}>{repo.name}</h2>
                        <div className={styles.repo_name}>
                            Owner: <strong>{repo.owner}</strong>
                        </div>
                        <div className={styles.repo_langs}>
                            Languages:
                            <Languages languages={repo.languages} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
