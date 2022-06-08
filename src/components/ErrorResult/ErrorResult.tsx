import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./ErrorResult.module.css";
import { Button } from "../Button/Button";

export const ErrorResult = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        error: string | null;
        onRefresh(): void;
    }
>(({ className, error, onRefresh, ...other }, ref) => (
    <div ref={ref} {...other} className={classNames(styles.error, className)}>
        <h2>Oops!</h2>
        <p>{error}</p>
        <Button data-testid="refresh" onClick={onRefresh}>
            Refresh
        </Button>
    </div>
));
