import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // TODO: enable strict mode after fixing
    // https://github.com/facebook/react/issues/24553
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
);
