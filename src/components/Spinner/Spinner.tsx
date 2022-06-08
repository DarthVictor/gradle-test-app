import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Spinner.module.css";

export const Spinner = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...other }, ref) => (
    <div
        ref={ref}
        data-testid="spinner"
        {...other}
        className={classNames(styles.spinner, className)}
    >
        <div />
    </div>
));
