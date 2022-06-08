import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Select.module.css";

export const Select = forwardRef<
    HTMLSelectElement,
    React.SelectHTMLAttributes<HTMLSelectElement>
>(({ children, className, ...other }, ref) => (
    <select
        ref={ref}
        className={classNames(styles.select, className)}
        {...other}
    >
        {children}
    </select>
));
