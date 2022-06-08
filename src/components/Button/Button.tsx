import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

export const Button = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        appearence?: "primary" | "secondary" | "ghost";
    }
>(({ children, className, appearence = "primary", ...other }, ref) => (
    <button
        ref={ref}
        {...other}
        className={classNames(styles.button, styles[appearence], className)}
    >
        {children}
    </button>
));
