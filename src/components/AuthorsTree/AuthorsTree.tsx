import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { LoadingState, RepositoryType } from "../../types";
import { fetchRepos } from "../../api/repos/fetchRepos";
import { useRepos } from "../../api/repos/useRepos";

import { ErrorResult } from "../ErrorResult/ErrorResult";
import { Languages } from "../Languages/Languages";
import { Select } from "../Select/Select";
import { Spinner } from "../Spinner/Spinner";

import styles from "./AuthorsTree.module.css";

export const AuthorsTree = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { state, refresh } = useRepos(fetchRepos, []);

    const { authorsRepos, langs } = useMemo(() => {
        const authorsRepos = new Map<string, RepositoryType[]>();
        const langsSet = new Set<string>();
        for (const repo of state.data) {
            const repos = authorsRepos.get(repo.owner) ?? [];
            repos.push(repo);
            authorsRepos.set(repo.owner, repos);
            for (const lang of repo.languages) langsSet.add(lang);
        }
        return {
            authorsRepos,
            authors: [...authorsRepos.keys()],
            langs: [...langsSet.values()],
        };
    }, [state.data]);

    const [lang, setLang] = useState<string | undefined>(
        searchParams.get("lang") ?? undefined
    );

    const { filteredAuthors, filteredAuthorsRepos } = useMemo(() => {
        if (lang === undefined) {
            return {
                filteredAuthorsRepos: authorsRepos,
                filteredAuthors: [...authorsRepos.keys()],
            };
        }
        const filteredAuthorsRepos = new Map<string, RepositoryType[]>();
        for (const [author, repos] of authorsRepos.entries()) {
            const filteredRepos = repos.filter((repo) =>
                repo.languages.includes(lang)
            );
            if (filteredRepos.length > 0) {
                filteredAuthorsRepos.set(author, filteredRepos);
            }
        }
        return {
            filteredAuthorsRepos,
            filteredAuthors: [...filteredAuthorsRepos.keys()],
        };
    }, [state.data, lang]);

    if (LoadingState.LOADING === state.loadingState) {
        return <Spinner />;
    }

    if (state.loadingState === LoadingState.ERROR) {
        return <ErrorResult error={state.error} onRefresh={refresh} />;
    }

    return (
        <>
            <Select
                className={styles.filter}
                value={lang}
                onChange={({ target }) => {
                    setLang(target.value || undefined);
                    setSearchParams({ lang: target.value });
                }}
                data-testid="filter"
            >
                <option value={undefined}></option>
                {langs.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </Select>
            <div className={styles.authors_tree} data-testid="authors_tree">
                {filteredAuthors.map((author) => (
                    <div
                        className={styles.author}
                        key={author}
                        data-testid="author"
                    >
                        <h2 className={styles.author_name}>{author}</h2>

                        <div>
                            {filteredAuthorsRepos.get(author)!.map((repo) => (
                                <div
                                    className={styles.repo}
                                    key={repo.name}
                                    data-testid="repo"
                                >
                                    {repo.name}:
                                    <Languages
                                        languages={repo.languages}
                                        selected={lang}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
