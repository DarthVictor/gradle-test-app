import { Route, Routes } from "react-router-dom";

import { AuthorsTree } from "../AuthorsTree/AuthorsTree";
import { Page } from "../Page/Page";
import { ReposList } from "../ReposList/ReposList";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Page />}>
                <Route path="/details" element={<AuthorsTree />} />
                <Route path="/" element={<ReposList />} />
            </Route>
        </Routes>
    );
}
