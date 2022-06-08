import { memo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import classnames from "classnames";

import styles from "./Page.module.css";

export const Page = memo(() => {
    const location = useLocation();

    return (
        <div className={styles.app}>
            <nav className={styles.menu}>
                <Link
                    className={classnames(
                        styles.menu_item,
                        location.pathname === "/" && styles.current
                    )}
                    to="/"
                    data-testid="to_root"
                >
                    All repositories
                </Link>
                <Link
                    className={classnames(
                        styles.menu_item,
                        location.pathname === "/details" && styles.current
                    )}
                    to="/details"
                    data-testid="to_details"
                >
                    Authors
                </Link>
            </nav>
            <div className={styles.page}>
                <Outlet />
            </div>
        </div>
    );
});
